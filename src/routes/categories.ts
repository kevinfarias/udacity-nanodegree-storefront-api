import express from "express";
import * as actions from "../controllers/categories";
import { isAuthenticated } from "../middlewares/user";

const router = express.Router();

router.get("/", actions.index);
router.get("/:id", actions.show);
router.post("/", isAuthenticated, actions.create);

export default router;
