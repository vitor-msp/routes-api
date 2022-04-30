import { Request, Response } from "express";
import { IGraph } from "../../interfaces/IGraph";
import { GetGraphUseCase } from "../useCases/getGraph/GetGraphUseCase";

export class GetGraphController {
  constructor(private readonly getGraphUseCase: GetGraphUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id = +req.params.id;

      const graph: IGraph | null = await this.getGraphUseCase.execute(id);

      if (!graph) return res.status(404).send();

      return res.status(200).json(graph);
    } catch (error: any) {
      return res.status(400).json({
        message: error?.message || `Unexpected error!`,
      });
    }
  }
}
