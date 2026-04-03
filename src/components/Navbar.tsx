// @/components/Navbar.tsx

"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { href: "#home", label: "/home" },
    { href: "#solutions", label: "/solutions" },
    { href: "#industries", label: "/industries" },
    { href: "#about", label: "/about" },
    { href: "#contact", label: "/contact" },
  ];

  return (
    <>
      <nav className="site-nav">
        <a href="#home" className="logo" onClick={closeMenu}>
          JIREHGRP //
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}

          <div className="toggle-row">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        <button
          type="button"
          className={`menu-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`menu-overlay ${open ? "menu-overlay-open" : ""}`}>
        <div className="menu-overlay-header">
          <a href="#home" className="logo" onClick={closeMenu}>
            JIREHGRP //
          </a>

          <button
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ×
          </button>
        </div>

        <div id="mobile-menu" className="menu-overlay-content">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}

          <div className="menu-overlay-toggles">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}