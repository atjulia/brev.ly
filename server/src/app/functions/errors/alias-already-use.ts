export class AliasAlreadyInUse extends Error {
  constructor() {
    super("Alias already in use.");
  }
}
