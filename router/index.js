import { Router } from "express";
console.log("a");

import adminRouter from "./admin.route.js"
import adminAuthRouter from "./admin_auth.route.js"
import chess_typeRouter from "./chess_type.route.js"
import playerRouter from "./player.route.js"
import tournamentRouter from "./tournament.route.js"
import user_authRouter from "./user_auth.route.js"
import matchRouter from "./match.route.js"
import roundRouter from "./round.route.js"
import Tournament_palyer_router from "./tournament_player.route.js"
import userRouter from "./user.route.js"

const router = Router()

router.use("/admin", adminRouter)
router.use("/auth", adminAuthRouter)
router.use("/chess_type", chess_typeRouter)
router.use("/player", playerRouter)
router.use("./tournament", tournamentRouter)
router.use("/user_auth", user_authRouter)
router.use("/match", matchRouter)
router.use("/round", roundRouter)
router.use("/tournament_palyer", Tournament_palyer_router);
router.use("/user", userRouter)

export default router