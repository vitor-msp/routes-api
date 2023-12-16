import { Edge } from "./Edge";
import { Graph } from "./Graph";
import { Route } from "./Route";

export class GetRoutes {
  private routes: Route[] = [];
  private readonly graph: Graph;
  private readonly from: string;
  private readonly to: string;
  private readonly maxStops: number;

  constructor(
    graph: Graph,
    from: string,
    to: string,
    maxStops: number = Infinity
  ) {

    this.validateData(graph, from, to);

    this.graph = graph;
    this.from = from;
    this.to = to;
    this.maxStops = maxStops;
  }

  // valida a existência de source e target no graph informado
  private validateData(graph: Graph, from: string, to: string): void {
    if (
      graph.edges.findIndex(
        ({ source, target }) => source === from || target === from
      ) === -1
    )
      throw new Error("Source not present in graph!");

    if (
      graph.edges.findIndex(
        ({ source, target }) => source === to || target === to
      ) === -1
    )
      throw new Error("Target not present in graph!");
  }

  // orquestra da obtenção das rotas
  public execute(): Route[] | null {
    if (this.from == this.to || this.maxStops === 0) return null;

    // cria uma rota partindo do source
    const route = new Route(this.from);
    this.getNextRoutes(route);

    return this.routes;
  }

  // a partir de uma rota recebida, busca novas paradas que podem gerar novas rotas
  private getNextRoutes(route: Route): void {
    // busca todos os novos trechos (Edges) que começam na útlima parada da rota recebida
    const edges: Edge[] = this.graph.edges.filter(
      (edge) => route.getLastStop() === edge.source
    );

    for (const edge of edges) {
      // se a nova parada deste trecho já estava na rota, então o trecho é ignorado
      if (route.stopExists(edge.target)) continue;

      // se o trecho não for ignorado, uma cópia da rota recebida é criada incluindo a nova parada
      const newRoute: Route = Route.clone(route);
      newRoute.addStop(edge.target);

      // se esta nova parada é o destino, então esta rota é válida
      if (newRoute.getLastStop() === this.to) {
        this.routes.push(newRoute);
        continue;
      }

      // se a nova parada não é o destino e as paradas foram esgotadas, então esta rota é ignorada
      if (newRoute.getTotalStops() === this.maxStops) {
        continue;
      }

      // se o destino não foi alcançado e ainda há paradas, então esta rota é passada de forma
      // recursiva para se obter as próximas rotas
      this.getNextRoutes(newRoute);
    }
  }
}
