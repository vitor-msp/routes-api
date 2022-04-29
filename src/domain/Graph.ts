import { Edge } from "./Edge";

export class Graph {
  constructor(public readonly data: Edge[], private readonly id?: number) {}
}
