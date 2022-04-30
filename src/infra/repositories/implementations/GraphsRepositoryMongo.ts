import { Graph } from "../../../domain/Graph";
import { IGraph } from "../../../interfaces/IGraph";
import { NextId } from "../../../utils/NextId";
import { GraphModel, IGraphModel } from "../../database/schemas/GraphSchema";
import { IGraphsRepository } from "../IGraphsRepository";

export class GraphsRepositoryMongo implements IGraphsRepository {
  async insert(graph: Graph): Promise<IGraph> {
    const nextId = await NextId.get();

    const { id, data }: IGraphModel = await GraphModel.create({
      id: nextId,
      data: graph.data,
    });

    return {
      id,
      data,
    };
  }

  async findById(id: number): Promise<IGraph | null> {
    const graph: IGraph | null = await GraphModel.findOne({ id });

    if (!graph) return null;

    return { id: graph.id, data: graph.data };
  }
}