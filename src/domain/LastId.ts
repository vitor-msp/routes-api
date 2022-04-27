export abstract class LastId {
  private static id: number = 1;

  static setId(id: number): void {
    LastId.id = id;
  }

  static getId(): number {
    return LastId.id;
  }

  static incrementId(): void {
    LastId.setId(LastId.getId() + 1);
  }
}
