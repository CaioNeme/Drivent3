import { getAllHotels, getHotelById } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelRouter = Router();

hotelRouter.get('/', authenticateToken, getAllHotels).get('/:hotelId', authenticateToken, getHotelById);

export { hotelRouter };
