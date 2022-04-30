export class Edge {
  // nao aceitar source = target
  constructor(
    public readonly source: string,
    public readonly target: string,
    public readonly distance: number
  ) {}
}