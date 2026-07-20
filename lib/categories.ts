import { CATEGORY_LABELS, type Category } from "./category-list";


// Mapping ລະຫວ່າງ slug ແລະ label — ດຶງມາຈາກ CATEGORY_LABELS ໃນ posts.ts ໂດຍກົງ
// (ບໍ່ຂຽນ list ຊ້ຳໃສ່ 2 ບ່ອນ — ນີ້ຄືສາເຫດທີ່ posts.ts ອັບເດດເປັນ 8 ໝວດແລ້ວ
//  ແຕ່ໄຟລ໌ນີ້ຍັງເປັນ marketing/seo/design ເກົ່າ)
export const categories: { slug: Category; label: string }[] = (
  Object.keys(CATEGORY_LABELS) as Category[]
).map((slug) => ({
  slug,
  label: CATEGORY_LABELS[slug],
}));

// slug → label (ໃຊ້ໃນໜ້າ category ເພື່ອຮູ້ວ່າຈະ filter ບົດຄວາມດ້ວຍຄ່າໃດ)
export function getCategoryLabel(slug: string): string | undefined {
  return CATEGORY_LABELS[slug as Category];
}

// label → slug (ໃຊ້ໃນ Badge ຂອງ post card ເພື່ອຮູ້ວ່າຈະລິ້ງໄປໜ້າໃດ)
export function getCategorySlug(label: string): string | undefined {
  return categories.find((c) => c.label === label)?.slug;
}

// ໃຊ້ໃນ generateStaticParams ຂອງໜ້າ category
export function getAllCategorySlugs(): Category[] {
  return categories.map((c) => c.slug);
}