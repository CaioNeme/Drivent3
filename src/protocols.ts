import { Payment, Ticket } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type ViaCEPAddressError = {
  error: boolean;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type CEP = {
  cep: string;
};

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export type InputTicketBody = {
  ticketTypeId: number;
};

export type CardPaymentParams = {
  issuer: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
};

export type InputPaymentBody = {
  ticketId: number;
  cardData: CardPaymentParams;
};

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type Hotels = {
  id?: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Room = {
  id: number;
  name: string;
  capacity: number;
  hotelId: number;
  createdAt: string;
  updatedAt: string;
  Hotel: {
    id: number;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type Address = {
  id: number;
  cep: string;
  street: string;
  city: string;
  state: string;
  number: string;
  neighborhood: string;
  addressDetail: string;
  enrollmentId: number;
  createdAt: string;
  updatedAt: string;
};

export type Enrollments = {
  id: number;
  name: string;
  cpf: string;
  birthday: string;
  phone: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  Address: Address[];
};

export type TicketType = {
  id: number;
  name: string;
  price: number;
  isRemote: boolean;
  includesHotel: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Tickets = {
  id: number;
  ticketTypeId: number;
  enrollmentId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  TicketType: TicketType;
};
