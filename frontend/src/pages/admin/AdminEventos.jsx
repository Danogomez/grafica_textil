import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("fotovega_admin_token")}` }
}

export default function AdminEventos() {
  const navigate = useNavigate()
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState({ nombre: "", descripcion: "", fecha: "", lugar: "" })
  const [imagen, setImagen] = useState(null)
  const [guardando, setGuardando] = useState(false)

  useEffect(() => { cargarEventos() }, [])

  async function cargarEventos() {
    try {
      const res = await axios.get(`${API}/api/admin/eventos`, { headers: authHeader() })
      setEventos(res.data)
    } catch {
      navigate("/admin")
    } finally {
      setCargando(false)
    }
  }

  async function crearEvento(e) {
    e.preventDefault()
    setGuardando(true)
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (imagen) data.append("imagen", imagen)
    try {
      await axios.post(`${API}/api/admin/eventos`, data, { headers: authHeader() })
      setForm({ nombre: "", descripcion: "", fecha: "", lugar: "" })
      setImagen(null)
      setMostrarForm(false)
      cargarEventos()
    } catch (err) {
      alert("Error al crear evento")
    } finally {
      setGuardando(false)
    }
  }

  async function eliminarEvento(id) {
    if (!confirm("¿Eliminar este evento y todas sus fotos?")) return
    await axios.delete(`${API}/api/admin/eventos/${id}`, { headers: authHeader() })
    cargarEventos()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-gray-500 hover:text-white text-sm transition">← Dashboard</Link>
          <h1 className="font-light tracking-widest">Eventos</h1>
        </div>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          + Nuevo evento
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Formulario nuevo evento */}
        {mostrarForm && (
          <form onSubmit={crearEvento} className="border border-white/10 rounded-xl p-6 mb-10 space-y-4">
            <h3 className="text-lg font-light mb-2">Nuevo evento</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Nombre del evento"
                value={form.nombre}
                onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                required
              />
              <input
                placeholder="Lugar"
                value={form.lugar}
                onChange={e => setForm(p => ({ ...p, lugar: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="date"
                value={form.fecha}
                onChange={e => setForm(p => ({ ...p, fecha: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={e => setImagen(e.target.files[0])}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400"
              />
            </div>
            <textarea
              placeholder="Descripción (opcional)"
              value={form.descripcion}
              onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))}
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
            />
            <div className="flex gap-3">
              <button type="submit" disabled={guardando} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-6 py-2 rounded-lg text-sm font-semibold transition">
                {guardando ? "Guardando..." : "Crear evento"}
              </button>
              <button type="button" onClick={() => setMostrarForm(false)} className="text-gray-500 hover:text-white text-sm transition">
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Lista de eventos */}
        {cargando ? (
          <p className="text-gray-500 animate-pulse">Cargando...</p>
        ) : (
          <div className="space-y-3">
            {eventos.map(evento => (
              <div key={evento.id} className="flex items-center gap-4 border border-white/10 rounded-xl p-4">
                {evento.imagen_portada && (
                  <img
                    src={`${API}${evento.imagen_portada}`}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt=""
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{evento.nombre}</p>
                  <p className="text-gray-500 text-sm">{evento.lugar} · {evento.cantidad_fotos} fotos</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/admin/eventos/${evento.id}/fotos`}
                    className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition"
                  >
                    📸 Gestionar fotos
                  </Link>
                  <button
                    onClick={() => eliminarEvento(evento.id)}
                    className="text-red-500/50 hover:text-red-500 text-xs transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
