import { IGraphsRepository } from "../../../infra/repositories/IGraphsRepository";
import { IGraph } from "../../../interfaces/IGraph";

export class GetGraphUseCase {
  constructor(private readonly graphsRepository: IGraphsRepository) {}

  async execute(id: number): Promise<IGraph | null> {

    return await this.graphsRepository.findById(id);
  }
}
