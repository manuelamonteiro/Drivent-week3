import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {

  const { userId } = req;

  try {

    const hotels = await hotelsService.getHotelsService(userId);

    return res.status(httpStatus.OK).send(hotels);

  } catch (error) {

    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
    }

    if (error.name === "PaymentError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(httpStatus.NOT_FOUND);
    }


    return res.sendStatus(httpStatus.NO_CONTENT);

  }

}

export async function getHotelsById(req: AuthenticatedRequest, res: Response) {

  const hotelId = Number(req.query.hotelId);
  const { userId } = req;

  try {

    if (!hotelId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const hotelById = await hotelsService.getHotelByIdService(hotelId, userId);

    return res.status(httpStatus.CREATED).send(hotelById);

  } catch (error) {

    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
    }

    if (error.name === "PaymentError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);

  }

}

