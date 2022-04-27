export class Edge {
  constructor(
    public readonly source: string,
    public readonly target: string,
    public readonly distance: number
  ) {}
}