import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { google } from 'googleapis';
import OpenAI from 'openai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test Google OAuth Configuration
async function testGoogleOAuth() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/photoslibrary.readonly',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    });

    console.log('✅ Google OAuth URL generated successfully:', url);
    return true;
  } catch (error) {
    console.error('❌ Google OAuth test failed:', error);
    return false;
  }
}

// Test R2 Storage Configuration
async function testR2Storage() {
  try {
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT_URL,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
      // R2-specific configuration
      forcePathStyle: true,
      signatureVersion: 'v4',
      // Disable checksum middleware
      customUserAgent: 'r2-storage-test',
      maxAttempts: 3,
      logger: console,
      // Disable AWS-specific features
      disableHostPrefix: true,
      useArnRegion: false,
      followRegionRedirects: false,
      checksumAlgorithm: null
    });

    // Test upload with minimal configuration
    const testData = 'Test data ' + Date.now();
    const putCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: 'test.txt',
      Body: testData,
      ContentType: 'text/plain',
      // Explicitly disable checksums
      ChecksumAlgorithm: undefined
    });

    console.log('Attempting to upload to R2...');
    await s3Client.send(putCommand);
    console.log('Upload successful');

    // Test download
    const getCommand = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: 'test.txt'
    });

    console.log('Attempting to download from R2...');
    const response = await s3Client.send(getCommand);
    const responseData = await response.Body.transformToString();
    console.log('Download successful');

    if (responseData === testData) {
      console.log('✅ R2 Storage test passed');
      return true;
    } else {
      throw new Error('Data mismatch');
    }
  } catch (error) {
    console.error('❌ R2 Storage test failed:', error);
    if (error.message) console.error('Error message:', error.message);
    if (error.$metadata) console.error('Error metadata:', error.$metadata);
    return false;
  }
}

// Test OpenAI Configuration
async function testOpenAI() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Hello, this is a test message." }],
      max_tokens: 50
    });

    if (response.choices[0].message) {
      console.log('✅ OpenAI test passed');
      return true;
    } else {
      throw new Error('No response from OpenAI');
    }
  } catch (error) {
    console.error('❌ OpenAI test failed:', error);
    return false;
  }
}

// Test Encryption Configuration
async function testEncryption() {
  try {
    const crypto = await import('crypto');
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'base64');
    const testData = 'Test encryption data';
    
    // Test encryption
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(testData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag();
    
    // Test decryption
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    if (decrypted === testData) {
      console.log('✅ Encryption test passed');
      return true;
    } else {
      throw new Error('Encryption/Decryption mismatch');
    }
  } catch (error) {
    console.error('❌ Encryption test failed:', error);
    return false;
  }
}

// Run all tests
async function runIntegrationTests() {
  console.log('🔄 Starting integration tests...\n');

  const results = {
    googleOAuth: await testGoogleOAuth(),
    r2Storage: await testR2Storage(),
    openAI: await testOpenAI(),
    encryption: await testEncryption()
  };

  console.log('\n📊 Test Results:');
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });

  return results;
}

// Run tests
runIntegrationTests(); 