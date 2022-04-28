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
  it("should return all routes with max stops", () => {
    const getRoutes: GetRoutes = new GetRoutes(graph, "A", "C", 3);

    const routes: Route[]| null = getRoutes.execute();

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

  it("should return all routes without max stops", () => {
    const getRoutes: GetRoutes = new GetRoutes(graph, "A", "C");

    const routes: Route[] | null = getRoutes.execute();

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
          route: "ADEBC",
          stops: 4,
        },
        {
          route: "AEBC",
          stops: 3,
        },
      ],
    };
    expect(routes).toEqual(res.routes);
  });

  it("should not existents routes", () => {
    const getRoutes: GetRoutes = new GetRoutes(graph, "A", "C", 1);

    const routes: Route[] | null = getRoutes.execute();

    const res = {
      routes: [],
    };
    expect(routes).toEqual(res.routes);
  });

  it("should return null for source equals target", () => {
    const getRoutes: GetRoutes = new GetRoutes(graph, "A", "A");

    const routes: Route[] | null = getRoutes.execute();

    const res = null;
    expect(routes).toEqual(res);
  });

  it("should throws error because source not present in graph", () => {
    const res = "Source not present in graph!";
    expect(() => {
      new GetRoutes(graph, "Z", "A");
    }).toThrow(res);
  });

  it("should throws error because target not present in graph", () => {
    const res = "Target not present in graph!";
    expect(() => {
      new GetRoutes(graph, "A", "Z");
    }).toThrow(res);
  });
});
