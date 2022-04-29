import { Router } from "express";
import { getGraphController, getRoutesController, postGraphController } from "./main";

const router = Router();

router.post("/graph", (req, res) => {
  postGraphController.handle(req, res);
});

router.get("/graph/:id", (req, res) => {
  getGraphController.handle(req, res);
});

router.post("/routes/:graphId/from/:town1/to/:town2", (req, res) => {
  getRoutesController.handle(req, res);
});

export default router;
