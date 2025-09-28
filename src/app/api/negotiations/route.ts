import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { NegotiationService } from '@/services/negotiation/NegotiationService';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const negotiationService = new NegotiationService();
    const negotiations = await negotiationService.getNegotiationHistory(session.user.sub);

    return NextResponse.json({ negotiations });
  } catch (error) {
    console.error('Failed to fetch negotiations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch negotiations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { emailId, strategy, persona, targetPrice, autoRespond } = body;

    if (!emailId || !strategy || !persona) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const negotiationService = new NegotiationService();
    const negotiation = await negotiationService.createNegotiation({
      emailId,
      strategy,
      persona,
      targetPrice: targetPrice || 0,
      autoRespond: autoRespond || false,
    });

    return NextResponse.json({ negotiation });
  } catch (error) {
    console.error('Failed to create negotiation:', error);
    return NextResponse.json(
      { error: 'Failed to create negotiation' },
      { status: 500 }
    );
  }
}
