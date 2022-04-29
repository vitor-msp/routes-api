import { Edge } from "../../../domain/Edge";
import { GetRoutes } from "../../../domain/GetRoutes";
import { Graph } from "../../../domain/Graph";
import { Route } from "../../../domain/Route";
import { IGraphsRepository } from "../../../infra/repositories/IGraphsRepository";
import { IGraph } from "../../../interfaces/IGraph";
import { GetRoutesDTO } from "./GetRoutesDTO";

export class GetRoutesUseCase {
  constructor(private readonly graphsRepository: IGraphsRepository) {}

  async execute(getRoutesDTO: GetRoutesDTO): Promise<Route[] | null> {
    const { graphId, from, to } = getRoutesDTO;

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

    const routes: Route[] | null = new GetRoutes(
      graph,
      from,
      to,
      getRoutesDTO.maxStops ?? undefined
    ).execute();

    if (!routes) return [];
    return routes;
  }
}