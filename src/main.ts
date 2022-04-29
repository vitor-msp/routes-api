import { PostGraphController } from "./app/controllers/PostGraphController";
import { PostGraphUseCase } from "./app/useCases/postGraph/PostGraphUseCase";
import { GraphsRepositoryMongo } from "./infra/repositories/implementations/GraphsRepositoryMongo";

const graphsRepositoryMongo = new GraphsRepositoryMongo();
const postGraphUseCase = new PostGraphUseCase(graphsRepositoryMongo);
const postGraphController = new PostGraphController(postGraphUseCase);

export { postGraphController };
