// backend/routes/formRoutes.js
import express from "express";
import { contactForm } from "../controllers/contactController.js";
import { partnerForm } from "../controllers/partnerController.js";

const router = express.Router();

router.post("/contact", contactForm);
router.post("/partner", partnerForm);

export default router;
