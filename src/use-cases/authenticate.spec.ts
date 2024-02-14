import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, it, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case: ", () => {
	it("Should be able to authenticate", async () => {

		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: "John Doe",
			email: "john.doe@gmail.com",
			password_hash: await hash("123456", 6)
		});

		const { user } = await sut.execute({
			email: "john.doe@gmail.com",
			password: "123456"
		});


		expect(user.id).toEqual(expect.any(String));
	});
    
	it("Should not be able to authenticate with wrong email", async () => {

		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		expect(() => sut.execute({
			email: "john.doe@gmail.com",
			password: "123456"
		})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("Should be able to authenticate with the wrong password", async () => {

		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: "John Doe",
			email: "john.doe@gmail.com",
			password_hash: await hash("123456", 6)
		});

		expect(() => sut.execute({
			email: "john.doe@gmail.com",
			password: "wrong-password"
		})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
    
});