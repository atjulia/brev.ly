import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { LinkNotFound } from "./errors/link-not-found";

const redirectLinkInput = z.object({
  shortCode: z.string().min(1),
});

type RedirectLinkInput = z.input<typeof redirectLinkInput>;

export async function redirectLink(
  input: RedirectLinkInput
): Promise<Either<LinkNotFound, { originalUrl: string }>> {
  const { shortCode } = redirectLinkInput.parse(input);

  const link = await db.query.links.findFirst({
    where: eq(schema.links.shortCode, shortCode),
  });

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  await db
    .update(schema.links)
    .set({
      accessCount: sql`${schema.links.accessCount} + 1`,
    })
    .where(eq(schema.links.id, link.id));

  return makeRight({ originalUrl: link.url });
}
