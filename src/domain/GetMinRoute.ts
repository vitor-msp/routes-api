import { Edge } from "./Edge";
import { GetRoutes } from "./GetRoutes";
import { Graph } from "./Graph";
import { Path } from "./Path";
import { Route } from "./Route";

export class GetMinRoute {
  private minRoute: Path;
  private readonly graph: Graph;
  private readonly routes: Route[] | null;

  constructor(graph: Graph, from: string, to: string) {
    this.graph = graph;
    this.routes = new GetRoutes(graph, from, to).execute();
    this.minRoute = new Path().addDistance(Infinity);
  }

  execute(): Path | number {
    if (this.sourceAndTargetAreEqual()) return 0;
    if (this.noneRoute()) return -1;
    this.calculate();
    return this.minRoute;
  }

  private sourceAndTargetAreEqual(): boolean {
    return this.routes === null;
  }

  private noneRoute(): boolean {
    return this.routes != null && this.routes.length === 0;
  }

  private calculate(): void {
    if (!this.routes) return;
    for (const route of this.routes) {
      this.processRoute(route);
    }
  }

  private processRoute(route: Route): void {
    let foundedNewMinRoute = false;
    const path = this.getPathFromRoute(route);
    const stops: string[] = path.getPath();
    for (let stopIndex = 0; stopIndex < stops.length - 1; stopIndex++) {
      foundedNewMinRoute = this.processStop(stops, stopIndex, path);
    }
    if (foundedNewMinRoute) this.minRoute = path;
  }

  private getPathFromRoute(route: Route): Path {
    const path = new Path();
    path.setPath(route.getRoute());
    return path;
  }

  private processStop(stops: string[], stopIndex: number, path: Path): boolean {
    const FOUNDED_NEW_MIN_ROUTE = true;
    const NOT_FOUNDED_NEW_MIN_ROUTE = false;

    const currentStop = stops[stopIndex];
    const nextStop = stops[stopIndex + 1];
    const edge = this.getEdgeFromStops(currentStop, nextStop);
    if (!edge) return NOT_FOUNDED_NEW_MIN_ROUTE;

    path.addDistance(edge.distance);
    if (this.routeIsMin(path)) return FOUNDED_NEW_MIN_ROUTE;
    return NOT_FOUNDED_NEW_MIN_ROUTE;
  }

  private getEdgeFromStops(
    currentStop: string,
    nextStop: string
  ): Edge | undefined {
    return this.graph.edges.find(
      ({ source, target }) => source === currentStop && target === nextStop
    );
  }

  private routeIsMin(path: Path): boolean {
    return path.getTotalDistance() < this.minRoute.getTotalDistance();
  }
}
