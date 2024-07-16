import dotnev from "dotenv";
import { App } from "./app";

(async () => {
  dotnev.config();

  const port = process.env.PORT || 8080;

  const mongoConnectionString = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST1},${process.env.MONGO_HOST2}?replicaSet=${process.env.MONGO_REPLICA_SET}&readPreference=${process.env.MONGO_READ_PREFERENCE}`;
  const mongoDbName = process.env.MONGO_DB;
  if (!mongoConnectionString || !mongoDbName)
    throw new Error("MongoDB connection string not configured.");

  const app = await new App(mongoConnectionString, mongoDbName).run();

  app.express.listen(port, () => console.log(`Api stated on port ${port}!`));
})();
