import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { exportLinksToCsv } from "@/infra/storage/export-link-csv";

export async function exportLinksCsv() {
  const links = await db
    .select({
      url: schema.links.url,
      shortCode: schema.links.shortCode,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy(schema.links.createdAt);

  const file = await exportLinksToCsv(links);

  return {
    url: file.url,
  };
}
