import express from "express";
import * as actions from "../controllers/products";
import { isAuthenticated } from "../middlewares/user";

const router = express.Router();

router.get("/", actions.index);
router.get("/:id", actions.show);
router.post("/", isAuthenticated, actions.create);
router.get("/top/:qt", actions.popular);
router.get("/category/:category", actions.category);

export default router;
