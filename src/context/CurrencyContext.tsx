"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CurrencyType = "USD" | "LOCAL";

interface CurrencyContextType {
  currency: CurrencyType;
  exchangeRate: number; // Tasa respecto al dólar (ej: 1 USD = 6.96 BOB)
  localCurrencyName: string; // ej: "BOB"
  setCurrency: (c: CurrencyType) => void;
  setExchangeRate: (rate: number) => void;
  setLocalCurrencyName: (name: string) => void;
  formatPrice: (priceInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(6.96);
  const [localCurrencyName, setLocalCurrencyName] = useState<string>("BOB");

  const formatPrice = (priceInUSD: number) => {
    if (currency === "USD") {
      return `$${priceInUSD.toFixed(2)} USD`;
    } else {
      return `${(priceInUSD * exchangeRate).toFixed(2)} ${localCurrencyName}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{
      currency, setCurrency, exchangeRate, setExchangeRate, localCurrencyName, setLocalCurrencyName, formatPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency debe usarse dentro de un CurrencyProvider");
  }
  return context;
}
