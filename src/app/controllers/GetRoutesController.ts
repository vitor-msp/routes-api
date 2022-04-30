import { Request, Response } from "express";
import { Route } from "../../domain/Route";
import { GetRoutesUseCase } from "../useCases/getRoutes/GetRoutesUseCase";

export class GetRoutesController {
  constructor(private readonly getRoutesUseCase: GetRoutesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { graphId, town1, town2 } = req.params;

      let maxStops: number | undefined;
      try {
        maxStops = req.query.maxStops ? +req.query.maxStops : undefined;
      } catch (error) {
        maxStops = undefined;
      }

      const routes: Route[] | null = await this.getRoutesUseCase.execute({
        graphId: +graphId,
        from: town1,
        to: town2,
        maxStops,
      });

      if (!routes) return res.status(404).send();

      const jsonRes = {
        routes: routes,
      };

      return res.status(200).json(jsonRes);
    } catch (error: any) {
      return res.status(400).json({
        message: error?.message || `Unexpected error!`,
      });
    }
  }
}
