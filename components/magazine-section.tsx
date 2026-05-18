import { getArticles } from "@/lib/db";
import { MagazineSectionClient } from "./magazine-section-client";

export async function MagazineSection() {
  const articles = (await getArticles()).slice(0, 4);
  return <MagazineSectionClient articles={articles} />;
}
