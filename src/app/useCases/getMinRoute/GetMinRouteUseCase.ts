import { Edge } from "../../../domain/Edge";
import { GetMinRoute } from "../../../domain/GetMinRoute";
import { Graph } from "../../../domain/Graph";
import { Path } from "../../../domain/Path";
import { IGraphsRepository } from "../../../infra/repositories/IGraphsRepository";
import { IGraph } from "../../../interfaces/IGraph";
import { IGetMinRouteDTO } from "./IGetMinRouteDTO";

export class GetMinRouteUseCase {
  constructor(private readonly graphsRepository: IGraphsRepository) {}

  async execute(getMinRouteDTO: IGetMinRouteDTO): Promise<Path | null> {
    const { graphId, from, to } = getMinRouteDTO;

    const graphEnt: IGraph | null = await this.graphsRepository.findById(
      graphId
    );

    if (!graphEnt) return null;

    const edges: Edge[] = [];

    for (const edgeEnt of graphEnt.data) {
      const { source, target, distance } = edgeEnt;
      edges.push(new Edge(source, target, distance));
    }

    const graph = new Graph(edges);

    const path: Path | number = new GetMinRoute(graph, from, to).execute();

    if (path === 0) return new Path();

    if (path === -1) {
      const pathNegCase = new Path();
      pathNegCase.addDistance(-1);
      return pathNegCase;
    };

    // @ts-ignore
    return path;
  }
}
