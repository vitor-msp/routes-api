import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { App } from "../../src/app";
import { GraphModel } from "../../src/infra/database/schemas/GraphSchema";
import dotenv from "dotenv";
dotenv.config();

describe("Get routes use case", () => {
  let app: express.Application | null;

  beforeAll(async () => {
    app = (
      await new App(
        process.env.MONGO_TEST_CONNECTION_STRING || "",
        process.env.MONGO_TEST_DB || "routes"
      ).run()
    ).express;
    await GraphModel.deleteMany();
  });

  const graphReq = {
    edges: [
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

  it("should return routes with max stops", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/C?maxStops=3`)
      .send();

    const routesRes = {
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
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  it("should return routes without max stops", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/C`)
      .send();

    const routesRes = {
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
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  it("should return routes with invalid max stops", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/C?maxStops=A`)
      .send();

    const routesRes = {
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
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  it("should return empty routes for town1 equals town2", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/A`)
      .send();

    const routesRes = {
      routes: [],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  it("should return empty routes", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/C?maxStops=1`)
      .send();

    const routesRes = {
      routes: [],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  it("should return not found for graph not save", async () => {
    const res: request.Response = await request(app)
      .post(`/routes/100/from/A/to/C?maxStops=1`)
      .send();

    expect(res.statusCode).toEqual(404);
  });

  it("should return bad request for invalid parameters", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/A/from/A/to/C?maxStops=1`)
      .send();

    expect(res.statusCode).toEqual(400);
  });

  it("should return bad request for source not present in graph", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/Z/to/C?maxStops=1`)
      .send();

    const errorRes = {
      message: "Source not present in graph!",
    };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(errorRes);
  });

  it("should return bad request for target not present in graph", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/Z?maxStops=1`)
      .send();

    const errorRes = {
      message: "Target not present in graph!",
    };
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(errorRes);
  });

  it("should return empty with max stops equals zero", async () => {
    await request(app).post("/graph").send(graphReq);

    const res: request.Response = await request(app)
      .post(`/routes/1/from/A/to/C?maxStops=0`)
      .send();

    const routesRes = {
      routes: [],
    };
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(routesRes);
  });

  afterAll(async () => {
    await GraphModel.deleteMany();
    await mongoose.disconnect();
    app = null;
  });
});
