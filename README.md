# Trading Bot Backend

## Description
This is a backend service that simulates a trading bot for a stock market, using a simple trading strategy.

## Setup

1. Clone the repository
   git clone = https://github.com/Pratikmore408/tradingBot
   cd tradingBot
   
## Install dependencies
npm install

## Set up your .env file
PORT=5000,
MONGO_URI=your mongo db url,
API_URL=https://stock.indianapi.in
## now you have to get your own api key by signing in but you can use my api key
API_KEY=sk-live-G6BgQHkVGk22Vdq3OlmvPmwxccL5Qv6ReT40qubq


## Start the server
npm start

## Endpoints
GET /api/trade/:name - Executes a trade based on the strategy.
GET /api/trades - Fetches all trades made by the bot.

you can trade in any company's stock bu visiting :: localhost:5000/api/trade/{company name}
and you can get all the past trade by visiting :: localhost:5000/api/trades
