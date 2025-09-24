import { Router } from "express";
import { login, logout, refreshToken, register } from "../auth/user.auth.js";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh", refreshToken)

export default router