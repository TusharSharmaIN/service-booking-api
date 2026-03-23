import { Router } from 'express';
import { createBooking, getMyBookings, getAllBookings } from '../controllers/bookings.controller';
import { protect, adminOnly } from '../middlewares/auth';

const router = Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/', protect, adminOnly, getAllBookings);

export default router;