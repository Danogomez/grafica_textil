import { Link } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext"

const API = "http://localhost:5000"

export default function Carrito() {
  const { items, quitar, total, cantidad } = useCarrito()

  if (cantidad === 0) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 pt-16">
      <p className="text-6xl">🛒</p>
      <h2 className="text-2xl font-light">Tu carrito está vacío</h2>
      <Link to="/eventos" className="text-red-500 hover:text-red-400 transition">
        Ver eventos →
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-20 pb-20">
      <h1 className="text-4xl font-light tracking-tight mb-12">Tu carrito</h1>

      <div className="grid md:grid-cols-3 gap-12">

        {/* Lista de fotos */}
        <div className="md:col-span-2 space-y-4">
          {items.map(foto => (
            <div key={foto.id} className="flex gap-4 border border-white/10 rounded-lg p-4">
              <img
                src={`${API}${foto.url}`}
                alt="foto"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-400">{foto.evento_nombre || "Evento"}</p>
                <p className="text-white font-semibold">${foto.precio}</p>
                <p className="text-gray-500 text-xs mt-1">Descarga digital en alta resolución</p>
              </div>
              <button
                onClick={() => quitar(foto.id)}
                className="text-gray-500 hover:text-red-500 transition text-sm self-start"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="border border-white/10 rounded-xl p-6 h-fit space-y-4">
          <h3 className="text-lg font-light">Resumen</h3>
          <div className="flex justify-between text-gray-400">
            <span>{cantidad} foto{cantidad > 1 ? "s" : ""}</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold transition"
          >
            Continuar al pago →
          </Link>
        </div>

      </div>
    </div>
  )
}
