import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import path from "path";

import swaggerDocs from "./swagger.json";
import routes from "./routes";

export class App {
  public express: express.Application;

  constructor(
    private readonly mongoConnectionString: string,
    private readonly mongoDbName: string
  ) {
    this.express = express();
  }

  async run(): Promise<App> {
    this.middlewares();
    this.documentation();
    this.jsonBeautify();
    await this.database();
    this.routes();
    return this;
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
      await mongoose.connect(this.mongoConnectionString, {
        dbName: this.mongoDbName,
      });
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.log("Error to connect to MongoDB!");
    }
  }

  routes(): void {
    this.express.use(routes);
  }
}
