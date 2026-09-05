"use client";

import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useEffect, useState } from "react";
import { MessageSquare, FileText, Calculator, X } from "lucide-react";

export default function ChatPage() {
  const { user, isLoading } = useAuth();
  const { formatPrice, localCurrencyName } = useCurrency();
  
  const [matches, setMatches] = useState<any[]>([]);
  const [activeMatch, setActiveMatch] = useState<any>(null);
  
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  
  // Modals
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  
  // Simulator states
  const [qty, setQty] = useState(500);
  const [unitPrice, setUnitPrice] = useState(10);
  const [freight, setFreight] = useState(200);

  useEffect(() => {
    if (!isLoading) {
      if (!user) window.location.href = "/login";
      else fetchMatches();
    }
  }, [user, isLoading]);

  const fetchMatches = async () => {
    if (!user) return;
    const res = await fetch(`/api/matches?userId=${user.id}&role=${user.role}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      setMatches(data);
      if (data.length > 0) handleSelectMatch(data[0]);
    }
  };

  const handleSelectMatch = async (match: any) => {
    setActiveMatch(match);
    const res = await fetch(`/api/messages?matchId=${match.id}`);
    const data = await res.json();
    if (Array.isArray(data)) setMessages(data);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeMatch || !user) return;

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        matchId: activeMatch.id,
        senderId: user.id,
        text: newMessage
      })
    });
    
    if (res.ok) {
      const msg = await res.json();
      setMessages([...messages, msg]);
      setNewMessage("");
    }
  };

  if (isLoading || !user) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background p-4 md:p-8 flex flex-col items-center">
      <div className="container-max max-w-5xl w-full bg-surface shadow-soft-md rounded-2xl border border-border/50 h-[80vh] flex overflow-hidden">
        
        {/* Lista de Matches (Sidebar) */}
        <div className="w-1/3 border-r border-border bg-surface-container hidden md:flex flex-col">
          <div className="p-4 border-b border-border bg-surface">
            <h2 className="font-bold text-lg text-text-dark">Tus Matches</h2>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-2">
            {matches.length === 0 ? (
              <p className="text-sm text-text-muted text-center mt-10">No tienes matches aún.</p>
            ) : (
              matches.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => handleSelectMatch(m)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${activeMatch?.id === m.id ? 'bg-primary/10 border-primary' : 'bg-surface border-border hover:border-primary/50'}`}
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    {user.role === 'productor' ? m.buyer.name[0] : m.producer.name[0]}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-sm text-text-dark truncate">
                      {user.role === 'productor' ? m.buyer.name : m.producer.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">Producto: {m.product.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Área de Chat */}
        {activeMatch ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Header del Chat */}
            <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  {user.role === 'productor' ? activeMatch.buyer.name[0] : activeMatch.producer.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-text-dark">
                    {user.role === 'productor' ? activeMatch.buyer.name : activeMatch.producer.name}
                  </h3>
                  <p className="text-xs text-primary">Interesado en: {activeMatch.product.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsSimulatorOpen(true)} className="p-2 text-text-muted hover:text-primary transition-colors bg-surface-container rounded-lg" title="Simulador de Costos">
                  <Calculator size={20} />
                </button>
                <button onClick={() => setIsAgreementOpen(true)} className="p-2 text-text-muted hover:text-primary transition-colors bg-surface-container rounded-lg" title="Plantilla de Acuerdo">
                  <FileText size={20} />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#faf5ee]/30 flex flex-col gap-4">
              <div className="text-center text-xs text-text-muted mb-4">
                La traducción automática está activada (ES ↔ EN)
              </div>
              
              {messages.map(msg => (
                <div key={msg.id} className={`max-w-[80%] ${msg.senderId === user.id ? 'self-end' : 'self-start'}`}>
                  <div className={`${msg.senderId === user.id ? 'bg-primary text-white rounded-tr-sm' : 'bg-surface border border-border text-text-dark rounded-tl-sm'} p-3 rounded-2xl shadow-sm text-sm break-words`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-surface border-t border-border">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..." 
                  className="flex-1 bg-surface-container border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <button type="submit" className="bg-primary text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-hover disabled:opacity-50">
                  <MessageSquare size={18} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#faf5ee]/30 text-text-muted">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>Selecciona un match para comenzar a chatear</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {isSimulatorOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-6 w-full max-w-md shadow-soft-lg border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-serif flex items-center gap-2"><Calculator size={24} className="text-primary"/> Simulador de Costos</h3>
              <button onClick={() => setIsSimulatorOpen(false)} className="text-text-muted hover:text-text-dark"><X /></button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold mb-1">Cantidad a Exportar (Unidades/Kg)</label>
                <input type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} className="w-full border rounded-xl p-2" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Costo por Unidad (USD)</label>
                <input type="number" value={unitPrice} onChange={e=>setUnitPrice(Number(e.target.value))} className="w-full border rounded-xl p-2" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Flete Internacional Estimado (USD)</label>
                <input type="number" value={freight} onChange={e=>setFreight(Number(e.target.value))} className="w-full border rounded-xl p-2" />
              </div>
              <hr className="my-2"/>
              <div className="bg-surface-container p-4 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span>Subtotal FOB:</span>
                  <span className="font-bold">{formatPrice(qty * unitPrice)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Flete:</span>
                  <span className="font-bold">{formatPrice(freight)}</span>
                </div>
                <div className="flex justify-between text-lg text-primary mt-2 pt-2 border-t border-border">
                  <span className="font-bold">Total Estimado CIF:</span>
                  <span className="font-bold">{formatPrice((qty * unitPrice) + freight)}</span>
                </div>
              </div>
              <p className="text-xs text-text-muted text-center mt-2">Valores mostrados en su moneda local configurada si aplica.</p>
            </div>
          </div>
        </div>
      )}

      {isAgreementOpen && activeMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-8 w-full max-w-2xl shadow-soft-lg border border-border h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-serif flex items-center gap-2"><FileText size={24} className="text-primary"/> Plantilla de Acuerdo B2B</h3>
              <button onClick={() => setIsAgreementOpen(false)} className="text-text-muted hover:text-text-dark"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto bg-surface-container p-6 rounded-xl text-sm font-mono border border-border whitespace-pre-wrap">
{`CONTRATO DE COMPRAVENTA INTERNACIONAL

VENDEDOR (Productor): ${activeMatch.producer.name}
COMPRADOR: ${activeMatch.buyer.name}
PRODUCTO: ${activeMatch.product.name}

1. OBJETO DEL CONTRATO
El VENDEDOR se compromete a entregar el PRODUCTO mencionado, cumpliendo con los estándares de calidad y certificaciones vigentes, y el COMPRADOR se compromete a recibirlo y pagar el precio acordado.

2. PRECIO Y CONDICIONES DE PAGO
El precio unitario y el volumen total serán definidos en la Orden de Compra oficial. El pago se realizará mediante transferencia bancaria internacional u otro medio seguro acordado (ej. Carta de Crédito).

3. CONDICIONES DE ENTREGA (INCOTERMS 2020)
Las partes acuerdan que la entrega se realizará bajo el término FOB (Free On Board) o CIF (Cost, Insurance and Freight), a convenir en la negociación final del chat.

4. RESOLUCIÓN DE CONFLICTOS
Las partes intentarán resolver cualquier disputa de buena fe. En caso de no llegar a un acuerdo, se someterán al arbitraje de la Cámara de Comercio Internacional.

Firmado digitalmente a través de MatchCargo el ${new Date().toLocaleDateString()}.`}
            </div>
            <button onClick={() => {alert("Acuerdo exportado (Simulación)"); setIsAgreementOpen(false);}} className="w-full btn-primary py-3 mt-4">
              Exportar a PDF
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
