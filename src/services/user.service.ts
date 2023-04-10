import { filter, omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

// create a user
export async function createUser(
  input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt">>
) {
  try {
    const user = await UserModel.create(input);

    return omit(user, "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

// find a user
export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function updateUser(
  filter: FilterQuery<UserDocument>,
  input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt">>,
  options: QueryOptions
) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(filter, input, options);
    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
