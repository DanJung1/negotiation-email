import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { GeminiService } from '@/services/ai/GeminiService';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email data is required' },
        { status: 400 }
      );
    }

    const geminiService = new GeminiService();
    const analysis = await geminiService.analyzeEmail(email);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('AI analysis failed:', error);
    return NextResponse.json(
      { error: 'AI analysis failed' },
      { status: 500 }
    );
  }
}
