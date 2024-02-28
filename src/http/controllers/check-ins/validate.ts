import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInQuerySchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInQuerySchema.parse(req.query);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  });

  return res.status(204).send({ checkIn });
}
