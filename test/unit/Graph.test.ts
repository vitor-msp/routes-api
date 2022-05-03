import { Edge } from "../../src/domain/Edge";
import { Graph } from "../../src/domain/Graph";

describe("Testing Graph", () => {
  it("should throws error because edge is duplicated", () => {
    const graph = {
      data: [
        {
          source: "A",
          target: "B",
          distance: 5,
        },
        {
          source: "A",
          target: "B",
          distance: 5,
        },
      ],
    };

    const edges: Edge[] = [];
    for (let item of graph.data) {
      const { source, target, distance } = item;
      edges.push(new Edge(source, target, distance));
    }
    const res = "Duplicated edges!";
    expect(() => {
      new Graph(edges);
    }).toThrow(res);
  });
});
