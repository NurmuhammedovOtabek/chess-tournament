import { Router } from "express";
import adminRouter from "./admin.route.js"
import adminAuthRouter from "./admin_auth.route.js"

const router = Router()

router.use("/admin", adminRouter)
router.use("/auth", adminAuthRouter)

export default router