import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport to a common receipt size
    await page.setViewport({
      width: 800,
      height: 1200,
      deviceScaleFactor: 2
    });

    // Get the URL from the request body
    const { url } = await request.json();
    
    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for any receipt-like content to load
    await page.waitForFunction(() => {
      const keywords = ['total', 'amount', 'payment', 'receipt', 'order'];
      const text = document.body.innerText.toLowerCase();
      return keywords.some(keyword => text.includes(keyword));
    }, { timeout: 5000 }).catch(() => {
      console.log('No receipt keywords found, proceeding with screenshot');
    });

    // Take a screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true
    });

    await browser.close();

    // Upload the screenshot to R2
    const filename = `receipt_${Date.now()}.png`;
    const uploadResponse = await fetch(`${env.API_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename,
        contentType: 'image/png',
        data: screenshot.toString('base64')
      })
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload screenshot');
    }

    const { url: receiptUrl } = await uploadResponse.json();

    // Process the receipt with OCR
    const ocrResponse = await fetch(`${env.API_URL}/api/ocr`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl: receiptUrl
      })
    });

    if (!ocrResponse.ok) {
      throw new Error('Failed to process receipt with OCR');
    }

    const ocrResult = await ocrResponse.json();

    return NextResponse.json({
      success: true,
      receiptUrl,
      ocrResult
    });

  } catch (error) {
    console.error('Screenshot error:', error);
    return NextResponse.json(
      { error: 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
} 