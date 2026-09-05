"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Problema", href: "#problema" },
    { name: "Solución", href: "#solucion" },
    { name: "Cómo Funciona", href: "#como-funciona" },
    { name: "Categorías", href: "#categorias" },
    { name: "Características", href: "#caracteristicas" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-max px-5 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 z-50">
          <Image
            src="/logo.jpeg"
            alt="MatchCargo Cubito Logo"
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
          <span className="font-serif text-2xl font-bold text-text-dark">
            MatchCargo
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
          <a href="/login" className="btn-primary py-2 px-5 text-sm">
            Acceder a la Demo
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-text-dark p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border shadow-soft-lg flex flex-col p-5 gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-dark text-lg font-medium p-2 border-b border-border/50"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-center mt-4"
            >
              Acceder a la Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
