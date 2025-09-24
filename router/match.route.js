import { Router } from "express";
import {
  CreateMatch,
  delMatch,
  findByIdMatchs,
  getAllMatch,
  updateMatchs,
} from "../controller/match.controller.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";

const router = Router();

router.post("/", admin_authGuard, CreateMatch);
router.get("/", getAllMatch);
router.get("/:id", findByIdMatchs);
router.patch("/:id", admin_authGuard, updateMatchs);
router.delete("/:id", admin_authGuard, delMatch);

export default router;
