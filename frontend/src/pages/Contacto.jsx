import { useState } from 'react'
import axios from 'axios'

function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)
    try {
      await axios.post('https://grafica-textil-backend.onrender.com/api/contacto', form)
      setEnviado(true)
    } catch (err) {
      setError(true)
    }
    setCargando(false)
  }

  if (enviado) return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
        <div className="text-7xl mb-6">✅</div>
        <h2 className="text-3xl font-black text-blue-900 mb-3">Mensaje enviado!</h2>
        <p className="text-gray-500 mb-8">Gracias por contactarnos. Te respondemos a la brevedad.</p>
        <button
          onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', telefono: '', mensaje: '' }) }}
          className="bg-blue-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white text-center py-20 px-8">
        <p className="text-blue-300 uppercase tracking-widest text-sm mb-2 font-semibold">Estamos para ayudarte</p>
        <h1 className="text-5xl font-black">Contacto</h1>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Info de contacto */}
        <div>
          <h2 className="text-3xl font-black text-blue-900 mb-4">Hablemos</h2>
          <p className="text-gray-500 mb-10">Completá el formulario y nos ponemos en contacto a la brevedad. También podés comunicarte por cualquiera de estos medios.</p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-900 text-white text-xl rounded-xl w-12 h-12 flex items-center justify-center">📍</div>
              <div>
                <p className="font-bold text-blue-900">Dirección</p>
                <p className="text-gray-500">Buenos Aires, Argentina</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900 text-white text-xl rounded-xl w-12 h-12 flex items-center justify-center">📞</div>
              <div>
                <p className="font-bold text-blue-900">Teléfono</p>
                <p className="text-gray-500">+54 11 1234-5678</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900 text-white text-xl rounded-xl w-12 h-12 flex items-center justify-center">✉️</div>
              <div>
                <p className="font-bold text-blue-900">Email</p>
                <p className="text-gray-500">info@graficatextil.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900 text-white text-xl rounded-xl w-12 h-12 flex items-center justify-center">🕐</div>
              <div>
                <p className="font-bold text-blue-900">Horario</p>
                <p className="text-gray-500">Lunes a Viernes 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-black text-blue-900 mb-6">Envianos un mensaje</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-blue-900 mb-1 block">Nombre *</label>
              <input
                className="w-full border-2 border-blue-100 focus:border-blue-900 rounded-xl px-4 py-3 text-gray-700 focus:outline-none transition-colors"
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                onChange={handleChange}
                value={form.nombre}
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blue-900 mb-1 block">Email *</label>
              <input
                className="w-full border-2 border-blue-100 focus:border-blue-900 rounded-xl px-4 py-3 text-gray-700 focus:outline-none transition-colors"
                type="email"
                name="email"
                placeholder="tu@email.com"
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blue-900 mb-1 block">Teléfono</label>
              <input
                className="w-full border-2 border-blue-100 focus:border-blue-900 rounded-xl px-4 py-3 text-gray-700 focus:outline-none transition-colors"
                type="text"
                name="telefono"
                placeholder="+54 11 1234-5678"
                onChange={handleChange}
                value={form.telefono}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blue-900 mb-1 block">Mensaje *</label>
              <textarea
                className="w-full border-2 border-blue-100 focus:border-blue-900 rounded-xl px-4 py-3 text-gray-700 focus:outline-none transition-colors"
                name="mensaje"
                placeholder="Contanos en qué podemos ayudarte..."
                rows="5"
                onChange={handleChange}
                value={form.mensaje}
                required
              />
            </div>
            <button
              type="submit"
              disabled={cargando}
              className="bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg disabled:opacity-60"
            >
              {cargando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {error && <p className="text-red-500 text-center text-sm">Hubo un error, intentá de nuevo.</p>}
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contacto