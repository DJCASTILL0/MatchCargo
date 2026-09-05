"use client";

import { motion } from "framer-motion";
import { UserX, ShieldAlert, Wallet } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: <UserX size={32} />,
      title: "Sin contactos internacionales",
      desc: "No tiene red comercial en el extranjero ni acceso a compradores reales.",
    },
    {
      icon: <ShieldAlert size={32} />,
      title: "Sin canal confiable",
      desc: "No sabe cómo encontrar un comprador internacional confiable y seguro.",
    },
    {
      icon: <Wallet size={32} />,
      title: "Sin presupuesto para ferias",
      desc: "No cuenta con recursos para participar en ferias internacionales de exportación.",
    },
  ];

  return (
    <section id="problema" className="section-padding bg-background">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-text-dark"
          >
            El Problema
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted text-balance"
          >
            Un pequeño productor local puede tener un producto de excelente
            calidad con potencial de venta en Europa, Estados Unidos o países
            vecinos, pero enfrenta barreras críticas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="bg-surface shadow-soft rounded-2xl p-7 md:p-8 border border-border/40 flex flex-col items-center text-center hover:shadow-soft-md transition-shadow"
            >
              <div className="text-primary mb-6 bg-primary/10 p-4 rounded-full">
                {prob.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-text-dark">
                {prob.title}
              </h3>
              <p className="text-text-muted">{prob.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-text-muted max-w-2xl mx-auto italic"
        >
          "Como consecuencia, termina vendiendo localmente a precios bajos
          mientras intermediarios se quedan con la mayor parte del margen."
        </motion.p>
      </div>
    </section>
  );
}
