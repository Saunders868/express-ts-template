import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next: any) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT!))

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
