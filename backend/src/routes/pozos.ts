import { Router } from "express";
import { getPozos, createPozo, updateEstado } from "../controllers/pozosController";

const router = Router();

router.get("/", getPozos);
router.post("/", createPozo);
router.patch("/:id", updateEstado);

export default router;
