import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotelsService(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "PaymentError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

  }

  return res.sendStatus(httpStatus.BAD_REQUEST);
}

export async function getHotelsById(req: AuthenticatedRequest, res: Response) {

  const { hotelId } = req.params;
  const { userId } = req;

  try {
    if (!hotelId) {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const hotelById = await hotelsService.getHotelByIdService(Number(hotelId), Number(userId));
    return res.status(httpStatus.OK).send(hotelById);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "PaymentError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

