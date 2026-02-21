import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useCarrito } from "../context/CarritoContext"

const API = "http://localhost:5000"

export default function Checkout() {
  const { items, total, limpiar } = useCarrito()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: "", email: "" })
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre || !form.email) {
      setError("Completá todos los campos")
      return
    }
    setCargando(true)
    setError("")

    try {
      const res = await axios.post(`${API}/api/ordenes`, {
        nombre: form.nombre,
        email: form.email,
        items: items.map(i => ({ foto_id: i.id, precio: i.precio })),
      })

      // Modo test: confirmamos el pago automáticamente
      await axios.post(`${API}/api/ordenes/${res.data.orden_id}/confirmar`)

      limpiar()
      navigate(`/orden-confirmada/${res.data.orden_id}`)
    } catch (err) {
      setError("Hubo un error al procesar el pedido. Intentá de nuevo.")
      setCargando(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16">
        <p className="text-gray-400">No hay fotos en el carrito.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-20 pb-20">
      <h1 className="text-4xl font-light tracking-tight mb-12">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl">

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nombre completo</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition"
              placeholder="tu@email.com"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Modo test info */}
          <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
            <p className="text-yellow-400 text-sm font-semibold">⚡ Modo test activo</p>
            <p className="text-yellow-300/70 text-xs mt-1">
              El pago se procesa automáticamente sin pasarela real. Las fotos estarán disponibles para descarga inmediatamente.
            </p>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-4 rounded-lg font-semibold text-lg transition"
          >
            {cargando ? "Procesando..." : `Confirmar compra · $${total.toLocaleString("es-AR")}`}
          </button>
        </form>

        {/* Resumen de fotos */}
        <div className="space-y-3">
          <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Tu pedido</h3>
          {items.map(foto => (
            <div key={foto.id} className="flex justify-between text-sm border-b border-white/5 pb-2">
              <span className="text-gray-400">Foto #{foto.id}</span>
              <span className="text-white">${foto.precio}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
