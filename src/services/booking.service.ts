import { DocumentDefinition, FilterQuery } from "mongoose";
import BookingModel, { BookingDocument } from "../models/booking.model";

export async function createBooking(
  input: DocumentDefinition<Omit<BookingDocument, "createdAt" | "updatedAt">>
) {
  try {
    const booking = await BookingModel.create(input);
    return booking;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findBooking(query: FilterQuery<BookingDocument>) {
  try {
    const booking = await BookingModel.findOne(query).populate('place').lean();
    return booking;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserBookings(query: FilterQuery<BookingDocument>) {
  try {
    const bookings = await BookingModel.find(query).populate('place').lean();
    return bookings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getBookings() {
  try {
    const bookings = await BookingModel.find().lean();
    return bookings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteBooking(query: FilterQuery<BookingDocument>) {
  try {
    const deletedBooking = await BookingModel.findOneAndDelete(query);
    return deletedBooking;
  } catch (error: any) {
    throw new Error(error);
  }
}
