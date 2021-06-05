import multer from "multer";
import path from "path";
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const __dirname = path.resolve();

export default {
  dest: path.resolve(__dirname, "temp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "temp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    allowedMimes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type."));
  },
};
