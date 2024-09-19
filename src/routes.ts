import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/create-nutrition-controller";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.post("/create", (request: FastifyRequest, reply: FastifyReply) => {
    const createNutritionController = new CreateNutritionController();
    return createNutritionController.handle(request, reply);
  });
}
