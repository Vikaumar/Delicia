import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";
import menuData from "./menuData.js";
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

const seedMenu = async () => {
  try {
    console.log("📌 Seeding Menu...");
    console.log("Items to insert:", menuData.length);

    await foodModel.deleteMany({});
    await foodModel.insertMany(menuData);

    console.log("🍔 Menu inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting menu:", err);
    process.exit(1);
  }
};

seedMenu();
