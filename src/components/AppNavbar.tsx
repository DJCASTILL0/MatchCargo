"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { LogOut, LayoutDashboard, Search, MessageSquare, DollarSign, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { currency, setCurrency, exchangeRate, setExchangeRate, localCurrencyName, setLocalCurrencyName } = useCurrency();
  const pathname = usePathname();
  
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [tempRate, setTempRate] = useState(exchangeRate.toString());
  const [tempName, setTempName] = useState(localCurrencyName);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleSaveCurrency = (e: React.FormEvent) => {
    e.preventDefault();
    setExchangeRate(parseFloat(tempRate));
    setLocalCurrencyName(tempName);
    setCurrency("LOCAL");
    setIsCurrencyModalOpen(false);
  };

  const toggleCurrency = () => {
    if (currency === "USD") {
      setIsCurrencyModalOpen(true);
    } else {
      setCurrency("USD");
    }
  };

  const navItems = user.role === "productor" 
    ? [
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Mensajes", href: "/chat", icon: <MessageSquare size={20} /> },
      ]
    : [
        { name: "Descubrir", href: "/descubrir", icon: <Search size={20} /> },
        { name: "Matches", href: "/chat", icon: <MessageSquare size={20} /> },
      ];

  return (
    <>
      <nav className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="container-max px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif font-bold text-xl text-primary">
              MatchCargo
            </Link>
            
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-surface-container"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCurrency}
              className="flex items-center gap-1 text-sm font-bold bg-surface-container px-3 py-1.5 rounded-full border border-border hover:border-primary transition-colors text-text-dark"
              title="Cambiar Moneda"
            >
              <DollarSign size={16} className="text-primary" />
              {currency === "USD" ? "USD" : localCurrencyName}
            </button>
            <div className="text-sm text-right hidden sm:block">
              <p className="font-bold text-text-dark">{user.name}</p>
              <p className="text-xs text-text-muted capitalize">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-text-muted hover:text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex border-t border-border bg-surface fixed bottom-0 w-full z-40 pb-safe">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium ${
                  isActive ? "text-primary" : "text-text-muted"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Modal Moneda Local */}
      {isCurrencyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-6 w-full max-w-sm shadow-soft-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-serif">Configurar Moneda Local</h3>
              <button onClick={() => setIsCurrencyModalOpen(false)} className="text-text-muted hover:text-text-dark">
                <X />
              </button>
            </div>
            <form onSubmit={handleSaveCurrency} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre Moneda (ej. BOB)</label>
                <input required value={tempName} onChange={e=>setTempName(e.target.value)} type="text" className="w-full border rounded-xl p-2" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Valor de 1 USD (Tasa de Cambio)</label>
                <input required value={tempRate} onChange={e=>setTempRate(e.target.value)} type="number" step="0.01" className="w-full border rounded-xl p-2" />
              </div>
              <button type="submit" className="w-full btn-primary py-2 mt-4">Aplicar Cambio Global</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
