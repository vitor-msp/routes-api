import { Edge } from "../../src/domain/Edge";
import { GetRoutes } from "../../src/domain/GetRoutes";
import { Graph } from "../../src/domain/Graph";
import { Route } from "../../src/domain/Route";

const json = {
  data: [
    {
      source: "A",
      target: "B",
      distance: 5,
    },
    {
      source: "B",
      target: "C",
      distance: 4,
    },
    {
      source: "C",
      target: "D",
      distance: 8,
    },
    {
      source: "D",
      target: "C",
      distance: 8,
    },
    {
      source: "D",
      target: "E",
      distance: 6,
    },
    {
      source: "A",
      target: "D",
      distance: 5,
    },
    {
      source: "C",
      target: "E",
      distance: 2,
    },
    {
      source: "E",
      target: "B",
      distance: 3,
    },
    {
      source: "A",
      target: "E",
      distance: 7,
    },
  ],
};

let graph: Graph;

beforeAll(() => {
  const edges: Edge[] = [];

  json.data.forEach((edge) => {
    const { source, target, distance } = edge;
    edges.push(new Edge(source, target, distance));
  });

  graph = new Graph(edges);
});

describe("Testing Get Routes", () => {

  it("should get all routes from 'A' to 'C' with 3 stops", () => {
    const getRoutes: GetRoutes = new GetRoutes(graph, "A", "C", 3);

    const routes: Route[] = getRoutes.execute();

    console.log(routes);
    const res = {
      routes: [
        {
          route: "ABC",
          stops: 2,
        },
        {
          route: "ADC",
          stops: 2,
        },
        {
          route: "AEBC",
          stops: 3,
        },
      ],
    };
    expect(routes).toEqual(res.routes);
  });
});
