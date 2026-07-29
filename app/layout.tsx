import type { Metadata } from "next";
import { Noto_Serif_Lao, Noto_Sans_Lao } from "next/font/google";
import "./globals.css";

const notoSerifLao = Noto_Serif_Lao({
  subsets: ["lao"],
  weight: ["400", "700"],
  variable: "--font-lao-serif",
});

const notoSansLao = Noto_Sans_Lao({
  subsets: ["lao"],
  weight: ["400", "500", "700"],
  variable: "--font-lao-sans",
});

const siteUrl = "https://laotechguru.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LaoTechGuru | ຄວາມຮູ້ໄອທີສຳລັບຄົນລາວ",
    template: "%s | LaoTechGuru",
  },
  description:
    "ບົດຄວາມ ແລະ ຄູ່ມືດ້ານເທັກໂນໂລຊີ, ການຂຽນໂປຣແກຣມ, ຂ່າວໄອທີ, ຄວາມປອດໄພໄຊເບີ ແລະ ການແກ້ໄຂບັນຫາຄອມພິວເຕີ ຂຽນເປັນພາສາລາວ.",
  openGraph: {
    title: "LaoTechGuru | ຄວາມຮູ້ໄອທີສຳລັບຄົນລາວ",
    description:
      "ບົດຄວາມ ແລະ ຄູ່ມືດ້ານເທັກໂນໂລຊີ, ການຂຽນໂປຣແກຣມ, ຂ່າວໄອທີ, ຄວາມປອດໄພໄຊເບີ ແລະ ການແກ້ໄຂບັນຫາຄອມພິວເຕີ ຂຽນເປັນພາສາລາວ.",
    url: siteUrl,
    siteName: "LaoTechGuru",
    locale: "lo_LA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lo"
      suppressHydrationWarning
      className={`${notoSerifLao.variable} ${notoSansLao.variable}`}
    >
      <head>
        {/* ຕ້ອງຮັນກ່ອນ CSS/React hydrate — ອ່ານຄ່າ theme ຈາກ localStorage ແລ້ວໃສ່ class="dark"
            ໃສ່ <html> ທັນທີ ບໍ່ໃຫ້ໜ້າກະພິບຈາກ light → dark ຕອນ refresh */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const isDark = stored ? stored === "dark" : prefersDark;
                if (isDark) document.documentElement.classList.add("dark");
              })();
            `,
          }}
        />
      </head>
      <body className="font-lao-sans bg-base-light dark:bg-base text-ink-light dark:text-ink flex flex-col min-h-screen transition-colors">
        {children}
      </body>
    </html>
  );
}