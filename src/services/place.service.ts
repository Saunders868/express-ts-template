import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import PlaceModel, { PlaceDocument } from "../models/place.model";

export async function createPlace(
  input: DocumentDefinition<Omit<PlaceDocument, "createdAt" | "updatedAt">>
) {
  try {
    const place = await PlaceModel.create(input);
    return place;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserPlaces(query: FilterQuery<PlaceDocument>) {
  try {
    const places = await PlaceModel.find(query).lean();
    return places;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPlace(query: FilterQuery<PlaceDocument>) {
  try {
    const place = await PlaceModel.findOne(query).lean();
    return place;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updatePlace(
  filter: FilterQuery<PlaceDocument>,
  input: DocumentDefinition<
    Omit<PlaceDocument, "createdAt" | "updatedAt" | "owner">
  >,
  options: QueryOptions
) {
  try {
    const updatedPlace = await PlaceModel.findOneAndUpdate(
      filter,
      input,
      options
    );
    return updatedPlace;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPlaces() {
  try {
    const places = await PlaceModel.find();
    return places;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deletePlace(filter: FilterQuery<PlaceDocument>) {
  try {
    const deletedPlace = await PlaceModel.findOneAndDelete(filter);
    return deletedPlace;
  } catch (error: any) {
    throw new Error(error);
  }
}
