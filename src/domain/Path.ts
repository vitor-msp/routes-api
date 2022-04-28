export class Path {
  private distance: number;
  private path: string[];

  constructor() {
    this.distance = 0;
    this.path = [];
  }

  setPath(pathString: string): void {
    this.path = pathString.split("");
  }

  getPath(): string[] {
    return this.path;
  }

  addDistance(newDistance: number): void {
    this.distance += newDistance;
  }

  getTotalDistance(): number {
    return this.distance;
  }
}
