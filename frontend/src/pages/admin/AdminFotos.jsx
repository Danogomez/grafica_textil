import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("fotovega_admin_token")}` }
}

export default function AdminFotos() {
  const { id } = useParams()
  const [fotos, setFotos] = useState([])
  const [evento, setEvento] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [archivos, setArchivos] = useState([])
  const [precio, setPrecio] = useState("2000")
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)

  useEffect(() => { cargarDatos() }, [id])

  async function cargarDatos() {
    try {
      const [fotosRes, eventoRes] = await Promise.all([
        axios.get(`${API}/api/admin/eventos/${id}/fotos`, { headers: authHeader() }),
        axios.get(`${API}/api/eventos/${id}`)
      ])
      setFotos(fotosRes.data)
      setEvento(eventoRes.data.evento)
    } finally {
      setCargando(false)
    }
  }

  async function subirFotos(e) {
    e.preventDefault()
    if (archivos.length === 0) return
    setSubiendo(true)
    setProgreso(0)

    for (let i = 0; i < archivos.length; i++) {
      const data = new FormData()
      data.append("foto", archivos[i])
      data.append("evento_id", id)
      data.append("precio", precio)
      try {
        await axios.post(`${API}/api/admin/fotos`, data, { headers: authHeader() })
      } catch (err) {
        console.error("Error subiendo foto", archivos[i].name)
      }
      setProgreso(Math.round(((i + 1) / archivos.length) * 100))
    }

    setArchivos([])
    setSubiendo(false)
    cargarDatos()
  }

  async function eliminarFoto(fotoId) {
    if (!confirm("¿Eliminar esta foto?")) return
    await axios.delete(`${API}/api/admin/fotos/${fotoId}`, { headers: authHeader() })
    cargarDatos()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-8 h-16 flex items-center gap-4">
        <Link to="/admin/eventos" className="text-gray-500 hover:text-white text-sm transition">← Eventos</Link>
        <h1 className="font-light tracking-widest">
          {evento ? evento.nombre : "Fotos del evento"}
        </h1>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Subir fotos */}
        <form onSubmit={subirFotos} className="border border-white/10 rounded-xl p-6 mb-10">
          <h3 className="text-lg font-light mb-4">Subir fotos</h3>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-60">
              <label className="block text-gray-500 text-xs mb-2">Seleccionar fotos (múltiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => setArchivos(Array.from(e.target.files))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400"
              />
            </div>
            <div className="w-36">
              <label className="block text-gray-500 text-xs mb-2">Precio por foto ($)</label>
              <input
                type="number"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={subiendo || archivos.length === 0}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-6 py-3 rounded-lg text-sm font-semibold transition"
            >
              {subiendo ? `Subiendo... ${progreso}%` : `Subir ${archivos.length > 0 ? archivos.length + " fotos" : ""}`}
            </button>
          </div>

          {subiendo && (
            <div className="mt-4 bg-white/5 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: `${progreso}%` }}
              />
            </div>
          )}
        </form>

        {/* Grilla de fotos */}
        {cargando ? (
          <p className="text-gray-500 animate-pulse">Cargando fotos...</p>
        ) : fotos.length === 0 ? (
          <p className="text-gray-500">No hay fotos todavía. Subí algunas arriba.</p>
        ) : (
          <div className="columns-2 md:columns-4 lg:columns-5 gap-2 space-y-2">
            {fotos.map(foto => (
              <div key={foto.id} className="break-inside-avoid relative group">
                <img
                  src={`${API}${foto.url}`}
                  alt=""
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                  <p className="text-white text-sm font-bold">${foto.precio}</p>
                  <button
                    onClick={() => eliminarFoto(foto.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition"
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
