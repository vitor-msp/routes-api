import { Edge } from "../../src/domain/Edge";

describe("Testing Edge", () => {
  it("should throws error because source equals target", () => {
    const edge = {
      source: "A",
      target: "A",
      distance: 5,
    };

    const { source, target, distance } = edge;
    const res = "Source cannot be equals target!";
    expect(() => {
      new Edge(source, target, distance);
    }).toThrow(res);
  });
});
