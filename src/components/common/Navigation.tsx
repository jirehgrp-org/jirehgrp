// @/components/common/Navbar.tsx

"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/aceternity/resizable-navbar";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].common.navbar;

  const navItems = [
    { name: t.products, link: "/products" },
    { name: t.services, link: "/services" },
    { name: t.tools, link: "/tools" },
    { name: t.contact, link: "/contact" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <div className="flex-shrink-0">
            <NavbarLogo />
          </div>

          <NavItems items={navItems} />

          <div className="flex-shrink-0 flex items-center gap-4">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="lg:hidden">
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>

          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 lg:hidden"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex items-center gap-4 px-2 mt-4 justify-center">
              <ThemeToggle />
              <LanguageToggle />
            </div>

          </MobileNavMenu>

        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Navigation;