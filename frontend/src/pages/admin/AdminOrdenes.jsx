import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("fotovega_admin_token")}` }
}

const estadoColor = {
  pendiente: "bg-yellow-500/20 text-yellow-400",
  pagado: "bg-green-500/20 text-green-400",
  cancelado: "bg-red-500/20 text-red-400",
}

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/admin/ordenes`, { headers: authHeader() })
      .then(res => { setOrdenes(res.data); setCargando(false) })
      .catch(() => setCargando(false))
  }, [])

  const totalVendido = ordenes
    .filter(o => o.estado === "pagado")
    .reduce((sum, o) => sum + parseFloat(o.total), 0)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-8 h-16 flex items-center gap-4">
        <Link to="/admin/dashboard" className="text-gray-500 hover:text-white text-sm transition">← Dashboard</Link>
        <h1 className="font-light tracking-widest">Órdenes</h1>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="border border-white/10 rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total órdenes</p>
            <p className="text-3xl font-light mt-1">{ordenes.length}</p>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <p className="text-gray-500 text-sm">Órdenes pagadas</p>
            <p className="text-3xl font-light mt-1">{ordenes.filter(o => o.estado === "pagado").length}</p>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total vendido</p>
            <p className="text-3xl font-light mt-1">${totalVendido.toLocaleString("es-AR")}</p>
          </div>
        </div>

        {/* Tabla */}
        {cargando ? (
          <p className="text-gray-500 animate-pulse">Cargando órdenes...</p>
        ) : ordenes.length === 0 ? (
          <p className="text-gray-500">Todavía no hay órdenes.</p>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-5 text-xs text-gray-500 uppercase tracking-widest px-4 pb-2">
              <span>Orden</span>
              <span>Cliente</span>
              <span>Email</span>
              <span>Total</span>
              <span>Estado</span>
            </div>
            {ordenes.map(orden => (
              <div key={orden.id} className="grid grid-cols-5 items-center border border-white/10 rounded-xl px-4 py-3 text-sm">
                <span className="text-gray-400">#{orden.id}</span>
                <span>{orden.nombre_comprador || "—"}</span>
                <span className="text-gray-400 truncate">{orden.email_comprador}</span>
                <span className="font-semibold">${parseFloat(orden.total).toLocaleString("es-AR")}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs w-fit ${estadoColor[orden.estado] || "bg-white/10 text-white"}`}>
                  {orden.estado}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
