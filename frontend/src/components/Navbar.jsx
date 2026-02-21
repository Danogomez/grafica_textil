import { Link } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext"

export default function NavBar() {
  const { cantidad } = useCarrito()

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="text-white font-light tracking-widest text-lg">
          FOTOVEGA<span className="text-red-500">23</span>
        </Link>

        <div className="flex items-center gap-8 text-sm text-gray-400">
          <Link to="/eventos" className="hover:text-white transition">Eventos</Link>
          <Link to="/contacto" className="hover:text-white transition">Contacto</Link>

          <Link to="/carrito" className="relative hover:text-white transition">
            <span>🛒</span>
            {cantidad > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cantidad}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}
