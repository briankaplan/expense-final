import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    const optionsStr = formData.get('options');
    const options = optionsStr ? JSON.parse(optionsStr) : {};

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Save image to temp file
    const buffer = Buffer.from(await image.arrayBuffer());
    const tempPath = path.join(os.tmpdir(), `receipt-${Date.now()}.png`);
    await writeFile(tempPath, buffer);

    // Preprocess image
    const processedBuffer = await preprocessImage(buffer, options);
    
    // Run OCR
    const result = await runOCR(processedBuffer, options);

    // Clean up temp file
    await unlink(tempPath);

    return NextResponse.json(result);
  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function preprocessImage(buffer, options = {}) {
  try {
    let image = sharp(buffer);

    // Convert to grayscale
    image = image.grayscale();

    // Apply thresholding
    image = image.threshold(options.threshold || 128);

    // Normalize contrast
    image = image.normalize();

    // Sharpen edges
    image = image.sharpen({
      sigma: 1.5,
      m1: 1,
      m2: 2,
      x1: 2,
      y2: 10,
      y3: 20
    });

    // Resize if needed while maintaining aspect ratio
    if (options.maxWidth || options.maxHeight) {
      image = image.resize(
        options.maxWidth || null,
        options.maxHeight || null,
        {
          fit: 'inside',
          withoutEnlargement: true
        }
      );
    }

    return await image.toBuffer();
  } catch (error) {
    console.error('Image preprocessing error:', error);
    return buffer; // Return original buffer if preprocessing fails
  }
}

async function runOCR(buffer, options = {}) {
  const worker = await createWorker('eng');

  // Configure Tesseract
  await worker.setParameters({
    tessedit_char_whitelist: options.allowlist || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$.,/-:',
    preserve_interword_spaces: '1',
    tessedit_pageseg_mode: options.psm || '6',
    tessedit_ocr_engine_mode: options.oem || '3'
  });

  // Process the image
  const { data } = await worker.recognize(buffer);
  
  // Group words into lines based on vertical position
  const lines = [];
  let currentLine = [];
  let lastY = null;
  const yThreshold = 10;

  // Sort words by vertical position then horizontal position
  const sortedWords = data.words.sort((a, b) => {
    if (Math.abs(a.bbox.y0 - b.bbox.y0) <= yThreshold) {
      return a.bbox.x0 - b.bbox.x0;
    }
    return a.bbox.y0 - b.bbox.y0;
  });

  for (const word of sortedWords) {
    if (lastY === null || Math.abs(word.bbox.y0 - lastY) <= yThreshold) {
      currentLine.push(word);
    } else {
      if (currentLine.length > 0) {
        lines.push({
          text: currentLine.map(w => w.text).join(' '),
          confidence: currentLine.reduce((sum, w) => sum + w.confidence, 0) / currentLine.length,
          bbox: {
            x0: Math.min(...currentLine.map(w => w.bbox.x0)),
            y0: Math.min(...currentLine.map(w => w.bbox.y0)),
            x1: Math.max(...currentLine.map(w => w.bbox.x1)),
            y1: Math.max(...currentLine.map(w => w.bbox.y1))
          },
          words: currentLine
        });
      }
      currentLine = [word];
    }
    lastY = word.bbox.y0;
  }

  if (currentLine.length > 0) {
    lines.push({
      text: currentLine.map(w => w.text).join(' '),
      confidence: currentLine.reduce((sum, w) => sum + w.confidence, 0) / currentLine.length,
      bbox: {
        x0: Math.min(...currentLine.map(w => w.bbox.x0)),
        y0: Math.min(...currentLine.map(w => w.bbox.y0)),
        x1: Math.max(...currentLine.map(w => w.bbox.x1)),
        y1: Math.max(...currentLine.map(w => w.bbox.y1))
      },
      words: currentLine
    });
  }

  await worker.terminate();

  return {
    text: data.text,
    confidence: data.confidence,
    words: data.words,
    lines: lines
  };
} 