import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(req: FastifyRequest, res: FastifyReply) {
  const fetchUserCheckInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchUserCheckInHistoryQuerySchema.parse(req.query);

  const userCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await userCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  });

  return res.status(200).send({ checkIns });
}
