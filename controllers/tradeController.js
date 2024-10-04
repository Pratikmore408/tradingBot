// Importing necessary modules

import { Trade } from "../models/tradeModel.js";
import { getStockPrice } from "../services/stockService.js";

// Buy when price drops by 2%, sell when it rises by 3%
let balance = 10000; // Starting balance
let stockHoldings = 0;
let lastBoughtPrice = null;

// Function to execute trades based on the stock price

export const executeTrade = async (req, res) => {
  try {
    const stockName = req.params.name;
    const stockPrice = await getStockPrice(stockName);

    if (!lastBoughtPrice && stockHoldings === 0 && stockPrice <= balance) {
      // Buy stock
      const quantity = Math.floor(balance / stockPrice);
      balance -= quantity * stockPrice;
      stockHoldings += quantity;
      lastBoughtPrice = stockPrice;

      // Save the trade details in the database
      const trade = new Trade({
        stockName,
        action: "buy",
        price: stockPrice,
        quantity,
      });
      await trade.save();

      // Return a success response with details of the trade
      return res.status(200).json({
        message: "Bought stock",
        stockHoldings,
        lastBoughtPrice,
        balance,
      });
    } else if (lastBoughtPrice && stockPrice >= lastBoughtPrice * 1.03) {
      // Sell stock
      const quantity = stockHoldings;
      balance += quantity * stockPrice;
      stockHoldings = 0;
      lastBoughtPrice = null;

      // Save the trade details in the database
      const trade = new Trade({
        stockName,
        action: "sell",
        price: stockPrice,
        quantity,
      });
      await trade.save();

      // Return a success response with details of the trade
      return res.status(200).json({
        message: "Sold stock",
        stockHoldings,
        lastBoughtPrice,
        balance,
      });
    } else {
      return res.status(200).json({
        message: "No trade action",
        stockHoldings,
        lastBoughtPrice,
        balance,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Trade execution failed" });
  }
};

// Function to fetch all trades made by the bot from the database
export const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trades" });
  }
};
