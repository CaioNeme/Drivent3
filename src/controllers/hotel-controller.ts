import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelServices } from '@/services';
import httpStatus from 'http-status';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const trivago = await hotelServices.getHotels(Number(req.userId));
  res.status(httpStatus.OK).send(trivago);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const trivago = await hotelServices.getHotelById(Number(hotelId), req.userId);
  res.status(httpStatus.OK).send(trivago);
}
