import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { GeminiService } from '@/services/ai/GeminiService';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, context } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email data is required' },
        { status: 400 }
      );
    }

    const geminiService = new GeminiService();
    const reply = await geminiService.generateSmartReply(email, context);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Smart reply generation failed:', error);
    return NextResponse.json(
      { error: 'Smart reply generation failed' },
      { status: 500 }
    );
  }
}
