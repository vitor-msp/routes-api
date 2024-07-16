import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { App } from "../../src/app";
import { GraphModel } from "../../src/infra/database/schemas/GraphSchema";
import dotenv from "dotenv";
dotenv.config();

describe("Post graph use case", () => {
  let app: express.Application | null;

  beforeAll(async () => {
    const mongoConnectionString = `mongodb://${process.env.MONGO_TEST_HOST}`;
    app = (
      await new App(
        mongoConnectionString,
        process.env.MONGO_TEST_DB || "routes"
      ).run()
    ).express;
    await GraphModel.deleteMany();
  });

  it("should post graph and return created", async () => {
    const reqBody = {
      edges: [
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

    const res: request.Response = await request(app)
      .post("/graph")
      .send(reqBody);

    const resBody = {
      id: 1,
      edges: [
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
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(resBody);
  });

  it("should return bad request because a parameter is missing", async () => {
    const reqBody = {
      edges: [
        {
          source: "A",
          target: "B",
        },
      ],
    };

    const res: request.Response = await request(app)
      .post("/graph")
      .send(reqBody);

    expect(res.statusCode).toEqual(400);
  });

  it("should return bad request because exists invalid edge (source = target)", async () => {
    const reqBody = {
      edges: [
        {
          source: "A",
          target: "A",
          distance: 5,
        },
      ],
    };

    const res: request.Response = await request(app)
      .post("/graph")
      .send(reqBody);

    const errorRes = "Source cannot be equals target!";
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(errorRes);
  });

  it("should return bad request because exists duplicated edge in graph", async () => {
    const reqBody = {
      edges: [
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

    const res: request.Response = await request(app)
      .post("/graph")
      .send(reqBody);

    const errorRes = "Duplicated edges!";
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(errorRes);
  });

  afterAll(async () => {
    await GraphModel.deleteMany();
    await mongoose.disconnect();
    app = null;
  });
});
