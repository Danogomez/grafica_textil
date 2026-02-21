import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API = "http://localhost:5000"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError("")
    try {
      const res = await axios.post(`${API}/api/admin/login`, form)
      localStorage.setItem("fotovega_admin_token", res.data.token)
      navigate("/admin/dashboard")
    } catch {
      setError("Email o contraseña incorrectos")
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-light text-center mb-2">
          FOTOVEGA<span className="text-red-500">23</span>
        </h1>
        <p className="text-gray-500 text-center text-sm mb-10">Panel de administración</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-3 rounded-lg font-semibold transition"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  )
}
