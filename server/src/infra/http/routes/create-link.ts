import { createLink } from "@/app/functions/create-link";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { url } from "node:inspector";
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
          409: z
            .object({ message: z.string() })
            .describe("Alias already in use"),
        },
      },
    },
    async (request, reply) => {
      await createLink({
        url: request.body.url,
        shortCode: request.body.alias,
      });
      return reply.status(201).send({ urlId: "example-id" });
    }
  );
};
