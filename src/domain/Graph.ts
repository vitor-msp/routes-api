import { Edge } from "./Edge";

export class Graph {
  public readonly data: Edge[];
  public readonly id?: number;

  constructor(data: Edge[], id?: number) {
    if (!this.validateData(data)) throw new Error("Duplicated edges!");

    this.data = data;
    this.id = id ?? undefined;
  }

  // valida a não existência de trechos (Edges) duplicados
  private validateData(data: Edge[]): boolean {
    for (let i = 0; i < data.length - 1; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (
          data[i].source === data[j].source &&
          data[i].target === data[j].target &&
          data[i].distance === data[j].distance
        ) {
          return false;
        }
      }
    }
    return true;
  }
}