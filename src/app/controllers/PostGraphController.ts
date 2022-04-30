import { Request, Response } from "express";
import { IGraph } from "../../interfaces/IGraph";
import { PostGraphUseCase } from "../useCases/postGraph/PostGraphUseCase";

export class PostGraphController {
  constructor(private readonly postGraphUseCase: PostGraphUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { data }: IGraph = req.body;

      const graph: IGraph = await this.postGraphUseCase.execute({ data });

      return res.status(201).json(graph);
    } catch (error: any) {
      return res.status(400).json({
        message: error?.message || `Unexpected error!`,
      });
    }
  }
}
