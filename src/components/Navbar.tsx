/* eslint-disable react/jsx-no-comment-textnodes */
// @/components/Navbar.tsx

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const navItems = [
  { href: "/#solutions", label: "/solutions" },
  { href: "/#industries", label: "/industries" },
  { href: "/work", label: "/work" },
  { href: "/#process", label: "/process" },
  { href: "/#about", label: "/about" },
  { href: "/#contact", label: "/contact" },
  { href: "/start", label: "/start" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="logo" onClick={close}>
          JIREHGRP<span>//</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
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
          <Link href="/" className="logo" onClick={close}>
            JIREHGRP<span>//</span>
          </Link>
          <button
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={close}
          >
            ×
          </button>
        </div>

        <div id="mobile-menu" className="menu-overlay-content">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
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