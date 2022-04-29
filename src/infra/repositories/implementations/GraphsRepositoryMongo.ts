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
//   async findByHostname(hostname: string): Promise<IComputer | undefined> {
//     const computerEnt: IComputer | null = await ComputerModel.findOne({
//       hostname,
//     });

//     if (!computerEnt) return undefined;

//     return computerEnt;
//   }

//   async add(computer: Computer): Promise<void> {

//   }

//   async getAll(): Promise<Computer[]> {
//     return await ComputerModel.find();
//   }
