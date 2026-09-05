"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";
import AppNavbar from "@/components/AppNavbar";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // No mostrar AppNavbar en la landing page ni en el login
  const isPublicRoute = pathname === "/" || pathname === "/login";

  return (
    <AuthProvider>
      {!isPublicRoute && <AppNavbar />}
      <div className={!isPublicRoute ? "pb-16 md:pb-0" : ""}>
        {children}
      </div>
    </AuthProvider>
  );
}
