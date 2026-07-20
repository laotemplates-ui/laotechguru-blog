import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "LaoTechGuru — ຄວາມຮູ້ໄອທີສຳລັບຄົນລາວ",
  description: "ບົດຄວາມດ້ານເທັກໂນໂລຊີ, ການຂຽນໂປຣແກຣມ, ຂ່າວໄອທີ, ຄວາມປອດໄພໄຊເບີ ແລະ ການແກ້ໄຂບັນຫາຄອມພິວເຕີ ພາສາລາວ",
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-lao-serif font-bold mb-2 text-ink-light dark:text-ink">
        ຄວາມຮູ້ໄອທີ ສຳລັບຄົນລາວ
      </h1>
      <p className="text-ink-light/60 dark:text-ink/60 mb-12">
        ບົດຄວາມ, ຄູ່ມື ແລະ ຂ່າວສານດ້ານເທັກໂນໂລຊີ ຂຽນເປັນພາສາລາວ ເຂົ້າໃຈງ່າຍ ນຳໃຊ້ໄດ້ຈິງ.
      </p>

      {posts.length === 0 ? (
        <p className="text-ink-light/50 dark:text-ink/50 text-sm">
          ຍັງບໍ່ມີບົດຄວາມ — ເພີ່ມໄຟລ໌ .md ໃນໂຟນເດີ posts/
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}