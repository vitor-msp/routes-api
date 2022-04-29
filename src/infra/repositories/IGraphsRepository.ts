import { Graph } from "../../domain/Graph";
import { IGraph } from "../../interfaces/IGraph";

export interface IGraphsRepository {

  insert(graph: Graph): Promise<IGraph>;

}
