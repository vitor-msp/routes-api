import { Request, Response } from "express";
import { Path } from "../../domain/Path";
import { GetMinRouteUseCase } from "../useCases/getMinRoute/GetMinRouteUseCase";

export class GetMinRouteController {
  constructor(private readonly getMinRouteUseCase: GetMinRouteUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { graphId, town1, town2 } = req.params;

      const path: Path | null = await this.getMinRouteUseCase.execute({
        graphId: +graphId,
        from: town1,
        to: town2,
      });

      if (!path) return res.status(404).send();

      return res.status(200).json(path);
    } catch (error: any) {
      return res.status(400).json({
        message: error?.message || `Unexpected error!`,
      });
    }
  }
}
