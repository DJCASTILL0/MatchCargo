"use client";

import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  DollarSign,
  ShieldCheck,
  BarChart3,
  FileSignature,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Heart size={24} />,
      title: "Matching Inteligente",
      desc: "Badge de compatibilidad basado en certificación, volumen, categoría y rango de precio entre productor y comprador.",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Chat con Traducción",
      desc: "Comunicación privada y segura con traducción automática en tiempo real entre español, inglés y portugués.",
    },
    {
      icon: <DollarSign size={24} />,
      title: "Simulador de Costos",
      desc: "Calcula en tiempo real el costo total estimado de exportación: producto + flete + margen de referencia.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Verificación y Reputación",
      desc: "Sellos de verificación, calificaciones y reseñas para construir confianza entre las partes.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Dashboard de Métricas",
      desc: "Visualizaciones del catálogo, número de matches, valor potencial de exportación acumulado.",
    },
    {
      icon: <FileSignature size={24} />,
      title: "Acuerdo Comercial",
      desc: "Plantilla editable de contrato base de compraventa internacional con guía de envío integrada.",
    },
  ];

  return (
    <section id="caracteristicas" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-text-dark font-serif"
          >
            Características Principales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted text-balance"
          >
            Herramientas diseñadas para hacer que tu primera exportación sea
            simple, segura y directa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-surface shadow-soft rounded-2xl p-7 border border-border/30 hover:shadow-soft-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="font-bold text-text-dark mb-3 font-serif text-xl">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
