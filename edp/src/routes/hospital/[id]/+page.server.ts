import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
  const hospitalId = params.id;

  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    include: {
      clients: {
        include: {
          records: true,
        },
      },
    },
  });

  return { hospital };
};

export const actions: Actions = {
  updateClient: async ({ request }) => {
    const form = await request.formData();
    const clientId = form.get('clientId')?.toString();
    const name = form.get('name')?.toString();

    if (!clientId || !name) {
      return { error: 'Missing fields' };
    }

    try {
      await prisma.client.update({
        where: { id: clientId },
        data: { name },
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to update client' };
    }
  }
};
