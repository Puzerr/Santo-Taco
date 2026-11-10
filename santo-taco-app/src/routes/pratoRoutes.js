import express from "express";
import  getPratos  from "../controllers/PratoController.js";

const router = express.Router();

router.get("/", getPratos);

export default router;
