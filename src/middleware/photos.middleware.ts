import multer from "multer";

export const photoMiddleware = multer({ dest: "src/uploads" });
export const userPhotoMiddleware = multer({ dest: "src/uploads/user" });
