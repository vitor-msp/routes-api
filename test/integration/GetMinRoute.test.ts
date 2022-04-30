import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { App } from "../../src/app";
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
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(pathRes);
  });
});

afterAll(() => {
  mongoose.disconnect();
  app = null;
});

// should return min route
// should return 0 for town1 equals town2
// should return -1 for not existent routes

// should return not found for graph not save
// should return bad request for invalid parameters
// should return bad request for source not present in graph
// should return bad request for target not present in graph
