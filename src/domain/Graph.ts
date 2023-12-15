import { Edge } from "./Edge";

export class Graph {
  public readonly edges: Edge[];
  public readonly id?: number;

  constructor(edges: Edge[], id?: number) {
    this.edges = edges;
    if (this.edgesAreInvalid()) throw new Error("Duplicated edges!");
    this.id = id ?? undefined;
  }

  // valida a não existência de trechos (Edges) duplicados
  private edgesAreInvalid(): boolean {
    for (
      let currentEdgeIndex = 0;
      currentEdgeIndex < this.edges.length - 1;
      currentEdgeIndex++
    ) {
      const currentEdge = this.edges[currentEdgeIndex];
      if (this.edgeIsInvalid(currentEdge, currentEdgeIndex)) return true;
    }
    return false;
  }

  private edgeIsInvalid(currentEdge: Edge, currentEdgeIndex: number): boolean {
    for (
      let nextEdgeIndex = currentEdgeIndex + 1;
      nextEdgeIndex < this.edges.length;
      nextEdgeIndex++
    ) {
      const nextEdge = this.edges[nextEdgeIndex];
      if (this.edgesAreEqual(currentEdge, nextEdge)) return true;
    }
    return false;
  }

  private edgesAreEqual(currentEdge: Edge, nextEdge: Edge): boolean {
    return (
      currentEdge.source === nextEdge.source &&
      currentEdge.target === nextEdge.target &&
      currentEdge.distance === nextEdge.distance
    );
  }
}
