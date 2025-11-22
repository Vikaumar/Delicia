import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    console.log("Login request body:", req.body); // 👈 log frontend data

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("No admin found with email:", email);
      return res.status(404).json({ message: "Admin not found" });
    }

    const valid = password === admin.password; // temporary if bcrypt off
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = "dummyToken"; // just for test
    res.json({ token, admin: { email: admin.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

