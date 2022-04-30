import { GetGraphController } from "./app/controllers/GetGraphController";
import { GetMinRouteController } from "./app/controllers/GetMinRouteController";
import { GetRoutesController } from "./app/controllers/GetRoutesController";
import { PostGraphController } from "./app/controllers/PostGraphController";
import { GetGraphUseCase } from "./app/useCases/getGraph/GetGraphUseCase";
import { GetMinRouteUseCase } from "./app/useCases/getMinRoute/GetMinRouteUseCase";
import { GetRoutesUseCase } from "./app/useCases/getRoutes/GetRoutesUseCase";
import { PostGraphUseCase } from "./app/useCases/postGraph/PostGraphUseCase";
import { GraphsRepositoryMongo } from "./infra/repositories/implementations/GraphsRepositoryMongo";

const graphsRepositoryMongo = new GraphsRepositoryMongo();

const postGraphUseCase = new PostGraphUseCase(graphsRepositoryMongo);
const postGraphController = new PostGraphController(postGraphUseCase);

const getGraphUseCase = new GetGraphUseCase(graphsRepositoryMongo);
const getGraphController = new GetGraphController(getGraphUseCase);

const getRoutesUseCase = new GetRoutesUseCase(graphsRepositoryMongo);
const getRoutesController = new GetRoutesController(getRoutesUseCase);

const getMinRouteUseCase = new GetMinRouteUseCase(graphsRepositoryMongo);
const getMinRouteController = new GetMinRouteController(getMinRouteUseCase);

export {
  postGraphController,
  getGraphController,
  getRoutesController,
  getMinRouteController,
};
