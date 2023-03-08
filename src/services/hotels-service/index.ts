import { notFoundError } from "@/errors";
import { paymentError } from "@/errors/payment-required-error";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotelsService(userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    await checkTicket(enrollment.id);

    const hotels = await hotelsRepository.findHotels();

    return hotels;
}

async function getHotelByIdService(hotelId: number, userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    await checkTicket(enrollment.id);

    const hotelById = await hotelsRepository.findHotelById(hotelId);
    if (!hotelById) throw notFoundError();

    return hotelById;
}

async function checkTicket(enrollmentId: number) {

    const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
    if (!ticket) throw notFoundError();

    if (ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw paymentError();

}

const hotelsService = {
    getHotelByIdService,
    getHotelsService
};

export default hotelsService;
