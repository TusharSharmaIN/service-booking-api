import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import serviceRoutes from './routes/service.routes';
import bookingRoutes from './routes/bookings.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Service Booking API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

export default app;
