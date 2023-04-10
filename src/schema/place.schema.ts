import { array, number, object, string, TypeOf } from "zod";

export const imageLinkSchema = object({
  body: object({
    link: string({
      required_error: "image url needed...!",
    }),
  }),
});

export const createPlaceSchema = object({
  body: object({
    title: string({
      required_error: "Title is required.",
    }),
    address: string({
      required_error: "Address is required.",
    }),
    description: string({
      required_error: "Description is required.",
    }),
    maxGuests: number({
      required_error: "Maximum number of guests is required.",
    }),
    price: number({
      required_error: "Price for the listing is required.",
    }),
    photos: array(string()),
    extraInfo: string(),
    checkIn: string(),
    checkOut: string(),
    perks: array(string()),
  }),
});

export const getPlaceSchema = object({
  params: object({
    id: string({
      required_error: "the place id is required",
    }),
  }),
});

export const updatePlaceSchema = object({
  params: object({
    id: string({
      required_error: "the place id is required",
    }),
  }),
  body: object({
    title: string(),
    address: string(),
    description: string(),
    maxGuests: number(),
    photos: array(string()),
    extraInfo: string(),
    checkIn: string(),
    checkOut: string(),
    perks: array(string()),
    price: number(),
  }),
});

export type ImageLinkInput = TypeOf<typeof imageLinkSchema>;
export type CreatePlaceInput = TypeOf<typeof createPlaceSchema>;
export type GetPlaceInput = TypeOf<typeof getPlaceSchema>;
export type UpdatePlaceInput = TypeOf<typeof updatePlaceSchema>;
