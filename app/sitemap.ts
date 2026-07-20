import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCategorySlugs } from "@/lib/categories";

const siteUrl = "https://laotechguru.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const categoryEntries: MetadataRoute.Sitemap = getAllCategorySlugs().map(
    (slug) => ({
      url: `${siteUrl}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}