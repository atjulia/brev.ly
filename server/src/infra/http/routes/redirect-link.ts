import { redirectLink } from "@/app/functions/redirect-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const redirectLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/resolve/:shortCode",
    {
      schema: {
        summary: "Redirect to original URL",
        params: z.object({
          shortCode: z.string().min(1),
        }),
        response: {
          200: z.object({
            url: z.string().url(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await redirectLink({
        shortCode: request.params.shortCode,
      });

      if (isRight(result)) {
        return reply
          .type("application/json")
          .status(200)
          .send({ url: result.right.originalUrl });
      }

      const error = unwrapEither(result);

      if (error.constructor.name === "LinkNotFound") {
        return reply.status(404).send({ message: error.message });
      }
    }
  );
};
