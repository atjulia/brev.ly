import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { InvalidInput } from "./errors/invalid-input";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";

const createLinkInput = z.object({
  url: z.string(),
  shortCode: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(
  input: CreateLinkInput
): Promise<Either<InvalidInput, { url: string }>> {
  const { url, shortCode } = createLinkInput.parse(input);

  if (!url || !shortCode) {
    return makeLeft(new InvalidInput());
  }

  await db.insert(schema.links).values({
    url,
    shortCode,
  });

  return makeRight({ url });
}
