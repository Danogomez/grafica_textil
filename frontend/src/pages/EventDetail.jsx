import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useCarrito } from "../context/CarritoContext"

const API = "http://localhost:5000"

export default function EventDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const { agregar, items } = useCarrito()

  useEffect(() => {
    axios.get(`${API}/api/eventos/${id}`)
      .then(res => { setData(res.data); setCargando(false) })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white text-xl animate-pulse">Cargando...</p>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Evento no encontrado</p>
    </div>
  )

  const { evento, fotos } = data

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-6 md:px-20 pb-20">

      {/* Header del evento */}
      <div className="mb-16">
        <Link to="/eventos" className="text-gray-500 text-sm hover:text-white transition mb-4 block">
          ← Volver a eventos
        </Link>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">{evento.nombre}</h1>
        {evento.fecha && (
          <p className="text-gray-500 mt-2">
            {new Date(evento.fecha).toLocaleDateString("es-AR", {
              day: "numeric", month: "long", year: "numeric"
            })} — {evento.lugar}
          </p>
        )}
        {evento.descripcion && (
          <p className="text-gray-400 mt-4 max-w-xl">{evento.descripcion}</p>
        )}
      </div>

      {/* Grilla de fotos */}
      {fotos.length === 0 ? (
        <p className="text-gray-500">Próximamente se subirán las fotos de este evento.</p>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {fotos.map(foto => {
            const enCarrito = items.find(i => i.id === foto.id)
            return (
              <div key={foto.id} className="break-inside-avoid relative group">
                <img
                  src={`${API}${foto.url}`}
                  alt={foto.descripcion || "Foto del evento"}
                  className="w-full object-cover"
                />

                {/* Overlay al hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-end pb-4 gap-2">
                  <p className="text-white font-bold text-lg">${foto.precio}</p>
                  <button
                    onClick={() => agregar(foto)}
                    disabled={!!enCarrito}
                    className={`px-4 py-2 text-sm font-semibold rounded transition ${
                      enCarrito
                        ? "bg-green-700 text-white cursor-default"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {enCarrito ? "✓ En carrito" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
