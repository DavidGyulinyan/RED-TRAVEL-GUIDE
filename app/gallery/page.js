import { readdir } from "node:fs/promises";
import path from "node:path";
import GalleryPageClient from "./gallery-page-client";

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);

async function getGalleryVideos() {
  const videosDir = path.join(process.cwd(), "public", "videos");

  try {
    const files = await readdir(videosDir);

    return files
      .filter((file) => VIDEO_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
      .map((file) => ({
        file,
        src: `/videos/${encodeURIComponent(file)}`,
      }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const videos = await getGalleryVideos();

  return <GalleryPageClient videos={videos} />;
}
