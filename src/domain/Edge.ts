export class Edge {
  public readonly source: string;
  public readonly target: string;
  public readonly distance: number;

  constructor(source: string, target: string, distance: number) {
    if (this.sourceTargetIsInvalid(source, target))
      throw new Error("Source cannot be equals target!");

    this.source = source;
    this.target = target;
    this.distance = distance;
  }

  private sourceTargetIsInvalid(source: string, target: string): boolean {
    return source === target;
  }
}
