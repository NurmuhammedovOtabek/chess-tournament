import { Router } from "express";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";
import {
  CreateUser,
  delUser,
  filtrUser,
  findByIdUsers,
  getAllUser,
  updateUsers,
} from "../controller/user.controller.js";

const router = Router();

router.post("/", admin_authGuard, CreateUser);
router.get("/", getAllUser);
router.get("/filter", filtrUser);
router.get("/:id", findByIdUsers);
router.patch("/:id", admin_authGuard, updateUsers);
router.delete("/:id", admin_authGuard, delUser);

export default router;
