import express from "express";
import * as actions from "../controllers/users";
import { isAuthenticated } from "../middlewares/user";

const router = express.Router();

router.post("/login", actions.login);
router.get("/", isAuthenticated, actions.index);
router.get("/:id", isAuthenticated, actions.show);
router.post("/", actions.create);

export default router;
