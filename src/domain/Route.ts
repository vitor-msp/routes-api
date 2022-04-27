export class Route {
  private route: string;
  private stops: number;

  constructor(source: string) {
    this.route = source;
    this.stops = 0;
  }

  static fromOldRoute(oldRoute: Route): Route {
    const newRoute = new Route(oldRoute.route);
    newRoute.stops = oldRoute.stops;
    return newRoute;
  }

  addStop(stop: string): void {
    this.route += stop;
    this.stops++;
  }

  getLastStop(): string {
    return this.route.at(this.route.length - 1)!;
  }

  getTotalStops(): number {
    return this.stops;
  }
}
