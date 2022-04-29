import { GraphModel } from "../infra/database/schemas/GraphSchema";

export abstract class NextId {
  // private static id: number = 1;

  // static async init(): Promise<void> {
  //   const nextId = (await GraphModel.count()) + 1;
  //   NextId.setId(nextId);
  //   console.log(`Next id (${NextId.getId()}) getted!`);
  // }

  // static setId(id: number): void {
  //   NextId.id = id;
  // }

  static async get(): Promise<number> {
    return (await GraphModel.count()) + 1;
  }

  // static incrementId(): void {
  //   NextId.setId(NextId.getId() + 1);
  // }
}
