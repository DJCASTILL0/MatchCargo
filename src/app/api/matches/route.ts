import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { productId, producerId, buyerId } = await req.json();

    if (!productId || !producerId || !buyerId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const match = await prisma.match.create({
      data: {
        productId,
        producerId,
        buyerId,
        status: 'PENDING'
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear match' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role'); // "productor" o "comprador"

    if (!userId || !role) {
      return NextResponse.json({ error: 'Faltan userId o role' }, { status: 400 });
    }

    let matches;
    if (role === 'productor') {
      matches = await prisma.match.findMany({
        where: { producerId: userId },
        include: { product: true, buyer: { select: { name: true, country: true } } }
      });
    } else {
      matches = await prisma.match.findMany({
        where: { buyerId: userId },
        include: { product: true, producer: { select: { name: true, country: true } } }
      });
    }

    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener matches' }, { status: 500 });
  }
}
