// @/components/Navbar.tsx

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

  return (
    <>
      <nav className="site-nav">
        <a href="#home" className="logo" onClick={closeMenu}>
          JIREHGRP //
        </a>

        {/* desktop nav */}
        <div className="nav-links">
          <a href="#home">/home</a>
          <a href="#about">/about</a>
          <a href="#services">/services</a>
          <a href="#contact">/contact</a>

          <div className="toggle-row">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* mobile hamburger */}
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

      {/* mobile fullscreen menu */}
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
          <a href="#home" onClick={closeMenu}>
            /home
          </a>
          <a href="#about" onClick={closeMenu}>
            /about
          </a>
          <a href="#services" onClick={closeMenu}>
            /services
          </a>
          <a href="#contact" onClick={closeMenu}>
            /contact
          </a>

          <div className="menu-overlay-toggles">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}