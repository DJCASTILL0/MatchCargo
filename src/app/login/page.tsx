"use client";

import { useState } from "react";
import { useAuth, Role } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Package, Globe } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("productor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email, password } 
        : { name, email, password, role: selectedRole };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Hubo un error');
      }

      login(data.user);
      window.location.href = data.user.role === "productor" ? "/dashboard" : "/descubrir";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface shadow-soft-lg rounded-3xl p-8 max-w-md w-full border border-border/40"
      >
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo.jpeg" alt="Logo" width={60} height={60} className="rounded-xl mb-4" />
          <h1 className="font-serif text-3xl font-bold text-text-dark">
            {isLogin ? "Bienvenido" : "Crea tu cuenta"}
          </h1>
          <p className="text-text-muted text-center mt-2">
            Conectando el mercado local con el internacional
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Selecciona tu rol</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("productor")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      selectedRole === "productor" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border text-text-muted hover:border-primary/50"
                    }`}
                  >
                    <Package size={24} />
                    <span className="font-medium text-sm">Productor Local</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("comprador")}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      selectedRole === "comprador" 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-border text-text-muted hover:border-primary/50"
                    }`}
                  >
                    <Globe size={24} />
                    <span className="font-medium text-sm">Comprador Int.</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">Nombre o Empresa</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary bg-white text-text-dark"
                  placeholder="Tu nombre"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary bg-white text-text-dark"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-dark mb-2">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-primary bg-white text-text-dark"
              placeholder="••••••••"
            />
          </div>

          <button disabled={loading} type="submit" className="w-full btn-primary py-3 text-lg mt-2">
            {loading ? "Cargando..." : (isLogin ? "Ingresar" : "Registrarse")}
          </button>
          
          <p className="text-sm text-text-muted text-center mt-4 cursor-pointer hover:text-primary transition" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
