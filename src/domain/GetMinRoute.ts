import { Edge } from "./Edge";
import { GetRoutes } from "./GetRoutes";
import { Graph } from "./Graph";
import { Path } from "./Path";
import { Route } from "./Route";

export class GetMinRoute {
  private minRoute: Path;
  private readonly graph: Graph;
  private readonly routes: Route[] | null;

  constructor(graph: Graph, from: string, to: string) {
    this.graph = graph;
    // busca as rotas da origem ao destino
    this.routes = new GetRoutes(graph, from, to).execute();
    // inicia um caminho mínimo com distância infinita
    this.minRoute = new Path();
    this.minRoute.addDistance(Infinity);
  }

  // orquestra a obtenção da mínima rota
  execute(): Path | number {
    // caso em que origem é igual ao destino
    if (!this.routes) return 0;

    // caso em que não foram encontradas rotas
    if (this.routes.length === 0) return -1;

    // caso em que foram encontradas rotas
    this.calculate();

    return this.minRoute;
  }

  // calcula mínima rota em uma lista
  private calculate(): void {
    let skipRoute;

    for (const route of this.routes!) {
      skipRoute = false;
      // cria uma estrutura do tipo Path a partir da rota
      const path = new Path();
      // os nós da rota são distribuidos em uma lista
      path.setPath(route.getRoute());

      const stops: string[] = path.getPath();

      // percorre os nós da rota
      for (let i = 0; i < stops.length - 1; i++) {
        // busca o trecho (Edge) que começa neste nó e vai até o próximo
        const edge: Edge | undefined = this.graph.edges
          .filter(
            ({ source, target }) =>
              source === stops[i] && target === stops[i + 1]
          )
          .at(0);

        // caso não encontre o trecho (Edge), esta rota será pulada
        if (!edge) {
          skipRoute = true;
          break;
        }

        // caso encontre o trecho, sua distância é adicionada ao caminho
        path.addDistance(edge.distance);

        // caso a distância já percorrida ultrapasse o total da atual rota mínima,
        // então esta rota não é a mínima e será pulada
        if (path.getTotalDistance() >= this.minRoute.getTotalDistance()) {
          skipRoute = true;
          break;
        }
      }

      // caso esta rota não tenha sido pulada, então ela é a nova rota mínima
      if (!skipRoute) this.minRoute = path;
    }
  }
}
