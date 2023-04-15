import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/session.schema";
import { findUser } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput["body"]>,
  res: Response
) {
  const { email, password } = req.body;

  // check user exists
  const existingUser = await findUser({
    email,
  });

  if (!existingUser) {
    return res.status(404).send({
      msg: "No account is registered to this user, please try another email.",
    });
  }

  const passwordMatches = bcrypt.compareSync(password, existingUser?.password!);

  if (!passwordMatches) {
    return res.status(401).send({
      msg: "Password incorrect, please try again.",
    });
  } else {
    jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        name: existingUser.name,
        avatar: existingUser.avatar,
      },
      process.env.JWT_SECRET!,
      {},
      (err, token) => {
        if (err) throw err;
        return res
          .status(200)
          .cookie("token", token, { sameSite: "none", secure: true })
          .send(existingUser);
      }
    );
  }
}

// end session
export async function logoutHandler(req: Request, res: Response) {
  return res
    .clearCookie("token")
    .status(200)
    .send({ msg: "Logged out successfully...!" });
}
