import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatLaoDate } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
  categoryLabel: string;
  categorySlug: string;
};

export default function CallToAction({ posts, categoryLabel, categorySlug }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="bg-surface-light dark:bg-surface border border-ink-light/10 dark:border-ink/10 rounded-2xl p-8">
      <h3 className="text-xl font-lao-serif font-bold text-ink-light dark:text-ink mb-5">
        ອ່ານຕໍ່ໃນໝວດ {categoryLabel}
      </h3>

      <div className="flex flex-col gap-4 mb-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group block"
          >
            <p className="text-xs text-ink-light/40 dark:text-ink/40 mb-1">
              {formatLaoDate(post.date)}
            </p>
            <p className="font-lao-serif font-semibold text-ink-light dark:text-ink group-hover:text-accent-dark dark:group-hover:text-accent transition-colors">
              {post.title}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href={`/category/${categorySlug}`}
        className="inline-block text-sm font-medium text-accent-dark dark:text-accent hover:underline"
      >
        ເບິ່ງທັງໝົດໃນໝວດນີ້ →
      </Link>
    </div>
  );
}