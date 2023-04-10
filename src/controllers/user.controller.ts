import { Request, Response } from "express";
import { omit } from "lodash";
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from "../schema/user.schema";
import { createUser, findUser, updateUser } from "../services/user.service";
import jwt from "jsonwebtoken";
import PlaceModel from "../models/place.model";
import BookingModel from "../models/booking.model";
import { renameSync } from "fs";

export async function registerUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const userData = req.body;

    // check if already exists
    const existingUser = await findUser({
      email: userData.email,
    });

    if (!existingUser) {
      const user = await createUser(userData);
      res.status(200).send(omit(user, "password"));
    } else {
      res.status(409).send({ msg: "Email already exists...!" });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).send({ err: error });
  }
}

// upload user avatar
export async function userUploadHandler(req: Request, res: Response) {
  try {
    let uploadedFile;
    if (req.file) {
      // @ts-ignore
      const { path, originalname } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      renameSync(path, newPath);
      uploadedFile = newPath.replace("src/uploads/user", "");
    }
    return res.status(200).send(uploadedFile);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
  res: Response
) {
  try {
    const { id } = req.params;
    const update = req.body;

    const existingUser = await findUser({
      _id: id,
    });

    if (!existingUser) {
      res.status(404).send({ msg: "User does not exist...!" });
    }

    const updatedUser = await updateUser(
      {
        _id: id,
      },
      update,
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput["params"]>,
  res: Response
) {
  const { id } = req.params;

  try {
    const existingUser = await findUser({
      _id: id,
    });

    if (!existingUser) {
      res.status(404).send({ msg: "User does not exist...!" });
    }

    const deletedPlaces = await PlaceModel.deleteMany({ owner: id });
    const deletedBookings = await BookingModel.deleteMany({ user: id });
    const otherBookingsDeleted = await BookingModel.deleteMany({
      "place.owner": id,
    });

    return res.status(200).json({
      deletedBookings,
      deletedPlaces,
      otherBookingsDeleted,
    });
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function profileHandler(req: Request, res: Response) {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, (err, user) => {
        if (err) throw err;
        return res.status(200).json(user);
      });
    } else {
      return res.status(404).json({ msg: "Token not found" });
    }
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}
