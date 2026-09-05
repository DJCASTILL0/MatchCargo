"use client";

import { motion } from "framer-motion";
import { Languages, Calculator, FileText, Truck } from "lucide-react";

export default function SolutionSection() {
  const solutions = [
    {
      icon: <Languages size={28} />,
      title: "Traducción automática",
      desc: "Catálogo y chat traducidos al inglés o portugués automáticamente.",
    },
    {
      icon: <Calculator size={28} />,
      title: "Cálculo de costos",
      desc: "Simulador de costos de exportación con precio FOB estimado en tiempo real.",
    },
    {
      icon: <FileText size={28} />,
      title: "Plantilla de acuerdo",
      desc: "Contrato base de compraventa internacional listo para usar.",
    },
    {
      icon: <Truck size={28} />,
      title: "Guía logística",
      desc: "Recomendaciones de transportistas según país de origen y destino.",
    },
  ];

  return (
    <section id="solucion" className="section-padding bg-surface">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold uppercase tracking-wider text-sm mb-3"
            >
              La Solución
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-dark text-balance"
            >
              MatchCargo: tu puente directo al mercado internacional
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-muted mb-8 text-balance"
            >
              Un catálogo visual con lógica de match que conecta oferta y
              demanda internacional, con herramientas integradas que acompañan al
              productor desde el primer contacto hasta el primer envío.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutions.map((sol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-surface-container rounded-2xl p-7 border border-border/20 shadow-sm"
              >
                <div className="text-tertiary mb-4">{sol.icon}</div>
                <h3 className="font-serif font-bold text-lg mb-2 text-text-dark">
                  {sol.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {sol.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
