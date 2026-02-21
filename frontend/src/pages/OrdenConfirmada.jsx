import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

export default function OrdenConfirmada() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/ordenes/${id}`)
      .then(res => { setData(res.data); setCargando(false) })
      .catch(() => setCargando(false))
  }, [id])

  if (cargando) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white animate-pulse">Cargando tu orden...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-20 pb-20">

      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-light mb-4">¡Compra confirmada!</h1>
        <p className="text-gray-400">
          Tus fotos están disponibles para descargar. Guardá esta página o el número de orden.
        </p>
        <p className="text-gray-600 text-sm mt-2">Orden #{id}</p>
      </div>

      {data && (
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-lg font-light text-gray-300 mb-6">Tus fotos</h2>

          {data.items.map(item => (
            <div key={item.id} className="flex items-center gap-6 border border-white/10 rounded-xl p-4">
              <img
                src={`${API}${item.url}`}
                alt="foto"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-400">{item.evento_nombre}</p>
                <p className="text-white text-sm">Foto #{item.foto_id}</p>
              </div>
              <a
                href={`${API}${item.url_alta || item.url}`}
                download
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                ⬇ Descargar
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-16">
        <Link to="/eventos" className="text-gray-500 hover:text-white transition text-sm">
          ← Volver a eventos
        </Link>
      </div>

    </div>
  )
}
