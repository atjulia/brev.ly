import { getLinks } from "@/app/functions/get-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get all shortened links",
        querystring: z.object({
          page: z.string().transform(Number).default(1).optional(),
          limit: z.string().transform(Number).default(10).optional(),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                url: z.string(),
                shortCode: z.string(),
                shortUrl: z.string(),
                createdAt: z.string(),
                clickCount: z.number().optional(),
              })
            ),
            pagination: z.object({
              page: z.number(),
              limit: z.number(),
              total: z.number(),
              totalPages: z.number(),
            }),
          }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { page = 1, limit = 10 } = request.query;

      const result = await getLinks({
        page,
        limit,
      });

      if (isRight(result)) {
        return reply.status(200).send(result.right);
      }

      const error = unwrapEither(result);

      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  );
};
