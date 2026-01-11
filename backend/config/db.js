import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully to 'test' database!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); 
  }
};

export { connectDB };
