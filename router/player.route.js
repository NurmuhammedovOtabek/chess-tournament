import { Router } from "express";
import { CreatePlayer, delPlayer, filtrPlayer, findByIdPlayers, getAllPlayer, updatePlayers } from "../controller/player.controller.js";
import validate from "../middlewares/validationd.js";
import { playerSchema } from "../validations/player.validation.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";

const router = Router()

router.post("/", validate(playerSchema), CreatePlayer)
router.get("/", getAllPlayer)
router.get("/filtr", filtrPlayer)
router.get("/:id", findByIdPlayers)
router.patch("/:id", admin_authGuard, validate(playerSchema), updatePlayers);
router.delete("/:id", admin_authGuard, delPlayer);

export default router