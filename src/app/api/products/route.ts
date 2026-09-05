import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const excludeProducerId = searchParams.get('excludeProducerId');

    let whereClause = {};
    if (excludeProducerId) {
      whereClause = { producerId: { not: excludeProducerId } };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: { producer: { select: { name: true, country: true } } }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { producerId, name, category, price, cert, img } = await req.json();

    if (!producerId || !name || !category || !price || !cert || !img) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: { producerId, name, category, price, cert, img },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 });
  }
}
