import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect('mongodb://127.0.0.1:27017/Delicia')
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => console.error("❌ DB Connection Error:", err));
};
