import { Router } from "express";
import validate from "../middlewares/validationd.js";
import adminSchema from "../validations/admin.validation.js";
import {
  CreateAdmin,
  delAdmin,
  filtrAdmin,
  findByIdAdmins,
  getAllAdmin,
  updateAdmins,
} from "../controller/admin.controller.js";
import selfGuard from "../middlewares/guards/self.guard.js";
import admin_authGuard from "../middlewares/guards/admin_auth.guard.js";
import creatorGuard from "../middlewares/guards/creator.guard.js";



const router = Router();

router.post("/", validate(adminSchema), admin_authGuard, creatorGuard, CreateAdmin);
router.get("/", admin_authGuard, getAllAdmin);
router.get("/filtr", admin_authGuard, filtrAdmin);
router.get("/:id", admin_authGuard, selfGuard, findByIdAdmins);
router.patch("/:id", admin_authGuard, selfGuard, updateAdmins);
router.delete("/:id", admin_authGuard, selfGuard, delAdmin);

export default router;
