import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CATEGORY_LABELS, type Category } from "./category-list";

// ສົ່ງຕໍ່ ໃຫ້ໄຟລ໌ອື່ນທີ່ເຄີຍ import Category/CATEGORY_LABELS ຈາກ posts.ts ຍັງໃຊ້ໄດ້ຄືເກົ່າ
// (ແຕ່ Client Component ຄວນ import ຈາກ ./category-list ໂດຍກົງ ບໍ່ຜ່ານໄຟລ໌ນີ້ — ເບິ່ງຄຳອະທິບາຍລຸ່ມ)
export { CATEGORY_LABELS, type Category };

const postsDirectory = path.join(process.cwd(), "posts");

const VALID_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: Category;
  image?: string;
};

export type Post = PostMeta & {
  content: string;
};

// ແປງຄ່າ date ໃຫ້ເປັນ string "YYYY-MM-DD" ສະເໝີ
// ຈຳເປັນເພາະ YAML ຈະອ່ານ `date: 2026-07-29` (ບໍ່ມີ quote) ເປັນ Date object
// ແຕ່ອ່ານ `date: "2026-07-29"` (ມີ quote) ເປັນ string — 2 ແບບນີ້ຖ້າປະປົນກັນ
// ຈະເຮັດໃຫ້ sort() ຮຽງລຳດັບຜິດ (ບົດຄວາມໃໝ່ອາດໄປຢູ່ລຸ່ມສຸດແທນທີ່ຈະຢູ່ເທິງສຸດ)
function normalizeDate(date: unknown): string {
  if (date instanceof Date) {
    return date.toISOString().split("T")[0]; // → "YYYY-MM-DD"
  }
  return String(date);
}

// ອ່ານ frontmatter 1 ໄຟລ໌ + ກວດຄວາມຖືກຕ້ອງ (ໃຊ້ຮ່ວມກັນລະຫວ່າງ getAllPosts ແລະ getPostBySlug)
function parsePostMeta(slug: string, data: Record<string, any>): PostMeta {
  if (!data.title || !data.date || !data.description) {
    throw new Error(
      `ບົດຄວາມ "${slug}.md" ຂາດ frontmatter ທີ່ຈຳເປັນ (title/date/description) — ກວດເບິ່ງໄຟລ໌ນີ້ອີກຄັ້ງ`
    );
  }

  if (!data.category || !VALID_CATEGORIES.includes(data.category)) {
    throw new Error(
      `ບົດຄວາມ "${slug}.md" ມີ category ບໍ່ຖືກຕ້ອງ: "${data.category}" — ຕ້ອງເປັນອັນໃດອັນໜຶ່ງໃນ: ${VALID_CATEGORIES.join(", ")}`
    );
  }

  return {
    slug,
    title: data.title,
    date: normalizeDate(data.date),
    description: data.description,
    category: data.category as Category,
    image: data.image,
  };
}

// ດຶງລາຍຊື່ບົດຄວາມທັງໝົດ (ໃຊ້ໃນໜ້າ list) — ຮຽງລຳດັບຕາມວັນທີໃໝ່ສຸດກ່ອນ
export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return parsePostMeta(slug, data);
    });

  // ໃຊ້ Date object ປຽບທຽບ ແທນ string comparison — ທົນທານກວ່າ
  // (string comparison ຈະຮຽງຜິດຖ້າຮູບແບບວັນທີບໍ່ຄົງທີ່ 100% ລະຫວ່າງໄຟລ໌)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ດຶງລາຍຊື່ slug ທັງໝົດ (ໃຊ້ໃນ generateStaticParams)
export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// ດຶງບົດຄວາມອັນດຽວແບບເຕັມ (ໃຊ້ໃນໜ້າອ່ານບົດຄວາມ)
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const meta = parsePostMeta(slug, data);

  return {
    ...meta,
    content,
  };
}

// ດຶງບົດຄວາມສະເພາະໝວດໝູ່ (ໃຊ້ໃນໜ້າ /category/[slug])
export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

// ດຶງລາຍຊື່ໝວດໝູ່ພ້ອມຈຳນວນບົດຄວາມ (ໃຊ້ສະແດງໃນ sidebar/menu ພ້ອມ badge ຈຳນວນ)
export function getCategoryCounts(): { category: Category; label: string; count: number }[] {
  const allPosts = getAllPosts();
  return VALID_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    count: allPosts.filter((p) => p.category === category).length,
  }));
}

const laoMonths = [
  "ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ",
  "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ",
];

// ແປງວັນທີຮູບແບບ ISO (ຈາກ frontmatter) ໃຫ້ເປັນຮູບແບບພາສາລາວ ໃຊ້ສະແດງຜົນເທົ່ານັ້ນ
// ຕົວຢ່າງ: "2026-07-01" → "1 ກໍລະກົດ 2026"
export function formatLaoDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = laoMonths[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}