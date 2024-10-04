import express from "express";
import { executeTrade, getTrades } from "../controllers/tradeController.js";

const router = express.Router();

router.get("/trade/:name", executeTrade);
router.get("/trades", getTrades);

export default router;
