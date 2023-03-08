import { prisma } from "@/config";


async function findHotelById(hotelId: number) {
    return prisma.hotel.findFirst({
        where: {
            id: hotelId
        },
        include: {
            Rooms: true
        }
    });
}

async function findHotels() {
    return prisma.hotel.findMany();
}

const hotelsRepository = {
    findHotelById,
    findHotels
};

export default hotelsRepository;