"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  // ເລີ່ມຕົ້ນເປັນ null ເພື່ອບໍ່ໃຫ້ server/client render ບໍ່ຕົງກັນ (hydration mismatch)
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  if (isDark === null) {
    // ຊ່ວງສັ້ນໆກ່ອນ useEffect ຮັນ — ໃສ່ placeholder ຂະໜາດເທົ່າກັນ ກັນ layout ກະໂດດ
    return <div className="w-[20px] h-[20px]" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-ink-light/70 hover:text-accent-dark dark:text-ink/70 dark:hover:text-accent transition-colors p-1"
      aria-label={isDark ? "ປ່ຽນເປັນໂໝດສະຫວ່າງ" : "ປ່ຽນເປັນໂໝດມືດ"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}