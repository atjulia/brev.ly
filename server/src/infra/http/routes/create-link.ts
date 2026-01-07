import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/infra/shared /either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a new shortened link",
        body: z.object({
          url: z.string().url(),
          alias: z.string(),
        }),
        response: {
          201: z.object({ urlId: z.string() }),
          400: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await createLink({
        url: request.body.url,
        shortCode: request.body.alias,
      });

      if (isRight(result)) {
        return reply.status(201).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "InvalidInput":
          return reply.status(400).send({ message: error.message });
        case "AliasAlreadyInUse":
          return reply.status(409).send({ message: error.message });
      }
    }
  );
};
