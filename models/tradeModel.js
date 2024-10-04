import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  stockName: { type: String, required: true },
  action: { type: String, enum: ["buy", "sell"], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Trade = mongoose.model("Trade", tradeSchema);
