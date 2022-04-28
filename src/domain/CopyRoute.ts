import { Route } from "./Route";

export abstract class CopyRoute {
  static fromOldRoute(oldRoute: Route): Route {
    const newRoute = new Route(oldRoute.getRoute());
    newRoute.setTotalStops(oldRoute.getTotalStops());
    return newRoute;
  }
}
