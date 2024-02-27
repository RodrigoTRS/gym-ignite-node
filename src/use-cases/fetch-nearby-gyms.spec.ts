import { GymsRepository } from "@/repositories/gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: GymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

    await gymsRepository.create({
      title: "Javascript gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Typescript gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });
  });

  it("should be able to fetch for nearby gyms", async () => {
    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript gym" }),
      expect.objectContaining({ title: "Typescript gym" }),
    ]);
  });

  it("should be able to return empty if there are none nearby gyms", async () => {
    const { gyms } = await sut.execute({
      userLatitude: -35.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(0);
  });
});
