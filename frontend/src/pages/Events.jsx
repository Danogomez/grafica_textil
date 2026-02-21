import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

export default function Events() {
  const [eventos, setEventos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/eventos`)
      .then(res => { setEventos(res.data); setCargando(false) })
      .catch(() => setCargando(false))
  }, [])

  if (cargando) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white animate-pulse text-xl">Cargando eventos...</p>
    </div>
  )

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-24">
      <div className="mb-20">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight">Eventos</h1>
        <p className="text-gray-500 mt-4 text-lg">Coberturas de competencias de karting.</p>
      </div>

      {eventos.length === 0 ? (
        <p className="text-gray-500">Próximamente se publicarán los eventos.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {eventos.map(evento => (
            <Link key={evento.id} to={`/eventos/${evento.id}`} className="group">
              <div className="overflow-hidden">
                <img
                  src={evento.imagen_portada ? `${API}${evento.imagen_portada}` : "/fotos/1.png"}
                  alt={evento.nombre}
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-light tracking-wide">{evento.nombre}</h3>
                {evento.fecha && (
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(evento.fecha).toLocaleDateString("es-AR", {
                      day: "numeric", month: "long", year: "numeric"
                    })} — {evento.lugar}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
