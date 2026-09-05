"use client";

import { motion } from "framer-motion";
import { Coffee, Scissors, UtensilsCrossed, Gem, Package } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      icon: <Coffee size={28} />,
      title: "Café y Cacao",
      desc: "Grano, procesado, orgánico, comercio justo.",
    },
    {
      icon: <Scissors size={28} />,
      title: "Textiles Artesanales",
      desc: "Lana de oveja, alpaca, algodón, tintes naturales.",
    },
    {
      icon: <UtensilsCrossed size={28} />,
      title: "Alimentos Artesanales",
      desc: "Mermeladas, snacks, productos gourmet locales.",
    },
    {
      icon: <Gem size={28} />,
      title: "Artesanías",
      desc: "Cerámica, madera, joyería artesanal.",
    },
    {
      icon: <Package size={28} />,
      title: "Otros",
      desc: "Categoría abierta con validación del administrador.",
    },
  ];

  return (
    <section id="categorias" className="section-padding bg-surface">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-text-dark font-serif"
          >
            Categorías de Producto
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted text-balance"
          >
            MatchCargo soporta una variedad de productos artesanales y locales
            con potencial de exportación.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-surface shadow-soft rounded-2xl p-6 text-center hover:shadow-soft-md hover:-translate-y-1 transition-all border border-border/20 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-text-dark mb-2 font-serif text-lg">
                {cat.title}
              </h3>
              <p className="text-text-muted text-sm">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
