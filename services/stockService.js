import { request } from "undici";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_URL;

// Function to fetch the BSE price for a specific stock
export const getStockPrice = async (stockName) => {
  try {
    const url = `${BASE_URL}/stock?name=${encodeURIComponent(stockName)}`;
    const { statusCode, body } = await request(url, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    // Checking if the response status is not 200 (OK), and throwing an error if it's not
    if (statusCode !== 200) {
      throw new Error(`Unexpected status code: ${statusCode}`);
    }

    const responseData = await body.json();

    // Trying to get the BSE price from the response
    const bsePrice = responseData?.currentPrice?.BSE;

    // If BSE price is missing, throw an error
    if (!bsePrice) {
      throw new Error("BSE price not found in the response");
    }
    return bsePrice;
  } catch (error) {
    console.error("Error fetching stock price:", error.message);
    throw new Error("Failed to fetch stock price");
  }
};
