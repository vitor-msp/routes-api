import { Edge } from "../domain/Edge";

export interface IGraph {
  id?: number;
  data: Edge[];
}
