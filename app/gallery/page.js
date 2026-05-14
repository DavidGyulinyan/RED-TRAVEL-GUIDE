import { readdir } from "node:fs/promises";
import path from "node:path";
import GalleryPageClient from "./gallery-page-client";

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm", ".m4v"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

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

async function getEmotionPhotos() {
  const emotionsDir = path.join(process.cwd(), "public", "emotions");

  try {
    const files = await readdir(emotionsDir);

    return files
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
      .map((file) => ({
        file,
        src: `/emotions/${encodeURIComponent(file)}`,
      }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const videos = await getGalleryVideos();
  const emotionPhotos = await getEmotionPhotos();

  return <GalleryPageClient videos={videos} emotionPhotos={emotionPhotos} />;
}
