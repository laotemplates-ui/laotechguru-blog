"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

type Props = {
  title: string;
  url: string;
};

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.83 14.13c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.09.11-1.76-.11a12.5 12.5 0 0 1-1.75-.65 11 11 0 0 1-4.3-3.8 5.1 5.1 0 0 1-1.07-2.7c0-.78.4-1.16.55-1.32.14-.16.31-.2.42-.2h.4c.13 0 .3-.02.46.35.24.55.8 1.9.87 2.04.07.14.11.3.02.48-.09.18-.14.29-.27.44-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.37-.23.62-.14.25.1 1.6.76 1.87.9.27.14.45.2.52.32.07.12.07.65-.17 1.29z" />
    </svg>
  );
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappHref = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ຖ້າ browser ບໍ່ຮອງຮັບ Clipboard API (ໜ້ອຍຫຼາຍ) ບໍ່ເຮັດຫຍັງ, ບໍ່ crash
    }
  }

  const buttonClass =
    "flex items-center gap-2 text-sm text-ink-light/70 dark:text-ink/70 border border-ink-light/15 dark:border-ink/15 rounded-full px-4 py-2 hover:text-accent-dark dark:hover:text-accent hover:border-accent-dark/40 dark:hover:border-accent/40 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-ink-light/50 dark:text-ink/50 mr-1">
        ແຊຣ໌ບົດຄວາມນີ້:
      </span>

      <a href={facebookHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        <FacebookIcon />
        Facebook
      </a>

      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        <WhatsAppIcon />
        WhatsApp
      </a>

      <button onClick={handleCopyLink} className={buttonClass}>
        {copied ? <Check size={16} /> : <Link2 size={16} />}
        {copied ? "ກັອບປີ້ແລ້ວ!" : "Copy Link"}
      </button>
    </div>
  );
}