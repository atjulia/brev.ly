import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { InvalidInput } from "./errors/invalid-input";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";
import { LinkNotFound } from "./errors/link-not-found";

const deleteLinkInput = z.object({
  id: z.string().uuid("ID deve ser um UUID válido"),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<InvalidInput | LinkNotFound, { deletedId: string }>> {
  const parseResult = deleteLinkInput.safeParse(input);

  if (!parseResult.success) {
    return makeLeft(new InvalidInput());
  }

  const { id } = parseResult.data;

  const existingLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.id, id))
    .limit(1);

  if (existingLink.length === 0) {
    return makeLeft(new LinkNotFound());
  }

  await db.delete(schema.links).where(eq(schema.links.id, id));

  return makeRight({ deletedId: id });
}
