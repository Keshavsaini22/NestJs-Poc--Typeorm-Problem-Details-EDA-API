export class RegisterUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly address: string,
    public readonly role: string,
  ) {}
}
