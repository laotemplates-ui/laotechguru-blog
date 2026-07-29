import Navbar from "@/components/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="flex-1">{children}</div>

      <footer className="border-t border-ink-light/10 dark:border-ink/10 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-light/50 dark:text-ink/50">
          <p>
            © {new Date().getFullYear()} LaoTechGuru — ຄວາມຮູ້ໄອທີ ສຳລັບຄົນລາວ 🇱🇦
            <span className="mx-2 text-ink-light/20 dark:text-ink/20">|</span>
            ອອກແບບໂດຍ{" "}
            
            <a  href="https://laotemplate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-dark dark:hover:text-accent transition-colors underline underline-offset-2"
            >
              laotemplate.com
            </a>
          </p>

          <div className="flex items-center gap-5">
            {[
              { label: "Facebook", href: "https://facebook.com/laotechguru" },
              { label: "ຕິດຕໍ່ເຮົາ", href: "mailto:hello@laotechguru.com" },
            ].map((link) => (
              
              <a  key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-accent-dark dark:hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}