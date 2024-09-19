import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/create-nutrition-service";
import { z } from "zod";

class CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createNutritionSchema = z.object({
      name: z.string({ required_error: "Nome é um campo obrigatório" }),
      age: z.string({ required_error: "Idade é um campo obrigatório" }),
      weight: z.string({ required_error: "Peso é um campo obrigatório" }),
      height: z.string({ required_error: "Altura é um campo obrigatório" }),
      gender: z.string({ required_error: "Gênero é um campo obrigatório" }),
      objective: z.string({
        required_error: "Objetivo é um campo obrigatório",
      }),
      level: z.string({ required_error: "Nível é um campo obrigatório" }),
    });

    const data = createNutritionSchema.parse(request.body);

    const createNutritionService = new CreateNutritionService();

    const suggestedDiet = await createNutritionService.execute(data);

    return reply.send(suggestedDiet);
  }
}

export { CreateNutritionController };
