export class Email {
  public value: string;

  constructor(value: string) {
    this.value = value;

    this.validate();
  }

  private validate(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.value.match(emailRegex)) {
      throw new Error("Email informado não é válido!");
    }
  }
}
