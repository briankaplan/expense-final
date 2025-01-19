import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.R2_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export const uploadToR2 = async (file, expenseId) => {
  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const key = `receipts/${expenseId}/${timestamp}.${extension}`;

    // Convert file to buffer if needed
    let buffer;
    if (file instanceof Buffer) {
      buffer = file;
    } else {
      buffer = await file.arrayBuffer();
    }

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      Metadata: {
        expenseId: expenseId.toString(),
        originalName: file.name,
        uploadDate: new Date().toISOString(),
      },
    });

    await s3Client.send(command);

    // Return the public URL
    return `${process.env.R2_PUBLIC_URL}/${key}`;
  } catch (error) {
    console.error('R2 upload error:', error);
    throw error;
  }
};

export const deleteFromR2 = async (url) => {
  try {
    const key = url.split('/').slice(-3).join('/');
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('R2 delete error:', error);
    throw error;
  }
}; 