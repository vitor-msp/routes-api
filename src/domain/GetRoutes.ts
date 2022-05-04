import { CopyRoute } from "./CopyRoute";
import { Edge } from "./Edge";
import { Graph } from "./Graph";
import { Route } from "./Route";

export class GetRoutes {
  private routes: Route[] = [];
  private readonly graph: Graph;
  private readonly from: string;
  private readonly to: string;
  private readonly maxStops: number;

  constructor(
    graph: Graph,
    from: string,
    to: string,
    maxStops: number = Infinity
  ) {

    this.validateData(graph, from, to);

    this.graph = graph;
    this.from = from;
    this.to = to;
    this.maxStops = maxStops;
  }

  private validateData(graph: Graph, from: string, to: string): void {
    if (
      graph.data.findIndex(
        ({ source, target }) => source === from || target === from
      ) === -1
    )
      throw new Error("Source not present in graph!");

    if (
      graph.data.findIndex(
        ({ source, target }) => source === to || target === to
      ) === -1
    )
      throw new Error("Target not present in graph!");
  }

  public execute(): Route[] | null {
    if (this.from == this.to) return null;

    const route = new Route(this.from);
    this.getNextRoutes(route);

    return this.routes;
  }

  private getNextRoutes(route: Route): void {
    const edges: Edge[] = this.graph.data.filter(
      (edge) => route.getLastStop() === edge.source
    );

    for (const edge of edges) {
      if (route.stopExists(edge.target)) continue;

      const newRoute: Route = CopyRoute.fromOldRoute(route);
      newRoute.addStop(edge.target);

      if (newRoute.getLastStop() === this.to) {
        this.routes.push(newRoute);
        continue;
      }

      if (newRoute.getTotalStops() === this.maxStops) {
        continue;
      }

      this.getNextRoutes(newRoute);
    }
  }
}
