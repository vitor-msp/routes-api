import { Router } from "express";
import { getGraphController, postGraphController } from "./main";

const router = Router();

router.post("/graph", (req, res) => {
  postGraphController.handle(req, res);
});

router.get("/graph/:id", (req, res) => {
  getGraphController.handle(req, res);
});

export default router;
