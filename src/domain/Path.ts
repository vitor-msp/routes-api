export class Path {
  private distance: number;
  private path: string[];

  constructor() {
    this.distance = 0;
    this.path = [];
  }

  setPath(path: string): void {
    this.path = path.split("");
  }

  getPath(): string[] {
    return this.path;
  }

  addDistance(newDistance: number): Path {
    this.distance += newDistance;
    return this;
  }

  getTotalDistance(): number {
    return this.distance;
  }
}
