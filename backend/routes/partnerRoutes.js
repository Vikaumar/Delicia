// backend/routes/partnerRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { handlePartner } from "../controllers/partnerController.js";
import fs from "fs";

const router = express.Router();

// ensure upload dir exists
const uploadDir = path.join(process.cwd(), "uploads", "partners");
fs.mkdirSync(uploadDir, { recursive: true });

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_.-]/g, "");
    cb(null, `${timestamp}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    // allow pdf/doc/docx and images
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("File type not allowed"));
  }
});

// Accept field name "file" (same as PartnerForm)
router.post("/", upload.single("file"), (req, res, next) => {
  // multer error handling: if multer throws, it will call next(err)
  handlePartner(req, res, next);
});

export default router;
