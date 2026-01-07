import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { exportLinksCsv } from "@/app/functions/export-links-csv";
import z from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/export",
    {
      schema: {
        summary: "Export links to CSV",
        response: {
          200: z.object({
            url: z.string().url(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportLinksCsv();

      return reply.status(200).send(result);
    }
  );
};
