export class Edge {
  public readonly source: string;
  public readonly target: string;
  public readonly distance: number;

  constructor(source: string, target: string, distance: number) {
    if (!this.validateData(source, target))
      throw new Error("Source cannot be equals target!");

    this.source = source;
    this.target = target;
    this.distance = distance;
  }

  private validateData(source: string, target: string): boolean {
    return !(source === target);
  }
}