import { Edge } from "../../src/domain/Edge";
import { GetMinRoute } from "../../src/domain/GetMinRoute";
import { GetRoutes } from "../../src/domain/GetRoutes";
import { Graph } from "../../src/domain/Graph";
import { Path } from "../../src/domain/Path";
import { Route } from "../../src/domain/Route";

const json = {
  data: [
    {
      source: "A",
      target: "B",
      distance: 6,
    },
    {
      source: "A",
      target: "E",
      distance: 4,
    },
    {
      source: "B",
      target: "A",
      distance: 6,
    },
    {
      source: "B",
      target: "C",
      distance: 2,
    },
    {
      source: "B",
      target: "D",
      distance: 4,
    },
    {
      source: "C",
      target: "B",
      distance: 3,
    },
    {
      source: "C",
      target: "D",
      distance: 1,
    },
    {
      source: "C",
      target: "E",
      distance: 7,
    },
    {
      source: "D",
      target: "B",
      distance: 8,
    },
    {
      source: "E",
      target: "B",
      distance: 5,
    },
    {
      source: "E",
      target: "D",
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

describe("Testing Get Min Route", () => {
  // it("should return min route", () => {
  //   const getMinRoute = new GetMinRoute(graph, "A", "C");

  //   const path: Path | number = getMinRoute.execute();

  //   const res = {
  //     distance: 8,
  //     path: ["A", "B", "C"],
  //   };
  //   expect(path).toEqual(res);
  // });

  // it("should return 0 for source equals target", () => {
  //   const getMinRoute = new GetMinRoute(graph, "A", "A");

  //   const path: Path | number = getMinRoute.execute();

  //   const res = 0;
  //   expect(path).toEqual(res);
  // });

  it("should return -1 for inexistent routes", () => {
    const getMinRoute = new GetMinRoute(graph, "A", "F");

    const path: Path | number = getMinRoute.execute();

    const res = -1;
    expect(path).toEqual(res);
  });
});
