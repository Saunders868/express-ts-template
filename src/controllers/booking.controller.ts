import { Request, Response } from "express";
import {
  CancelBookingInput,
  CreateBookingInput,
} from "../schema/booking.schema";
import jwt from "jsonwebtoken";
import {
  createBooking,
  deleteBooking,
  findBooking,
  getUserBookings,
} from "../services/booking.service";
import mongoose from "mongoose";

export async function createBookingHandler(
  req: Request<{}, {}, CreateBookingInput["body"]>,
  res: Response
) {
  try {
    const { token } = req.cookies;

    const input = req.body;

    const placeObjectId = new mongoose.Types.ObjectId(input.place);

    let tokenValid;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, user) => {
        if (err) throw err;
        tokenValid = true;
        // @ts-ignore
        const { id } = user;

        const booking: any = await createBooking({
          ...input,
          place: placeObjectId,
          user: id,
        });
        return res.status(200).send(booking);
      });
    } else {
      tokenValid = false;
      return res.status(401).send({ err: "User not verified." });
    }
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function getUserBookingsHandler(req: Request, res: Response) {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, user) => {
        if (err) throw err;
        // @ts-ignore
        const { id } = user;

        const bookings = await getUserBookings({ user: id });
        return res.status(200).send(bookings);
      });
    } else {
      return res.status(401).send({ error: "User not verified." });
    }
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function getBookingHandler(
  req: Request<CancelBookingInput["params"]>,
  res: Response
) {
  try {
    const { id } = req.params;
    const booking = await findBooking({ _id: id });

    if (!booking) {
      return res.status(404).send({ err: "Booking not found." });
    }

    return res.status(200).send(booking);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function cancelBookingHandler(
  req: Request<CancelBookingInput["params"]>,
  res: Response
) {
  try {
    const { id } = req.params;

    const booking = await findBooking({ _id: id });

    if (!booking) {
      return res.status(404).send({ err: "Booking not found." });
    }

    const deletedBooking = await deleteBooking({ _id: id });

    return res.status(200).send(deletedBooking);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}
