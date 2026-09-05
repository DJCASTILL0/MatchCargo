import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get('matchId');

    if (!matchId) {
      return NextResponse.json({ error: 'Falta matchId' }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: { matchId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { matchId, senderId, text } = await req.json();

    if (!matchId || !senderId || !text) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: { matchId, senderId, text },
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 });
  }
}
