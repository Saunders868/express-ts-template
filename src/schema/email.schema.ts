import { object, string, TypeOf } from "zod";

export const sendEmailSchema = object({
  body: object({
    name: string({
      required_error: "Name is required...!",
    }),
    email: string({
      required_error: "Email is required...!",
    }),
    text: string({
      required_error: "Email body required...!",
    }),
    subject: string({
      required_error: "Email subject is required...!",
    }),
  }),
});

export type VerifyEmailInput = TypeOf<typeof sendEmailSchema>;
