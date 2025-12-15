import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';
import contactRoutes from "./routes/contactRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// ─── Import OpenAI client ─────────────────────────────────────────
import OpenAI from "openai";

// app config
const app = express();
const port = process.env.PORT || 4000;

// ─── Middlewares ──────────────────────────────────────────────────
app.use(express.json());
app.use(cors());

app.use("/api/contact", contactRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ─── DB connection ─────────────────────────────────────────────────
connectDB();

// ─── OpenAI client setup ───────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ─── Chat endpoint ─────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;  
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });
    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to generate chat response" });
  }
});

// ─── Existing API routes ────────────────────────────────────────────
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
