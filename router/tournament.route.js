import { Router } from "express";
import {
  CreateTournament,
  delTournament,
  filtrTournament,
  findByIdTournaments,
  getAllTournament,
  updateTournaments,
} from "../controller/tournament.controller.js";
import validate from "../middlewares/validationd.js";
import { tournamentSchema } from "../validations/tournament.validation.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";

const router = Router();

router.post("/", admin_authGuard, validate(tournamentSchema), CreateTournament);
router.get("/", getAllTournament);
router.get("/filtr", filtrTournament);
router.get("/:id", admin_authGuard, findByIdTournaments);
router.patch(
  "/:id",
  admin_authGuard,
  validate(tournamentSchema),
  updateTournaments
);
router.delete("/:id", admin_authGuard, delTournament);

export default router;
