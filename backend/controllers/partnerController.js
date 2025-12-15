// backend/controllers/partnerController.js
import fs from "fs";
import path from "path";
import { sendNotificationEmail } from "../utils/email.js";

const PARTNERS_FILE = path.join(process.cwd(), "uploads", "partners.jsonl");
// ensure directory exists
fs.mkdirSync(path.dirname(PARTNERS_FILE), { recursive: true });

export async function handlePartner(req, res, next) {
  try {
    const { businessName, contactName, email, phone, city, cuisine, notes } = req.body || {};

    if (!businessName || !contactName || !email || !phone) {
      return res.status(400).json({ error: "businessName, contactName, email and phone are required." });
    }

    const lead = {
      type: "partner",
      businessName,
      contactName,
      email,
      phone,
      city: city || "",
      cuisine: cuisine || "",
      notes: notes || "",
      file: req.file ? `/uploads/partners/${req.file.filename}` : null,
      receivedAt: new Date().toISOString(),
      ip: req.ip || null
    };

    fs.appendFileSync(PARTNERS_FILE, JSON.stringify(lead) + "\n", { encoding: "utf8", flag: "a" });

    // send notification if email configured
    if (process.env.PARTNERS_EMAIL && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_HOST) {
      try {
        await sendNotificationEmail({
          to: process.env.PARTNERS_EMAIL,
          subject: `New partner request: ${lead.businessName}`,
          text: `Business: ${lead.businessName}\nContact: ${lead.contactName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCity: ${lead.city}\nCuisine: ${lead.cuisine}\nNotes:\n${lead.notes}\nFile: ${lead.file || "none"}`
        });
      } catch (err) {
        console.warn("Partner email failed", err.message);
      }
    }

    return res.json({ ok: true, msg: "Partner request received", lead });
  } catch (err) {
    next(err);
  }
}
