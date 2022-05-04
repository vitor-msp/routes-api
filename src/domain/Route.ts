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

  setTotalStops(totalStops: number): void {
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

  // verifica se nó já existe nesta rota
  stopExists(stop: string): boolean {
    return this.route.split("").includes(stop);
  }
}
