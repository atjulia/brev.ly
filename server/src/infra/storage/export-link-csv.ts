import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "@/env";
import { r2 } from "./client";

interface Link {
  url: string;
  shortCode: string;
  accessCount: number;
  createdAt: Date;
}

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function exportLinksToCsv(links: Iterable<Link>) {
  const fileName = `links-export-${randomUUID()}.csv`;
  const key = `downloads/${fileName}`;

  const stream = new Readable({
    read() {},
  });

  process.nextTick(() => {
    stream.push("url_original,url_encurtada,access_count,created_at\n");

    for (const link of links) {
      stream.push(
        [
          escapeCsv(link.url),
          escapeCsv(`${env.APP_URL}/${link.shortCode}`),
          link.accessCount,
          link.createdAt
            .toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(",", ""),
        ].join(",") + "\n"
      );
    }

    stream.push(null);
  });

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
