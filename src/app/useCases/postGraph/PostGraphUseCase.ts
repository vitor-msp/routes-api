import { Edge } from "../../../domain/Edge";
import { Graph } from "../../../domain/Graph";
import { IGraphsRepository } from "../../../infra/repositories/IGraphsRepository";
import { IGraph } from "../../../interfaces/IGraph";

export class PostGraphUseCase {
  constructor(private readonly graphsRepository: IGraphsRepository) {}

  async execute(graphReq: IGraph): Promise<IGraph> {
    const { data } = graphReq;

    const edges: Edge[] = [];

    data.forEach(({ source, target, distance }) => {
      edges.push(new Edge(source, target, distance));
    });

    const graph = new Graph(edges);

    return await this.graphsRepository.insert(graph);
  }
}
