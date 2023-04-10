import { Request, Response } from "express";
import {
  CreatePlaceInput,
  GetPlaceInput,
  ImageLinkInput,
  UpdatePlaceInput,
} from "../schema/place.schema";
import download from "image-downloader";
import { renameSync } from "fs";
import {
  createPlace,
  deletePlace,
  getPlace,
  getPlaces,
  getUserPlaces,
  updatePlace,
} from "../services/place.service";
import jwt from "jsonwebtoken";
import { PlaceDocument } from "../models/place.model";

export async function linkHandler(
  req: Request<{}, {}, ImageLinkInput["body"]>,
  res: Response
) {
  const { link } = req.body;

  try {
    const rootDirName = process.cwd();
    const newName = "photo" + Date.now() + ".jpg";

    await download.image({
      url: link,
      dest: rootDirName + "/src/uploads/" + newName,
    });

    return res.status(200).send(newName);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export async function uploadHandler(req: Request, res: Response) {
  try {
    const uploadedFiles = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        // @ts-ignore
        const { path, originalname } = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("src/uploads/", ""));
      }
    }
    return res.status(200).send(uploadedFiles);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}

export async function createPlaceHandler(
  req: Request<{}, {}, CreatePlaceInput["body"]>,
  res: Response
) {
  try {
    const { token } = req.cookies;

    const {
      title,
      description,
      address,
      maxGuests,
      photos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
    } = req.body;

    let tokenValid;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, user) => {
        if (err) throw err;
        tokenValid = true;
        const placeDocument: PlaceDocument = await createPlace({
          title,
          description,
          address,
          maxGuests,
          photos,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          price,
          // @ts-ignore
          owner: user?.id,
        });

        return res.status(204).send(placeDocument);
      });
    } else {
      tokenValid = false;
      return res.status(401).send({ error: "User not verified." });
    }
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function getUserPlacesHandler(req: Request, res: Response) {
  try {
    const { token } = req.cookies;

    let tokenValid;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, user) => {
        if (err) throw err;
        tokenValid = true;
        // @ts-ignore
        const { id } = user;

        const places: any = await getUserPlaces({ owner: id });
        return res.status(200).send(places);
      });
    } else {
      tokenValid = false;
      return res.status(401).send({ error: "User not verified." });
    }
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function getPlaceHandler(
  req: Request<GetPlaceInput["params"]>,
  res: Response
) {
  try {
    const { id } = req.params;

    const existingPlace = await getPlace({ _id: id });

    if (!existingPlace) {
      return res.status(404).send({ err: "Place not Found...!" });
    }

    return res.status(200).send(existingPlace);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function updatePlaceHandler(
  req: Request<UpdatePlaceInput["params"], {}, UpdatePlaceInput["body"]>,
  res: Response
) {
  try {
    const { id } = req.params;

    const update = req.body;

    const { token } = req.cookies;

    let tokenValid;
    let userDoc;

    // check if user verified, and set user document
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET!, {}, async (err, user) => {
        if (err) throw err;
        tokenValid = true;
        userDoc = user;

        const existingPlace = await getPlace({ _id: id });

        if (!existingPlace) {
          return res.status(404).send({ err: "Place not Found...!" });
        }

        // @ts-ignore
        if (existingPlace?.owner.toString() !== userDoc?.id) {
          return res
            .status(401)
            .send({ err: "User does not own this listing...!" });
        }
      });
    }

    const updatedPlace = await updatePlace({ _id: id }, update, { new: true });
    return res.status(200).send(updatedPlace);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function getPlacesHandler(req: Request, res: Response) {
  try {
    const places = await getPlaces();

    return res.status(200).send(places);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}

export async function deletePlaceHandler(
  req: Request<GetPlaceInput["params"]>,
  res: Response
) {
  try {
    const { id } = req.params;

    const existingPlace = await getPlace({ _id: id });

    if (!existingPlace) {
      return res.status(404).send({ err: "Place not Found...!" });
    }

    const deletedPlace = await deletePlace({ _id: id });
    return res.status(200).send(deletedPlace);
  } catch (error) {
    return res.status(500).send({ err: error });
  }
}
