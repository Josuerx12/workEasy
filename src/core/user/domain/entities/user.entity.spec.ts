import { UserEntity } from "./user.entity";

describe("Teste unitario da entidade de usuário", () => {
  test("should create a new user entity", () => {
    const input = {
      email: "johndoe@email.com",
      name: "john doe",
      password: "teste1234",
    };

    const user = new UserEntity(input);

    expect(user).toBeDefined();
    expect(user.email.value).toStrictEqual(input.email);
    expect(user.name).toStrictEqual(input.name);
    expect(user.password).toBeDefined();
  });
});