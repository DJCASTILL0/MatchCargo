"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="contacto" className="bg-primary section-padding py-20 md:py-28">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4 text-balance">
            ¿Listo para llevar tus productos al mundo?
          </h2>
          <p className="text-white/80 text-lg mb-10 text-balance">
            Únete a MatchCargo y conecta directamente con compradores internacionales.
            Sin intermediarios, sin barreras.
          </p>

          <div className="flex justify-center mb-4">
            <a
              href="/login"
              className="bg-white text-primary font-semibold px-8 py-4 rounded-btn hover:bg-white/90 transition-colors shadow-sm text-lg"
            >
              Unirse a MatchCargo
            </a>
          </div>
          <p className="text-white/60 text-sm">
            Únete gratis. Sin compromisos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
