import { R2Bucket } from '@cloudflare/workers-types';

export const R2_FOLDERS = {
  UPLOADS: {
    PENDING: 'uploads/pending/',
    PROCESSING: 'uploads/processing/',
  },
  MATCHED: {
    PENDING: 'matched/pending/',
    COMPLETE: 'matched/complete/',
  },
  EXPENSIFY: {
    IMPORTED: 'expensify/imported/',
  }
};

export async function moveToFolder(
  bucket: R2Bucket,
  sourceKey: string,
  destinationFolder: string
): Promise<string> {
  // Get the file name from the source key
  const fileName = sourceKey.split('/').pop();
  const newKey = `${destinationFolder}${fileName}`;

  // Copy the object to the new location
  const sourceObject = await bucket.get(sourceKey);
  if (!sourceObject) {
    throw new Error(`Source object ${sourceKey} not found`);
  }

  await bucket.put(newKey, sourceObject.body, {
    httpMetadata: sourceObject.httpMetadata,
    customMetadata: sourceObject.customMetadata,
  });

  // Delete the original object
  await bucket.delete(sourceKey);

  return newKey;
}

export async function uploadToR2(
  bucket: R2Bucket,
  file: File,
  folder: string = R2_FOLDERS.UPLOADS.PENDING
): Promise<{ key: string; url: string }> {
  const fileName = `${Date.now()}-${file.name}`;
  const key = `${folder}${fileName}`;

  await bucket.put(key, file, {
    httpMetadata: {
      contentType: file.type,
    },
  });

  const url = await bucket.get(key)?.url;
  if (!url) {
    throw new Error('Failed to get URL for uploaded file');
  }

  return { key, url };
}

export async function getFileFromR2(
  bucket: R2Bucket,
  key: string
): Promise<R2ObjectBody | null> {
  const object = await bucket.get(key);
  return object;
}

export async function deleteFromR2(
  bucket: R2Bucket,
  key: string
): Promise<void> {
  await bucket.delete(key);
} 