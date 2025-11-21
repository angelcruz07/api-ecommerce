import { Router } from 'express';
import { RoleController } from "@controllers/role.controller.ts";
import { RoleService} from "@services/role.service.ts";

const roleService = new RoleService();
const controller = new RoleController(roleService);

const router = Router();

router.get("/", controller.getRoles);

export default router;