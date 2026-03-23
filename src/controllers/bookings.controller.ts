import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/auth';
import { z } from 'zod';

const createBookingSchema = z.object({
  serviceId: z.uuid(),
  scheduledAt: z.iso.datetime(),
  notes: z.string().optional(),
});

export const createBooking = async (req: AuthRequest & { body: any }, res: Response) => {
  const parsed = createBookingSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ success: false, errors: z.treeifyError(parsed.error) });
    return;
  }

  const { serviceId, scheduledAt, notes } = parsed.data;

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found' });
    return;
  }

  const booking = await prisma.booking.create({
    data: {
      userId: req.user!.id,
      serviceId,
      scheduledAt: new Date(scheduledAt),
      notes,
    },
    include: { service: true, user: { select: { id: true, name: true, email: true } } },
  });

  res.status(201).json({ success: true, data: booking });
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: req.user!.id },
    include: { service: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: bookings });
};

export const getAllBookings = async (_req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: {
      service: true,
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, data: bookings });
};