import { Request, Response } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { VerifyEmailInput } from "../schema/email.schema";

let nodeConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  },
};

let transport = nodemailer.createTransport(smtpTransport(nodeConfig));

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const handleMail = async (
  req: Request<{}, {}, VerifyEmailInput["body"]>,
  res: Response
) => {
  const { name, email: userEmail, text, subject } = req.body;

  var email = {
    body: {
      name,
      intro: text || "Welcome to Airbnb Clone by Daniel Saunders!",
      outro:
        "Need help, or have problems? Just reply to this email, we'd love to help",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.USERNAME,
    to: userEmail,
    subject: subject || "Registration Completed. Glad to have you!",
    html: emailBody,
  };

  transport
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should recieve an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
