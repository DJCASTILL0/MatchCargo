import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-text-dark text-white/70">
      <div className="container-max px-5 py-12 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo & Info */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg">
                <Image
                  src="/logo.jpeg"
                  alt="MatchCargo Cubito Logo"
                  width={30}
                  height={30}
                  className="rounded object-cover"
                />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                MatchCargo Cubito
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Plataforma B2B de conexión directa entre productores locales y
              compradores internacionales.
            </p>
          </div>

          {/* Links: Plataforma */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider font-semibold mb-5">
              Plataforma
            </h4>
            <ul className="space-y-3 flex flex-col">
              <li>
                <a href="#inicio" className="text-white/60 hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#como-funciona" className="text-white/60 hover:text-white transition-colors">Cómo Funciona</a>
              </li>
              <li>
                <a href="#categorias" className="text-white/60 hover:text-white transition-colors">Categorías</a>
              </li>
              <li>
                <a href="#caracteristicas" className="text-white/60 hover:text-white transition-colors">Características</a>
              </li>
            </ul>
          </div>

          {/* Links: Proyecto */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider font-semibold mb-5">
              Proyecto
            </h4>
            <ul className="space-y-3 flex flex-col">
              <li>
                <a href="#equipo" className="text-white/60 hover:text-white transition-colors">Sobre el Proyecto</a>
              </li>
              <li>
                <span className="text-white/40 cursor-default">Business Tech Challenge 2026</span>
              </li>
              <li>
                <a href="#contacto" className="text-white/60 hover:text-white transition-colors">Contacto</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            © 2026 MatchCargo Cubito. Todos los derechos reservados.
          </p>
          <p className="text-sm text-white/40 text-center md:text-right">
            Hecho con ❤️ en Bolivia
          </p>
        </div>
      </div>
    </footer>
  );
}
