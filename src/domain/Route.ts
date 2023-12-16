export class Route {
  private route: string;
  private stops: number;

  constructor(source: string) {
    this.route = source;
    this.stops = 0;
  }

  addStop(stop: string): void {
    this.route += stop;
    this.stops++;
  }

  private setTotalStops(totalStops: number): void {
    this.stops = totalStops;
  }

  getLastStop(): string {
    return this.route.at(this.route.length - 1)!;
  }

  getTotalStops(): number {
    return this.stops;
  }

  getRoute(): string {
    return this.route;
  }

  stopExists(stop: string): boolean {
    return this.route.split("").includes(stop);
  }

  static clone(oldRoute: Route): Route {
    const newRoute = new Route(oldRoute.getRoute());
    newRoute.setTotalStops(oldRoute.getTotalStops());
    return newRoute;
  }
}
