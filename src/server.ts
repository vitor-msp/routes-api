import dotnev from "dotenv";
import { App } from "./app";

(async () => {
  dotnev.config();

  const port = process.env.PORT || 8080;

  const mongoConnectionString = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo1:27017,mongo2:27017?replicaSet=rs0&readPreference=${process.env.MONGO_READ_PREFERENCE}`;
  const mongoDbName = process.env.MONGO_DB;
  if (!mongoConnectionString || !mongoDbName)
    throw new Error("MongoDB connection string not configured.");

  const app = await new App(mongoConnectionString, mongoDbName).run();

  app.express.listen(port, () => console.log(`Api stated on port ${port}!`));
})();
