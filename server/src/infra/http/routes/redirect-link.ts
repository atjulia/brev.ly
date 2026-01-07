import { redirectLink } from "@/app/functions/redirect-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const redirectLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/:shortCode",
    {
      schema: {
        summary: "Redirect to original URL",
        params: z.object({
          shortCode: z.string().min(1),
        }),
        response: {
          301: z.null(),
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
        return reply.redirect(result.right.originalUrl, 301);
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkNotFound":
          return reply.status(404).send({ message: error.message });
      }
    }
  );
};
