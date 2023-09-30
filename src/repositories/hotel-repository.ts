import { prisma } from '@/config';
import { Enrollments, Tickets } from '@/protocols';

async function findAllHotels(): Promise<any> {
  const result = await prisma.hotel.findMany();

  return result;
}

async function findHotelById(hotelId: number, userId: number): Promise<any> {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });

  const resposta = {
    id: result.id,
    name: result.name,
    image: result.image,
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
    Rooms: result.Rooms.map((room) => ({
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      hotelId: room.hotelId,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt.toISOString(),
    })),
  };

  return resposta;
}

async function authUser4Hotel(userId: number): Promise<[Enrollments | null | any, Tickets | null | any]> {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });

  if (!enrollment) {
    return [null, null];
  }

  const ticket = await prisma.ticket.findUnique({
    where: { enrollmentId: enrollment.id },
    include: { TicketType: true },
  });

  if (!ticket) {
    return [enrollment, null];
  }

  return [enrollment, ticket];
}

async function validateHotel(hotelId: number) {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });
  return result;
}

export const hotelRepository = {
  findAllHotels,
  findHotelById,
  authUser4Hotel,
  validateHotel,
};
