import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Please enter a Name...!",
    }),
    email: string({
      required_error: "Please enter an Email...!",
    }),
    password: string({
      required_error: "Please enter a Password...!",
    }),
    avatar: string().default(""),
  }),
});

export const updateUserSchema = object({
  params: object({
    id: string({
      required_error: "user Id required",
    }),
  }),
  body: object({
    name: string(),
    email: string(),
    password: string(),
    avatar: string(),
  }),
});

export const deleteUserSchema = object({
  params: object({
    id: string({
      required_error: "user Id required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof registerUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
