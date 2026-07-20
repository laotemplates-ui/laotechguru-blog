import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { formatLaoDate, CATEGORY_LABELS } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  // post.category ຄື slug ຢູ່ແລ້ວ (ເຊັ່ນ "it-thurakit") — ບໍ່ຕ້ອງແປງຫາ slug ອີກ
  // ໃຊ້ CATEGORY_LABELS ແປງເປັນ label ພາສາລາວ ສະແດງໃຫ້ຄົນອ່ານເບິ່ງ
  const categoryLabel = CATEGORY_LABELS[post.category];

  return (
    <div className="group border border-ink-light/10 dark:border-ink/10 rounded-2xl overflow-hidden hover:border-accent-dark/40 dark:hover:border-accent/40 hover:shadow-md transition-all">
      <Link href={`/${post.slug}`} className="block">
        {post.image ? (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : null}
      </Link>
      <div className="p-6">
        <Link
          href={`/category/${post.category}`}
          className="relative z-10 inline-block text-xs font-medium text-accent-dark dark:text-accent bg-accent-dark/10 dark:bg-accent/10 px-3 py-1 rounded-full mb-3 hover:bg-accent-dark/20 dark:hover:bg-accent/20 transition-colors"
        >
          {categoryLabel}
        </Link>

        <Link href={`/${post.slug}`} className="block">
          <p className="text-xs text-ink-light/40 dark:text-ink/40 mb-2">
            {formatLaoDate(post.date)}
          </p>
          <h2 className="text-xl font-lao-serif font-semibold text-ink-light dark:text-ink group-hover:text-accent-dark dark:group-hover:text-accent transition-colors mb-2">
            {post.title}
          </h2>
          <p className="text-sm text-ink-light/70 dark:text-ink/70 line-clamp-3">
            {post.description}
          </p>
        </Link>
      </div>
    </div>
  );
}