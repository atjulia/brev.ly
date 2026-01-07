import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";

const createLinkInput = z.object({
  url: z.string(),
  shortCode: z.string(),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

export async function createLink(input: CreateLinkInput) {
  const { url, shortCode } = createLinkInput.parse(input);

  if (!url || !shortCode) {
    throw new Error("Invalid input");
  }

  await db.insert(schema.links).values({
    url,
    shortCode,
  });
}
