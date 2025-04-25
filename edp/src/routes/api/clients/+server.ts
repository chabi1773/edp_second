import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function POST({ request }: RequestEvent) {
	const body = await request.json();
    console.log(body)
	const { name, deviceId } = body;

	const client = await prisma.client.create({
		data: {
			name,
			device: {
				connect: { id: deviceId }
			}
		}
	});
    
    console.log(client)

	return new Response(json(client));
}
