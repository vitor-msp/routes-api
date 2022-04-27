import { Edge } from "./Edge";
import { Graph } from "./Graph";
import { Route } from "./Route";

export class GetRoutes {
  private routes: Route[] = [];

  constructor(
    private readonly graph: Graph,
    private readonly from: string,
    private readonly to: string,
    private readonly maxStops: number
  ) {}

  public execute(): Route[] {
    const firstEdges: Edge[] = this.getEdgesFromSource();

    for (const edge of firstEdges) {
      const route = new Route(edge.source);
      route.addStop(edge.target);
      this.getNextRoutes(route);
    }

    return this.routes;
  }

  private getEdgesFromSource(): Edge[] {
    return this.graph.data.filter((edge) => edge.source === this.from);
  }

  private getNextRoutes(route: Route): void {
    this.graph.data
      .filter((edge) => route.getLastStop() === edge.source)
      .forEach((edge) => {
        const newRoute: Route = Route.fromOldRoute(route);
        newRoute.addStop(edge.target);
        if (newRoute.getLastStop() === this.to) {
          this.routes.push(newRoute);
          return;
        }
        if (newRoute.getTotalStops() === this.maxStops) {
          return;
        }
        this.getNextRoutes(newRoute);
      });
  }
}
