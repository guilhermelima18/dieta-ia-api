import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";

const app = fastify();
dotenv.config();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
    app
      .listen({
        port: 3333,
        host: "0.0.0.0",
      })
      .then(() => console.log("Servidor rodando na porta: ", 3333));
  } catch (error) {
    console.log("Ocorreu um erro no servidor: ", error);
  }
};

start();
