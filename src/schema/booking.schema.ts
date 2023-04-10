import { date, number, object, string, TypeOf } from "zod";

const createBookingSchema = object({
  body: object({
    checkIn: date({
      required_error: "Check in date is needed!",
    }),
    checkOut: date({
      required_error: "Check out date is needed!",
    }),
    name: string({
      required_error: "Name is needed!",
    }),
    mobile: string({
      required_error: "Mobile is needed!",
    }),
    place: string({
      required_error: "Mobile is needed!",
    }),
    maxGuests: number({
      required_error: "Max guests is needed!",
    }),
  }),
});

const cancelBookingSchema = object({
  params: object({
    id: string({
      required_error: "booking id is needed.",
    }),
  }),
});

export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
export type CancelBookingInput = TypeOf<typeof cancelBookingSchema>;
