import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

      {/* Active Navigation Dot */}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Section Observer for Active Dots
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id);
        }
      });
    };

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
      setIsMenuOpen(false); // Close menu if open on mobile
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled || isMenuOpen
            ? "bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Navbar Container */}
        <nav className="relative max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* =========================================
              MOBILE LEFT: Premium Editorial Menu Icon 
              ========================================= */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 -ml-2 text-stone-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[1px] w-full bg-stone-900 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-[1px] bg-stone-900 transition-all duration-300 ${isMenuOpen ? "w-0 opacity-0" : "w-full"}`}
              />
              <span
                className={`block h-[1px] w-full bg-stone-900 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
              />
            </div>
          </button>

          {/* =========================================
              LOGO: Left on Desktop, Center on Mobile 
              ========================================= */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-50">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="group flex items-center gap-2.5 cursor-pointer"
            >
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
          </div>

          {/* =========================================
              DESKTOP CENTER: Navigation Items 
              ========================================= */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <NavLink
                  item={item}
                  isActive={activeItem === item.id}
                  onClick={() => setActiveItem(item.id)}
                />
                {index < navItems.length - 1 && (
                  <span className="text-stone-400/30 text-[10px] mx-1">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* =========================================
              DESKTOP RIGHT: CTA (Hidden on Mobile)
              ========================================= */}
          <div className="hidden md:block">
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
                <path
                  d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z"
                  fill="currentColor"
                />
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
          </div>

          {/* Spacer block for mobile to keep flex-between balanced if needed */}
          <div className="block md:hidden w-8" />
        </nav>
      </motion.header>

      {/* =========================================
          MOBILE MENU FULLSCREEN OVERLAY
          ========================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F5F1] flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif text-4xl text-stone-900 tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Minimalist divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-12 h-px bg-stone-300 mt-12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
