import { invalidDataError, notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import { hotelRepository } from '@/repositories';

async function getHotels(userId: number) {
  const validUser = await hotelRepository.authUser4Hotel(userId);

  if (!validUser[0] || !validUser[1] || validUser[1].status !== 'PAID') {
    if (!validUser[0] && !validUser[1]) throw notFoundError();
    if (!validUser[0] && !validUser[1]) throw notFoundError();
    if (!validUser[1] || validUser[1].status !== 'PAID') throw paymentRequiredError();
  }

  if (!validUser[1].TicketType.includesHotel) {
    throw paymentRequiredError();
  }

  const trivago = await hotelRepository.findAllHotels();
  if (!trivago || trivago.length === 0) throw notFoundError();
  return trivago;
}

async function getHotelById(hotelId: number, userId: number) {
  if (!userId) throw notFoundError();
  if (!hotelId) throw notFoundError();

  const validUser = await hotelRepository.authUser4Hotel(userId);

  if (!validUser[0] || !validUser[1] || validUser[1].status !== 'PAID') {
    if (!validUser[0] && !validUser[1]) throw notFoundError();
    if (!validUser[0] && !validUser[1]) throw notFoundError();
    if (!validUser[1] || validUser[1].status !== 'PAID') throw paymentRequiredError();
  }

  if (!validUser[1].TicketType.includesHotel) {
    throw paymentRequiredError();
  }

  const trivago = await hotelRepository.findHotelById(hotelId, userId);
  if (!trivago) throw notFoundError();

  return trivago;
}

export const hotelServices = {
  getHotels,
  getHotelById,
};
