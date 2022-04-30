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

describe("Get graph use case", () => {
  it("should return saved graph", async () => {
    const data = [
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
    ];
    const graphReq = {
      data: data,
    };
    const graphRes = {
      id: 1,
      data: data,
    };
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .get(`/graph/${graphRes.id}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(graphRes);
  });

  it("should return not found", async () => {
    const idReq = 100;

    const res: request.Response = await request(app)
      .get(`/graph/${idReq}`)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return bad request because id is string", async () => {
    const res: request.Response = await request(app)
      .get(`/graph/id`)
      .send();

    expect(res.statusCode).toEqual(400);
  });
});

afterAll(async () => {
  await GraphModel.deleteMany();
  mongoose.disconnect();
  app = null;
});
