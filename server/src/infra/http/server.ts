import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { createLinkRoute } from "./routes/create-link";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev.ly API",
      description: "API documentation for Brev.ly URL shortening service",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
server.register(createLinkRoute);

server
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server running");
  });
