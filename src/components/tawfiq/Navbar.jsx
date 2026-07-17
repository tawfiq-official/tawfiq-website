import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "qaza", label: "Qaza", href: "#qaza" },
  { id: "quran", label: "Quran", href: "#quran" },
  { id: "academy", label: "Academy", href: "#academy" },
];

function NavLink({ item, isActive, onClick }) {
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className="relative px-5 py-2 font-sans text-[13px] tracking-wide transition-colors duration-300 z-10 cursor-pointer"
      style={{ color: isActive ? "#1c1917" : "#78716c" }}
      whileHover={{ color: "#1c1917" }}
    >
      <span className="relative z-10">{item.label}</span>

      {/* Active Navigation Dot (Smoothly glides to the active state) */}
      {isActive && (
        <motion.div
          layoutId="navActiveDot"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C6A26B]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("qaza");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved Intersection Observer for robust bi-directional scrolling (Up & Down)
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    };

    // Creates a detection band in the upper middle of the viewport.
    // It ignores the top 80px (navbar) and the bottom 60% of the screen.
    // This ensures scrolling UP triggers the section as soon as it enters the view.
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      // Navbar Appears from the Top with Spring
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled // Navbar Blur on Scroll
          ? "bg-white/45 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          {/* Animated Logo */}
          <motion.svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="text-stone-900"
            whileHover={{ rotate: 5, x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <path
              d="M11 2C11 2 5 6 5 12C5 16 8 19 11 19C14 19 17 16 17 12C17 6 11 2 11 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M11 5V19M8 11L11 8L14 11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>

          <span className="font-serif text-xl text-stone-900 tracking-tight">
            Tawfiq
          </span>
        </Link>

        {/* Center Nav Items */}
        <div className="hidden md:flex items-center">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <NavLink
                item={item}
                isActive={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
              />
              {/* Tiny Dot Between Items */}
              {index < navItems.length - 1 && (
                <span className="text-stone-400/30 text-[10px] mx-1">•</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right CTA */}
        <a
          href="https://tawfiq-official.github.io/Tawfiq/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 text-[13px] text-stone-900 transition-all duration-300"
        >
          <span className="w-0 group-hover:w-4 h-[1px] bg-[#C6A26B] transition-all duration-500" />
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            className="text-stone-900 transition-colors duration-500 group-hover:text-[#C6A26B]"
          >
            <circle
              cx="12"
              cy="12"
              r="9.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z" fill="currentColor" />
            <path
              d="M12 19 L14.5 12 L12 14.5 L9.5 12 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="0.7" fill="currentColor" />
          </svg>
          <span className="relative font-serif text-[15px] tracking-tight group-hover:text-[#6B4F37] transition-colors duration-500">
            Begin with Bismillah
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#C6A26B] transition-all duration-500 group-hover:w-full" />
          </span>
          <span className="w-0 group-hover:w-4 h-[1px] bg-[#C6A26B] transition-all duration-500" />
        </a>
      </nav>
    </motion.header>
  );
}
