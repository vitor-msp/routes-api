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
    this.validateInput(graph, from, to);
    this.graph = graph;
    this.from = from;
    this.to = to;
    this.maxStops = maxStops;
  }

  private validateInput(graph: Graph, from: string, to: string): void {
    if (this.sourceNotExistsInGraph(graph, from))
      throw new Error("Source not present in graph!");
    if (this.targetNotExistsInGraph(graph, to))
      throw new Error("Target not present in graph!");
  }

  private sourceNotExistsInGraph(graph: Graph, from: string): boolean {
    return (
      graph.edges.findIndex(
        ({ source, target }) => source === from || target === from
      ) === -1
    );
  }

  private targetNotExistsInGraph(graph: Graph, to: string): boolean {
    return (
      graph.edges.findIndex(
        ({ source, target }) => source === to || target === to
      ) === -1
    );
  }

  public execute(): Route[] | null {
    if (this.noneRoute()) return null;
    const route = new Route(this.from);
    this.getNextRoutes(route);
    return this.routes;
  }

  private noneRoute(): boolean {
    return this.from == this.to || this.maxStops === 0;
  }

  private getNextRoutes(route: Route): void {
    const edges: Edge[] = this.getNextEdges(route);
    for (const edge of edges) {
      this.processEdge(edge, route);
    }
  }

  private processEdge(edge: Edge, route: Route): void {
    if (this.targetAlreadyTraveled(route, edge)) return;
    const newRoute: Route = this.getRouteWithNewStop(route, edge);
    if (this.targetReached(newRoute)) {
      this.routes.push(newRoute);
      return;
    }
    if (this.maxStopsReached(newRoute)) return;
    this.getNextRoutes(newRoute);
  }

  private getNextEdges(route: Route): Edge[] {
    return this.graph.edges.filter(
      (edge) => route.getLastStop() === edge.source
    );
  }

  private targetAlreadyTraveled(route: Route, edge: Edge): boolean {
    return route.stopExists(edge.target);
  }

  private getRouteWithNewStop(route: Route, edge: Edge): Route {
    const newRoute: Route = Route.clone(route);
    newRoute.addStop(edge.target);
    return newRoute;
  }

  private targetReached(route: Route): boolean {
    return route.getLastStop() === this.to;
  }

  private maxStopsReached(route: Route): boolean {
    return route.getTotalStops() >= this.maxStops;
  }
}
