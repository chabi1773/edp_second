// src/routes/api/hospitals/+server.ts
import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
const prisma = new PrismaClient();

export async function POST({request}:RequestEvent) {
	const { hospitalname, macAddress, status } = await request.json();

	const hospital = await prisma.hospital.create({
		data: { hospitalname, macAddress, status }
	});

	return json(hospital);
}
