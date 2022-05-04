export class Path {
  private distance: number;
  private path: string[];

  constructor() {
    this.distance = 0;
    this.path = [];
  }

  // os nós da rota são distribuidos em uma lista
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
