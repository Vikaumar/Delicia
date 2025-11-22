// backend/routes/contactRoutes.js
import express from "express";
import { handleContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", handleContact);

export default router;
