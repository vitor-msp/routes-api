import { Router } from "express";
import {
  getGraphController,
  getMinRouteController,
  getRoutesController,
  postGraphController,
} from "./main";

const router = Router();

router.post("/graph", async (req, res) => {
  await postGraphController.handle(req, res);
});

router.get("/graph/:id", async (req, res) => {
  await getGraphController.handle(req, res);
});

router.post("/routes/:graphId/from/:town1/to/:town2", async (req, res) => {
  await getRoutesController.handle(req, res);
});

router.post("/distance/:graphId/from/:town1/to/:town2", async (req, res) => {
  await getMinRouteController.handle(req, res);
});

export default router;
