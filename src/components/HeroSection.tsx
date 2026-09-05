"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center section-padding bg-background overflow-hidden"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface opacity-50" />

      <div className="container-max relative z-10 flex flex-col items-center text-center max-w-4xl pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark leading-tight mb-6 text-balance"
        >
          Conectamos productores locales con compradores del mundo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted mb-10 text-balance max-w-2xl"
        >
          Plataforma B2B de descubrimiento tipo match que conecta de forma
          directa a pequeños productores y artesanos locales con compradores
          internacionales — sin intermediarios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
        >
          <a href="#como-funciona" className="btn-primary w-full sm:w-auto">
            Soy Productor
          </a>
          <a href="#como-funciona" className="btn-secondary w-full sm:w-auto">
            Soy Comprador
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 text-text-muted text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            <span>🌎</span>
            <span>5 categorías de producto</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🤝</span>
            <span>Match inteligente</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>Chat con traducción</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
