import { Router } from "express";
import { CreateChess_type, delChess_type, filtrChess_type_category, findByIdChess_types, getAllChess_type, updateChess_types } from "../controller/chess_type.controller.js";
import validate from "../middlewares/validationd.js";
import { chessTypeSchema } from "../validations/chess_type.validation.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";


const router = Router()

router.post("/", validate(chessTypeSchema), admin_authGuard,CreateChess_type)
router.get("/", admin_authGuard, getAllChess_type);
router.get("/filtr", admin_authGuard, filtrChess_type_category);
router.get("/:id", admin_authGuard, findByIdChess_types);
router.patch("/:id", admin_authGuard, validate(chessTypeSchema), updateChess_types);
router.delete("/:id", admin_authGuard, delChess_type);

export default router