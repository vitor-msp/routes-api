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
    this.minRoute = new Path();
    this.minRoute.addDistance(Infinity);
  }

  execute(): Path | number {
    if (!this.routes) return 0;

    if (this.routes.length === 0) return -1;

    this.calculate();

    return this.minRoute;
  }

  private calculate(): void {
    let skipRoute;

    for (const route of this.routes!) {
      skipRoute = false;
      const path = new Path();
      path.setPath(route.getRoute());

      const stops: string[] = path.getPath();

      for (let i = 0; i < stops.length - 1; i++) {
        const edge: Edge | undefined = this.graph.data
          .filter(
            ({ source, target }) =>
              source === stops[i] && target === stops[i + 1]
          )
          .at(0);

        if (!edge) {
          skipRoute = true;
          break;
        }

        path.addDistance(edge.distance);

        if (path.getTotalDistance() >= this.minRoute.getTotalDistance()) {
          skipRoute = true;
          break;
        }
      }

      if (!skipRoute) this.minRoute = path;
    }
  }
}
