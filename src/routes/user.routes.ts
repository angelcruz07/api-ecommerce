import { Router } from "express";
import { UserController } from "@controllers/user.controller";
import { UserService } from "@services/user.service";

const userService = new UserService();
const controller = new UserController(userService);

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);

export default router;
