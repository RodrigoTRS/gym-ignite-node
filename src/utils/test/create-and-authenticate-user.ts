import request from "supertest";
import { app } from "@/app";

export async function createAndAuthenticateUser() {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/session").send({
    email: "john.doe@example.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
