export const dynamic = "force-dynamic";

import { getArticles } from "@/lib/strapi";
import { articleCategories } from "@/lib/data";
import { MagazineClient } from "./magazine-client";

export default async function MagazinePage() {
  const articles = await getArticles();
  return <MagazineClient articles={articles} articleCategories={articleCategories} />;
}
