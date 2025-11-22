// backend/controllers/contactController.js
import fs from "fs";
import path from "path";
import { sendNotificationEmail } from "../utils/email.js";

const CONTACTS_FILE = path.join(process.cwd(), "uploads", "contacts.jsonl");

// ensure directory exists
fs.mkdirSync(path.dirname(CONTACTS_FILE), { recursive: true });

export async function handleContact(req, res, next) {
  try {
    const { name, email, phone, orderNo, contactMethod, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required." });
    }

    const lead = {
      type: "contact",
      name,
      email,
      phone: phone || "",
      orderNo: orderNo || "",
      contactMethod: contactMethod || "email",
      message,
      receivedAt: new Date().toISOString(),
      ip: req.ip || null
    };

    // Append to file
    fs.appendFileSync(CONTACTS_FILE, JSON.stringify(lead) + "\n", { encoding: "utf8", flag: "a" });

    // Send optional notification email (safe: won't crash if env missing)
    if (process.env.SUPPORT_EMAIL && process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_HOST) {
      try {
        await sendNotificationEmail({
          to: process.env.SUPPORT_EMAIL,
          subject: `New contact form from ${lead.name}`,
          text: `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nOrder#: ${lead.orderNo}\nPreferred contact: ${lead.contactMethod}\n\nMessage:\n${lead.message}`
        });
      } catch (err) {
        console.warn("Contact email send failed:", err.message);
        // Do not fail the request if email fails
      }
    }

    return res.json({ ok: true, msg: "Contact received" });
  } catch (err) {
    next(err);
  }
}
