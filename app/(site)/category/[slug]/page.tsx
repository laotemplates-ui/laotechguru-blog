import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import { getCategoryLabel, getAllCategorySlugs } from "@/lib/categories";
import { type Category } from "@/lib/category-list";
import PostCard from "@/components/PostCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = getCategoryLabel(slug);
  if (!label) return {};

  return {
    title: `ບົດຄວາມໝວດ: ${label}`,
    description: `ລວມບົດຄວາມທັງໝົດໃນໝວດ ${label} ຈາກ LaoTechGuru`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = getCategoryLabel(slug);

  if (!label) {
    notFound();
  }

  // ໃຊ້ getPostsByCategory ໂດຍກົງ (filter ດ້ວຍ slug, ບໍ່ແມ່ນ label)
  const posts = getPostsByCategory(slug as Category);

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-lao-serif font-bold mb-2 text-ink-light dark:text-ink">
        ບົດຄວາມໝວດ: {label}
      </h1>
      <p className="text-ink-light/60 dark:text-ink/60 mb-12">
        {posts.length > 0
          ? `ພົບ ${posts.length} ບົດຄວາມໃນໝວດນີ້`
          : "ຍັງບໍ່ມີບົດຄວາມໃນໝວດນີ້"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}