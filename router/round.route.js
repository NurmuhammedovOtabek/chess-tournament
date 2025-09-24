import { Router } from "express";
import { CreateRound, delRound, findByIdRounds, getAllRound, updateRounds } from "../controller/round.controller.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";


const router = Router();

router.post("/", admin_authGuard, CreateRound)
router.get("/", getAllRound)
router.get("/:id", findByIdRounds)
router.patch("/:id", admin_authGuard, updateRounds)
router.delete("/:id", admin_authGuard, delRound)

export default router