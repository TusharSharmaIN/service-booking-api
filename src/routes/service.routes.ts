import { Router } from 'express';
import { getServices, getServiceById, createService } from '../controllers/services.controller';
import { protect, adminOnly } from '../middlewares/auth';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, adminOnly, createService);

export default router;