"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import ThemeToggle from "@/components/ThemeToggle";
import { CATEGORY_LABELS, type Category } from "@/lib/category-list";
import Image from "next/image";


const categoryEntries = Object.entries(CATEGORY_LABELS) as [Category, string][];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  const isCategoryActive = pathname.startsWith("/category");

  return (
    <>
      <header className="sticky top-0 z-50 bg-base-light/80 dark:bg-base/80 backdrop-blur-md border-b border-ink-light/10 dark:border-ink/10">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between gap-6">
          <Link
              href="/"
              className="shrink-0 outline-none focus:outline-none focus:ring-0"
            >
              <Image
                src="/logo-horizontal.png"
                alt="LaoTechGuru"
                width={170}
                height={42}
                className="h-auto w-[170px]"
                priority
              />
            </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                isActive("/")
                  ? "text-accent-dark dark:text-accent font-medium"
                  : "text-ink-light/70 dark:text-ink/70 hover:text-accent-dark dark:hover:text-accent"
              }`}
            >
              ໜ້າຫຼັກ
            </Link>

            {/* Dropdown ໝວດໝູ່ — 8 ໝວດເກີນໄປສຳລັບ nav ແຖວດຽວ, ໃຊ້ dropdown ແທນ */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isCategoryActive
                    ? "text-accent-dark dark:text-accent font-medium"
                    : "text-ink-light/70 dark:text-ink/70 hover:text-accent-dark dark:hover:text-accent"
                }`}
              >
                ໝວດໝູ່
                <ChevronDown size={14} />
              </button>

              {categoryOpen ? (
                <div className="absolute top-full left-0 pt-2 w-56">
                  <div className="bg-base-light dark:bg-surface border border-ink-light/10 dark:border-ink/10 rounded-xl shadow-lg py-2">
                    {categoryEntries.map(([slug, label]) => (
                      <Link
                        key={slug}
                        href={`/category/${slug}`}
                        className="block px-4 py-2 text-sm text-ink-light/80 dark:text-ink/80 hover:bg-surface-light dark:hover:bg-base hover:text-accent-dark dark:hover:text-accent transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-ink-light/70 dark:text-ink/70 hover:text-accent-dark dark:hover:text-accent transition-colors p-1"
              aria-label="ຄົ້ນຫາບົດຄວາມ"
            >
              <Search size={20} />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden text-ink-light dark:text-ink p-1"
              aria-label={mobileOpen ? "ປິດເມນູ" : "ເປີດເມນູ"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="md:hidden border-t border-ink-light/10 dark:border-ink/10 bg-base-light dark:bg-base">
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors ${
                  isActive("/")
                    ? "text-accent-dark dark:text-accent font-medium"
                    : "text-ink-light/70 dark:text-ink/70"
                }`}
              >
                ໜ້າຫຼັກ
              </Link>

              <p className="text-xs uppercase tracking-wide text-ink-light/40 dark:text-ink/40 mt-2">
                ໝວດໝູ່
              </p>
              {categoryEntries.map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive(`/category/${slug}`)
                      ? "text-accent-dark dark:text-accent font-medium"
                      : "text-ink-light/70 dark:text-ink/70"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}