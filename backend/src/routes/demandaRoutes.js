import express from "express";
import { getDemandas, postDemanda, putDemanda, deleteDemanda } from "../controllers/demandaController.js";

const router = express.Router();

router.get("/", getDemandas);
router.post("/", postDemanda);
router.put("/:id", putDemanda);
router.delete("/:id", deleteDemanda);

export default router;
