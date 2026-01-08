export class AliasAlreadyInUse extends Error {
  constructor() {
    super("Encurtador já está em uso.");
  }
}
