import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { App } from "../../src/app";
import { Edge } from "../../src/domain/Edge";
import { Graph } from "../../src/domain/Graph";
import { GraphModel } from "../../src/infra/database/schemas/GraphSchema";

let app: express.Application | null;
beforeAll(async () => {
  app = new App().express;
  await GraphModel.deleteMany();
});

const graphReq = {
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

describe("Get min route use case", () => {
  it("should return min route", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/distance/1/from/A/to/C`)
      .send();

    const pathRes = {
      distance: 8,
      path: ["A", "B", "C"],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(pathRes);
  });

  it("should return 0 for town1 equals town2", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/distance/1/from/A/to/A`)
      .send();

    const pathRes = {
      distance: 0,
      path: [],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(pathRes);
  });

  it("should return -1 for not existent routes", async () => {
    await GraphModel.deleteMany();
    const graph = new Graph([new Edge("A", "B", 1), new Edge("B", "C", 1)]);
    await request(app).post("/graph").send(graph);

    const res: request.Response = await request(app)
      .post(`/distance/1/from/C/to/A`)
      .send();

    const pathRes = {
      distance: -1,
      path: [],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(pathRes);
  });

  it("should return not found for graph not save", async () => {
    const res: request.Response = await request(app)
      .post(`/distance/100/from/A/to/C`)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return bad request for invalid parameters", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/distance/A/from/A/to/A`)
      .send();

    expect(res.statusCode).toEqual(400);
  });

  it("should return bad request for source not present in graph", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/distance/1/from/Z/to/A`)
      .send();

    const errorRes = {
      message: `Source not present in graph!`,
    };
    expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual(errorRes);
  });

  it("should return bad request for target not present in graph", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/distance/1/from/A/to/Z`)
      .send();

    const errorRes = {
      message: `Target not present in graph!`,
    };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(errorRes);
  });
});

afterAll(() => {
  mongoose.disconnect();
  app = null;
});
