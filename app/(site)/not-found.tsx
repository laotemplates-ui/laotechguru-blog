import Link from "next/link";
import { CATEGORY_LABELS, type Category } from "@/lib/category-list";

const categoryEntries = Object.entries(CATEGORY_LABELS) as [Category, string][];

export const metadata = {
  title: "ບໍ່ພົບໜ້ານີ້",
  description: "ໜ້າທີ່ທ່ານຊອກຫາອາດຖືກຍ້າຍ ຫຼືບໍ່ມີຢູ່ອີກຕໍ່ໄປ",
};

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-lao-serif font-bold text-accent-dark dark:text-accent mb-4">
        404
      </p>
      <h1 className="text-2xl font-lao-serif font-bold text-ink-light dark:text-ink mb-3">
        ບໍ່ພົບໜ້ານີ້
      </h1>
      <p className="text-ink-light/60 dark:text-ink/60 mb-10">
        ໜ້າທີ່ທ່ານຊອກຫາອາດຖືກຍ້າຍ, ປ່ຽນຊື່, ຫຼືບໍ່ມີຢູ່ອີກຕໍ່ໄປ
      </p>

      <Link
        href="/"
        className="inline-block text-sm font-medium text-white dark:text-base bg-accent-dark dark:bg-accent px-6 py-3 rounded-full hover:bg-accent-dark/90 dark:hover:bg-accent/90 transition-colors mb-12"
      >
        ກັບຄືນໜ້າຫຼັກ
      </Link>

      <div>
        <p className="text-xs uppercase tracking-wide text-ink-light/40 dark:text-ink/40 mb-4">
          ຫຼືເລືອກອ່ານໝວດໝູ່ອື່ນ
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {categoryEntries.map(([slug, label]) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="text-sm text-ink-light/70 dark:text-ink/70 border border-ink-light/15 dark:border-ink/15 rounded-full px-4 py-2 hover:text-accent-dark dark:hover:text-accent hover:border-accent-dark/40 dark:hover:border-accent/40 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}