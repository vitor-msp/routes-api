import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express'

import swaggerDocs from "./swagger.json"
import routes from "./routes";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.documentation();
    this.database();
    this.routes();
  }

  middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  documentation() {
    this.express.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  database(): void {
    mongoose.connect(
      "mongodb://localhost:27017/desafio-dev-jr-pl",
      {
        // useNewUrlParser: true
      },
      () => {
        console.log("Connected to MongoDB!");
      }
    );
  }

  routes(): void {
    this.express.use(routes);
  }
}
