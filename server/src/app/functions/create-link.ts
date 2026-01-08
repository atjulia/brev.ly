import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { InvalidInput } from "./errors/invalid-input";
import { AliasAlreadyInUse } from "./errors/alias-already-use";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { eq } from "drizzle-orm";

const createLinkInput = z.object({
  url: z.string().url("URL deve ser válida"),
  shortCode: z.string().min(1, "ShortCode é obrigatório"),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

interface CreateLinkResponse {
  id: string;
  originalUrl: string;
  shortUrl: string;
  alias: string;
  createdAt: string;
}

export async function createLink(
  input: CreateLinkInput
): Promise<Either<InvalidInput | AliasAlreadyInUse, CreateLinkResponse>> {
  const parseResult = createLinkInput.safeParse(input);

  if (!parseResult.success) {
    return makeLeft(new InvalidInput());
  }

  const { url, shortCode } = parseResult.data;

  const existingLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortCode, shortCode))
    .limit(1);

  if (existingLink.length > 0) {
    return makeLeft(new AliasAlreadyInUse());
  }

  const [createdLink] = await db
    .insert(schema.links)
    .values({
      url,
      shortCode,
    })
    .returning();

  return makeRight({
    id: createdLink.id,
    originalUrl: createdLink.url,
    shortUrl: `${process.env.BASE_URL}/${createdLink.shortCode}`,
    alias: createdLink.shortCode,
    createdAt: createdLink.createdAt.toISOString(),
  });
}
