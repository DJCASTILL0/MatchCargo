"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"productor" | "comprador">("productor");

  const producerSteps = [
    "Regístrate como productor y completa tu perfil con datos del negocio, ubicación y certificaciones.",
    "Crea tu catálogo visual con fotos, volumen de producción y precios. Se traduce automáticamente.",
    "Explora el Radar de Oportunidades: compradores activos que buscan tu tipo de producto.",
    "Recibe un Match cuando un comprador muestra interés recíproco en tus productos.",
    "Negocia por chat seguro con traductor integrado y cierra tu primera exportación.",
  ];

  const buyerSteps = [
    "Regístrate como comprador e indica tu país, categoría de interés y volumen que buscas.",
    "Explora productores con swipe: ve catálogos, certificaciones y precio FOB estimado.",
    "Filtra por certificación, ubicación, categoría o nivel de compatibilidad.",
    "Haz match y abre un chat seguro con el productor de tu interés.",
    "Usa el simulador de costos, cierra el acuerdo con la plantilla de contrato y guía de envío.",
  ];

  const steps = activeTab === "productor" ? producerSteps : buyerSteps;

  return (
    <section id="como-funciona" className="section-padding bg-background">
      <div className="container-max max-w-4xl">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-text-dark font-serif"
          >
            Cómo Funciona
          </motion.h2>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab("productor")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "productor"
                  ? "bg-primary text-white shadow-soft-md"
                  : "bg-transparent border border-border text-text-muted hover:text-primary"
              }`}
            >
              Soy Productor
            </button>
            <button
              onClick={() => setActiveTab("comprador")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "comprador"
                  ? "bg-primary text-white shadow-soft-md"
                  : "bg-transparent border border-border text-text-muted hover:text-primary"
              }`}
            >
              Soy Comprador
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "productor" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "productor" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold font-serif text-lg">
                    {idx + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-text-dark text-lg leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
