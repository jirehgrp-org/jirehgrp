// @/components/common/Navbar.tsx

"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/aceternity/resizable-navbar";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/aceternity/navbar-menu";
import { useLanguage } from "@/components/context/LanguageContext";
import { translations } from "@/translations";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language].common.navbar;

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <div className="flex-shrink-0">
            <NavbarLogo />
          </div>

          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item={t.products}>
              <div className="flex flex-col space-y-4 p-4">
                <ProductItem
                  title="Algochurn"
                  href="/products/algochurn"
                  src="https://assets.aceternity.com/demos/algochurn.webp"
                  description="Prepare for tech interviews like never before."
                />
                <ProductItem
                  title="Tailwind Kit"
                  href="/products/tailwind"
                  src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                  description="Tailwind CSS components for your next project."
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item={t.services}>
              <div className="flex flex-col space-y-2 p-4">
                <HoveredLink href="/services/web">Web Development</HoveredLink>
                <HoveredLink href="/services/design">UI/UX Design</HoveredLink>
                <HoveredLink href="/services/seo">SEO</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item={t.tools}>
              <div className="flex flex-col space-y-2 p-4">
                <HoveredLink href="/tools/calculator">Budget Calculator</HoveredLink>
                <HoveredLink href="/tools/ai-tools">AI Tools</HoveredLink>
              </div>
            </MenuItem>
          </Menu>

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
            {[
              { name: t.products, link: "/products" },
              { name: t.services, link: "/services" },
              { name: t.tools, link: "/tools" },
              { name: t.contact, link: "/contact" },
            ].map((item, idx) => (
              <HoveredLink
                key={idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </HoveredLink>
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
