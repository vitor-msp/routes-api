import express from "express";
import request from "supertest";
import { App } from "../../src/app";
import { GraphModel } from "../../src/infra/database/schemas/GraphSchema";

let app: express.Application;
beforeAll(async () => {
  app = new App().express;
  await GraphModel.deleteMany();
});

describe("Post graph use case", () => {
  it("should post graph and return status 201", async () => {
    const reqBody = {
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

    const res: request.Response = await request(app)
      .post("/graph")
      .send(reqBody);

    const resBody = {
      id: 1,
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
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(resBody);
  });

  //   it("should return bad request", async () => {
  //   });
});
