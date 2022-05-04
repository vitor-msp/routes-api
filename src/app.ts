import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import path from "path";

import swaggerDocs from "./swagger.json";
import routes from "./routes";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.documentation();
    this.jsonBeautify();
    this.database();
    this.routes();
  }

  middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  documentation() {
    this.express.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs)
    );
  }

  jsonBeautify() {
    this.express.get("/json-beautify", (_req, res) => {
      res.sendFile(path.join(__dirname, "/json-beautify.html"));
    });
  }

  async database(): Promise<void> {
    try {
      await mongoose.connect("mongodb://localhost:27017/desafio-dev-jr-pl");
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.log("Error to connect to MongoDB!");
    }
  }

  routes(): void {
    this.express.use(routes);
  }
}
