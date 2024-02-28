import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nerby gyms (e2e): ", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch a nerby a gym", async () => {
    const { token } = await createAndAuthenticateUser();

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-01",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "gym-02",
        description: null,
        phone: null,
        latitude: -39.2092052,
        longitude: -49.6401091,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
});
