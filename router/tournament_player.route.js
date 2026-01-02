import { Router } from "express";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";
import {
  CreateTournament_player,
  delTournament_player,
  findByIdTournament_players,
  getAllTournament_player,
  sorov,
  updateTournament_players,
} from "../controller/tournament-palyer.controller.js";

const router = Router();

router.post("/", admin_authGuard, CreateTournament_player);
router.get("/", getAllTournament_player);
router.get("/sorov", sorov)
router.get("/:id", findByIdTournament_players);
router.patch("/:id", admin_authGuard, updateTournament_players);
router.delete("/:id", admin_authGuard, delTournament_player);


export default router;
