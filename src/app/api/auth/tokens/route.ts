import { NextResponse } from 'next/server';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tokens } from '@/lib/schema';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get('service');
  const email = searchParams.get('email');

  if (!service || !email) {
    return NextResponse.json(
      { error: 'Service and email are required' },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .select()
      .from(tokens)
      .where(
        and(
          eq(tokens.service, service),
          eq(tokens.email, email)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Tokens not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve tokens' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { service, email, encrypted_tokens } = await request.json();

    if (!service || !email || !encrypted_tokens) {
      return NextResponse.json(
        { error: 'Service, email, and encrypted_tokens are required' },
        { status: 400 }
      );
    }

    // Check if tokens already exist for this service and email
    const existing = await db
      .select()
      .from(tokens)
      .where(
        and(
          eq(tokens.service, service),
          eq(tokens.email, email)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing tokens
      await db
        .update(tokens)
        .set({
          encrypted_tokens,
          updated_at: sql`datetime('now')`
        })
        .where(
          and(
            eq(tokens.service, service),
            eq(tokens.email, email)
          )
        );
    } else {
      // Insert new tokens
      await db.insert(tokens).values({
        service,
        email,
        encrypted_tokens
        // created_at and updated_at will use defaults
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing tokens:', error);
    return NextResponse.json(
      { error: 'Failed to store tokens' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { service, email } = await request.json();

    if (!service || !email) {
      return NextResponse.json(
        { error: 'Service and email are required' },
        { status: 400 }
      );
    }

    // Delete tokens for the service and email
    await db
      .delete(tokens)
      .where(
        and(
          eq(tokens.service, service),
          eq(tokens.email, email)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tokens:', error);
    return NextResponse.json(
      { error: 'Failed to delete tokens' },
      { status: 500 }
    );
  }
} 