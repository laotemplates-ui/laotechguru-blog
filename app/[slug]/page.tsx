import { getAllSlugs, getPostBySlug, getPostsByCategory, formatLaoDate, CATEGORY_LABELS } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import ShareButtons from "@/components/ShareButtons";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "@/components/CodeBlock";

const siteUrl = "https://laotechguru.com";

type Props = {
  params: Promise<{ slug: string }>;
};

// ບອກ Next.js ວ່າຕ້ອງ build ໜ້າໃດແດ່ລ່ວງໜ້າ (Static Site Generation)
export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ບອກ Next.js ວ່າ metadata (title, description, Open Graph) ຂອງແຕ່ລະໜ້າຄືຫຍັງ
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllSlugs();

  if (!slugs.includes(slug)) {
    return {};
  }

  const post = getPostBySlug(slug);
  const url = `${siteUrl}/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "LaoTechGuru",
      locale: "lo_LA",
      type: "article",
      publishedTime: post.date,
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const slugs = getAllSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);
  const postUrl = `${siteUrl}/${slug}`;
  const categoryLabel = CATEGORY_LABELS[post.category];

  // ບົດຄວາມອື່ນໝວດດຽວກັນ, ບໍ່ຮວມບົດຄວາມທີ່ກຳລັງອ່ານຢູ່, ເອົາແຕ່ 3 ອັນ
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <article>
        <Link
          href={`/category/${post.category}`}
          className="inline-block text-xs font-medium text-accent-dark dark:text-accent bg-accent-dark/10 dark:bg-accent/10 px-3 py-1 rounded-full mb-4 hover:bg-accent-dark/20 dark:hover:bg-accent/20 transition-colors"
        >
          {categoryLabel}
        </Link>

        <p className="text-sm text-ink-light/50 dark:text-ink/50 mb-3">
          {formatLaoDate(post.date)}
        </p>
        <h1 className="text-4xl font-lao-serif font-bold mb-8 text-ink-light dark:text-ink leading-tight">
          {post.title}
        </h1>

        {post.image ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        <div
          className="prose prose-lg max-w-none
          prose-headings:mt-8 prose-headings:mb-4
          prose-h1:mt-0 prose-h1:mb-6
          prose-p:my-4 prose-p:leading-[1.8]
          prose-ul:my-4 prose-ol:my-4
          prose-li:my-1 prose-li:leading-[1.8]"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: CodeBlock,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <hr className="my-8 border-ink-light/10 dark:border-ink/10" />

      <ShareButtons title={post.title} url={postUrl} />

      <div className="mt-8">
        <CallToAction
          posts={relatedPosts}
          categoryLabel={categoryLabel}
          categorySlug={post.category}
        />
      </div>
    </main>
  );
}