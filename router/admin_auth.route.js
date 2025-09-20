import { Router } from "express";
import { login, logout, refreshToken } from "../auth/admin.auth.js";

const router = Router()

router.post("/login", login)
router.post("/logout", logout)
router.post("/refreshtoken", refreshToken)

export default router