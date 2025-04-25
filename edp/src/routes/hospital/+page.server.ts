import { PrismaClient } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  const hospitals = await prisma.hospital.findMany();
  return { hospitals };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const hospitalname = form.get('hospitalname')?.toString();
    const macAddress = form.get('macAddress')?.toString();
    const status = parseInt(form.get('status')?.toString() || '0');

    if (!hospitalname || !macAddress) {
      return { error: 'Missing fields' };
    }

    try {
      await prisma.hospital.create({
        data: { hospitalname, macAddress, status },
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to create hospital' };
    }
  }
};
