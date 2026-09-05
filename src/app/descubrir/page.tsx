"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MapPin, Package, Award, Search } from "lucide-react";

export default function DescubrirPage() {
  const { user, isLoading } = useAuth();
  const [cards, setCards] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        window.location.href = "/login";
      } else if (user.role !== "comprador") {
        window.location.href = "/dashboard";
      } else {
        // Cargar productos
        fetch(`/api/products?excludeProducerId=${user.id}`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) setCards(data);
            setLoadingProducts(false);
          });
      }
    }
  }, [user, isLoading]);

  const handleSwipe = async (direction: "left" | "right") => {
    const currentCard = cards[0];
    if (direction === "right" && user) {
      // Hacer Match
      await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: currentCard.id,
          producerId: currentCard.producerId,
          buyerId: user.id
        })
      });
      alert(`¡Match registrado con ${currentCard.name}!`);
    }
    setCards((prev) => prev.slice(1));
  };

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-serif font-bold text-text-dark mb-2">Radar de Oportunidades</h1>
      <p className="text-text-muted mb-8 text-center">Desliza a la derecha si te interesa, a la izquierda para pasar.</p>

      <div className="relative w-full max-w-sm aspect-[3/4]">
        {loadingProducts ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface rounded-3xl border border-border">
             <p className="text-text-muted">Buscando productores...</p>
           </div>
        ) : (
          <AnimatePresence>
            {cards.length > 0 ? (
              <motion.div
                key={cards[0].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ x: -200, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-surface rounded-3xl shadow-soft-lg border border-border overflow-hidden flex flex-col"
              >
                <div 
                  className="flex-1 bg-cover bg-center relative" 
                  style={{ backgroundImage: `url(${cards[0].img})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <div className="bg-primary/90 text-xs uppercase px-2 py-1 rounded inline-block mb-2 font-bold">
                      {cards[0].category}
                    </div>
                    <h2 className="text-2xl font-serif font-bold mb-1">{cards[0].name}</h2>
                    <div className="flex items-center gap-1 text-sm text-white/80 mb-1">
                      <MapPin size={14} /> {cards[0].producer?.country || 'Bolivia'}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-surface">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Package size={16} /> <span>FOB: {cards[0].price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Award size={16} /> <span>{cards[0].cert}</span>
                    </div>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex justify-center gap-6 mt-4">
                    <button 
                      onClick={() => handleSwipe("left")}
                      className="w-14 h-14 bg-surface rounded-full shadow-soft-md border border-border flex items-center justify-center text-tertiary hover:bg-tertiary/10 transition-colors"
                    >
                      <X size={28} />
                    </button>
                    <button 
                      onClick={() => handleSwipe("right")}
                      className="w-14 h-14 bg-primary rounded-full shadow-soft-md flex items-center justify-center text-white hover:bg-primary-hover transition-colors"
                    >
                      <Heart size={28} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-surface rounded-3xl border border-border">
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-text-muted mb-4">
                  <Search size={32} />
                </div>
                <h2 className="text-xl font-bold text-text-dark mb-2">No hay más perfiles</h2>
                <p className="text-text-muted">Vuelve más tarde para descubrir nuevos productores.</p>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
