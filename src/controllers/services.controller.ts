import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

const createServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().int().positive(),
});

export const getServices = async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: services });
};

export const getServiceById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found' });
    return;
  }

  res.json({ success: true, data: service });
};

export const createService = async (req: Request, res: Response) => {
  const parsed = createServiceSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ success: false, errors: z.treeifyError(parsed.error) });
    return;
  }

  const service = await prisma.service.create({ data: parsed.data });
  res.status(201).json({ success: true, data: service });
};
