"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, TrendingUp, Eye, Heart, Plus, X } from "lucide-react";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formularios
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Café y Cacao");
  const [price, setPrice] = useState("");
  const [cert, setCert] = useState("");
  const [img, setImg] = useState("");

  const fetchProducts = async () => {
    if (!user) return;
    const res = await fetch(`/api/products?excludeProducerId=xyz`); // Por ahora bajamos todo y filtramos o cambiamos la API para buscar por userId
    // Actually, we can fetch all and filter by producerId since this is a simple prototype
    const data = await res.json();
    if (Array.isArray(data)) {
      setProducts(data.filter(p => p.producerId === user.id));
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) window.location.href = "/login";
      else if (user.role !== "productor") window.location.href = "/descubrir";
      else fetchProducts();
    }
  }, [user, isLoading]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        producerId: user.id,
        name,
        category,
        price,
        cert,
        img: img || "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80"
      })
    });

    setIsModalOpen(false);
    fetchProducts();
    setName(""); setPrice(""); setCert(""); setImg("");
  };

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container-max max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-text-dark mb-2">Hola, {user.name}</h1>
        <p className="text-text-muted mb-8">Este es tu panel de control de Productor.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-surface p-6 rounded-2xl shadow-soft border border-border/40">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <Eye /> <span className="font-semibold">Vistas del Catálogo</span>
            </div>
            <p className="text-3xl font-bold text-text-dark">142</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface p-6 rounded-2xl shadow-soft border border-border/40">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <Heart /> <span className="font-semibold">Matches Activos</span>
            </div>
            <p className="text-3xl font-bold text-text-dark">3</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface p-6 rounded-2xl shadow-soft border border-border/40">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <TrendingUp /> <span className="font-semibold">Potencial</span>
            </div>
            <p className="text-3xl font-bold text-text-dark">{formatPrice(1400)}</p>
          </motion.div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-text-dark">Tu Catálogo</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary py-2 px-4 flex items-center gap-2">
            <Plus size={18} /> Añadir Producto
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-surface rounded-2xl shadow-soft border border-border/40 p-10 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2">Aún no tienes productos</h3>
            <p className="text-text-muted mb-6">Sube fotos, volumen y precios para que los compradores te encuentren.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">Añadir Producto</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-surface rounded-2xl shadow-soft border border-border/40 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="text-xs uppercase bg-primary/10 text-primary font-bold px-2 py-1 rounded inline-block mb-2">
                    {p.category}
                  </div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-text-muted mb-2">Cert: {p.cert}</p>
                  <p className="font-semibold">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de añadir producto */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-3xl p-6 w-full max-w-md shadow-soft-lg border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold font-serif">Nuevo Producto</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-dark">
                  <X />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nombre del producto</label>
                  <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full border rounded-xl p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Categoría</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border rounded-xl p-2">
                    <option>Café y Cacao</option>
                    <option>Textiles</option>
                    <option>Alimentos Artesanales</option>
                    <option>Artesanías</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Precio y Volumen (ej. $5.00 / kg)</label>
                  <input required value={price} onChange={e=>setPrice(e.target.value)} type="text" className="w-full border rounded-xl p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Certificaciones (ej. Orgánico)</label>
                  <input required value={cert} onChange={e=>setCert(e.target.value)} type="text" className="w-full border rounded-xl p-2" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">URL de Imagen (Opcional)</label>
                  <input value={img} onChange={e=>setImg(e.target.value)} type="text" className="w-full border rounded-xl p-2" placeholder="https://..." />
                </div>
                <button type="submit" className="w-full btn-primary py-2 mt-4">Guardar Producto</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
