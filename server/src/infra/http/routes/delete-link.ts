import { deleteLink } from "@/app/functions/delete-link";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a shortened link",
        params: z.object({
          id: z.string().uuid("ID deve ser um UUID válido"),
        }),
        response: {
          200: z.object({
            message: z.string(),
            deletedId: z.string(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await deleteLink({
        id: request.params.id,
      });

      if (isRight(result)) {
        return reply.status(200).send({
          message: "Link deletado com sucesso",
          deletedId: request.params.id,
        });
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  );
};
