import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
      try {
            const assetsDir = path.join(process.cwd(), "public", "assets");
            if (!fs.existsSync(assetsDir)) {
                  return NextResponse.json([]);
            }

            const files = fs.readdirSync(assetsDir);
            const mediaFiles = files.map((file, index) => {
                  const ext = path.extname(file).toLowerCase();
                  let type = "document";
                  if ([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)) {
                        type = "image";
                  } else if ([".mp4", ".webm", ".ogg"].includes(ext)) {
                        type = "video";
                  }

                  return {
                        id: index + 1,
                        name: file,
                        url: `/assets/${file}`,
                        type: type,
                  };
            });

            return NextResponse.json(mediaFiles);
      } catch (error) {
            console.error("Media fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
      }
}
