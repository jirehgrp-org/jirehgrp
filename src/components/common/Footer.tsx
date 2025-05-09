// @/components/common/Footer.tsx

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].common.footer;

  const footerSections = [
    {
      title: t.company,
      links: [
        { name: t.about, href: "/about" },
        { name: t.careers, href: "/careers" },
        { name: t.contact, href: "/contact" },
      ],
    },
    {
      title: t.legal,
      links: [
        { name: t.privacy, href: "/legal/privacy" },
        { name: t.terms, href: "/legal/terms" },
      ],
    },
    {
      title: t.social,
      links: [
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "X", href: "https://x.com" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-foreground">
              JirehGroup
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t.description}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Jireh Group. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;