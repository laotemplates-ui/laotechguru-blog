"use client";

import { useState, useRef, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ children }: { children?: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ຖ້າ browser ບໍ່ຮອງຮັບ Clipboard API ບໍ່ເຮັດຫຍັງ, ບໍ່ crash
    }
  }

  return (
    <div className="relative group/code">
      <button
        onClick={handleCopy}
        aria-label={copied ? "ກັອບປີ້ແລ້ວ" : "ກັອບປີ້ໂຄດ"}
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5
          text-xs font-medium px-2.5 py-1.5 rounded-md
          bg-white/5 border border-white/10 text-white/50
          opacity-0 group-hover/code:opacity-100
          hover:bg-white/10 hover:text-white/90
          transition-all duration-150"
      >
        {copied ? (
          <>
            <Check size={13} className="text-green-400" />
            <span className="text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span>Copy</span>
          </>
        )}
      </button>

      <pre ref={preRef}>{children}</pre>
    </div>
  );
}