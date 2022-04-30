import { Edge } from "./Edge";

export class Graph {
  // nao aceitar rotas repetidas
  constructor(public readonly data: Edge[], private readonly id?: number) {}
}
