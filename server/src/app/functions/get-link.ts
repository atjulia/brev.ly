import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { InvalidInput } from "./errors/invalid-input";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { count, desc } from "drizzle-orm";

const getLinksInput = z.object({
  page: z.number().min(1, "Página deve ser maior que 0").default(1),
  limit: z
    .number()
    .min(1, "Limite deve ser maior que 0")
    .max(100, "Limite máximo é 100")
    .default(10),
});

type GetLinksInput = z.input<typeof getLinksInput>;

interface Link {
  id: string;
  url: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  accessCount?: number;
}

interface GetLinksResponse {
  links: Link[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getLinks(
  input: GetLinksInput
): Promise<Either<InvalidInput, GetLinksResponse>> {
  const parseResult = getLinksInput.safeParse(input);

  if (!parseResult.success) {
    return makeLeft(new InvalidInput());
  }

  const { page, limit } = parseResult.data;
  const offset = (page - 1) * limit;

  try {
    const [totalResult] = await db
      .select({ count: count() })
      .from(schema.links);

    const total = totalResult.count;
    const totalPages = Math.ceil(total / limit);

    const links = await db
      .select({
        id: schema.links.id,
        url: schema.links.url,
        shortCode: schema.links.shortCode,
        createdAt: schema.links.createdAt,
        accessCount: schema.links.accessCount,
      })
      .from(schema.links)
      .orderBy(desc(schema.links.createdAt))
      .limit(limit)
      .offset(offset);

    const formattedLinks: Link[] = links.map((link) => ({
      id: link.id,
      url: link.url,
      shortCode: link.shortCode,
      shortUrl: `${process.env.APP_URL || "http://localhost:5173"}/${
        link.shortCode
      }`,
      createdAt: link.createdAt.toISOString(),
      accessCount: link.accessCount,
    }));

    return makeRight({
      links: formattedLinks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return makeLeft(new InvalidInput());
  }
}
