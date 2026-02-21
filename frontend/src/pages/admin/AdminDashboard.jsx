import { Link, useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("fotovega_admin_token")
    navigate("/admin")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 px-8 h-16 flex items-center justify-between">
        <h1 className="font-light tracking-widest">
          FOTOVEGA<span className="text-red-500">23</span>
          <span className="text-gray-500 text-sm ml-3">Admin</span>
        </h1>
        <button onClick={logout} className="text-gray-500 hover:text-white text-sm transition">
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-light mb-12">Panel de control</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link to="/admin/eventos" className="group border border-white/10 hover:border-red-500/50 rounded-xl p-8 transition">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-light mb-2">Eventos</h3>
            <p className="text-gray-500 text-sm">Crear y gestionar eventos de karting</p>
          </Link>

          <Link to="/admin/ordenes" className="group border border-white/10 hover:border-red-500/50 rounded-xl p-8 transition">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-light mb-2">Órdenes</h3>
            <p className="text-gray-500 text-sm">Ver compras realizadas</p>
          </Link>

          <Link to="/" target="_blank" className="group border border-white/10 hover:border-red-500/50 rounded-xl p-8 transition">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-light mb-2">Ver sitio</h3>
            <p className="text-gray-500 text-sm">Abrir el sitio público</p>
          </Link>

        </div>
      </div>
    </div>
  )
}
