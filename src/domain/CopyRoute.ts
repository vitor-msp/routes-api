import { Route } from "./Route";

export abstract class CopyRoute {
  // cria e retorna uma cópia da rota passada
  static fromOldRoute(oldRoute: Route): Route {
    const newRoute = new Route(oldRoute.getRoute());
    newRoute.setTotalStops(oldRoute.getTotalStops());
    return newRoute;
  }
}
