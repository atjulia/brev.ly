import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "@/env";
import { r2 } from "./client";

interface Link {
  originalUrl: string;
  shortCode: string;
  accessCount: number;
  createdAt: Date;
}

export async function exportLinksToCsv(links: Link[]) {
  const fileName = `links-export-${randomUUID()}.csv`;
  const key = `downloads/${fileName}`;

  const header = [
    "original_url",
    "short_url",
    "access_count",
    "created_at",
  ].join(",");

  const rows = links.map((link) =>
    [
      `"${link.originalUrl}"`,
      `"${env.APP_URL}/${link.shortCode}"`,
      link.accessCount,
      link.createdAt.toISOString(),
    ].join(",")
  );

  const csvContent = [header, ...rows].join("\n");

  const stream = Readable.from(csvContent);

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: key,
      Body: stream,
      ContentType: "text/csv",
    },
  });

  await upload.done();

  return {
    key,
    url: new URL(key, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
