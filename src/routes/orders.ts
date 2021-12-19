import express from "express";
import * as actions from "../controllers/orders";
import { isAuthenticated } from "../middlewares/user";

const router = express.Router();

router.get("/current", isAuthenticated, actions.current);
router.get("/completed", isAuthenticated, actions.completed);
router.post("/", isAuthenticated, actions.create);

export default router;
