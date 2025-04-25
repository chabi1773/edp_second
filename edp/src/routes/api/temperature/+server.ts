// src/routes/api/temperature/+server.ts
import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }:RequestEvent) {
	const { clientId, temperature } = await request.json();

	const record = await prisma.tempRecord.create({
		data: {
			temperature,
			client: { connect: { id: clientId } }
		}
	});

	return json(record);
}
