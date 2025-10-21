import express from "express";
import { getObras, postObra, putObra, deleteObra } from "../controllers/obraControler.js";

const router = express.Router();

router.get("/", getObras);
router.post("/", postObra);
router.put("/:id", putObra);
router.delete("/:id", deleteObra);

export default router;
