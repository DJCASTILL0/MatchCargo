"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="equipo" className="section-padding bg-surface-container">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-dark font-serif"
          >
            Sobre el Proyecto
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-surface shadow-soft-md rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center"
        >
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Business Tech Challenge 2026
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-dark mb-3">
            MatchCargo Cubito
          </h3>
          
          <p className="text-tertiary font-medium mb-6">
            Categoría: Comercio Internacional, Logística y Aduanas
          </p>
          
          <p className="text-text-muted leading-relaxed mb-8 text-balance mx-auto">
            Proyecto desarrollado en la Universidad San Francisco Xavier de Chuquisaca para el
            Business Tech Challenge 2026. MatchCargo busca democratizar el acceso al comercio
            internacional para pequeños productores y artesanos locales de Bolivia y Latinoamérica.
          </p>

          <div className="border-t border-border/60 my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div>
              <p className="text-3xl font-serif text-primary font-bold mb-1">33</p>
              <p className="text-sm text-text-muted">Requisitos funcionales</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-primary font-bold mb-1">5</p>
              <p className="text-sm text-text-muted">Módulos principales</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-primary font-bold mb-1">10</p>
              <p className="text-sm text-text-muted">Pantallas clave</p>
            </div>
          </div>

          <a href="#contacto" className="btn-primary inline-flex items-center gap-2">
            Ver Demo Funcional <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
