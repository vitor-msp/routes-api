import { Router } from "express";
import { postGraphController } from "./main";

const router = Router();

router.post("/graph", (req, res) => {
  postGraphController.handle(req, res);
});

export default router;
