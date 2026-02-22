import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const linkClass = (path) =>
    `transition-colors font-medium ${
      location.pathname === path
        ? 'text-white border-b-2 border-white pb-1'
        : 'text-blue-200 hover:text-white'
    }`

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mystral&display=swap');
        .font-mystral {
          font-family: 'Mystral', serif;
        }
      `}</style>

      <nav className="bg-gradient-to-r from-blue-950 to-blue-800 px-6 py-5 shadow-lg">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white text-blue-900 font-black text-lg px-3 py-1 rounded-lg">GT</div>
            <span className="text-white text-2xl font-mystral tracking-wide">Gráfica Textil</span>
          </Link>

          {/* Links desktop */}
          <div className="hidden md:flex gap-10">
            <Link to="/" className={linkClass('/')}>Inicio</Link>
            <Link to="/productos" className={linkClass('/productos')}>Productos</Link>
            <Link to="/nosotros" className={linkClass('/nosotros')}>Nosotros</Link>
            <Link to="/contacto" className={linkClass('/contacto')}>Contacto</Link>
          </div>

          {/* Botón hamburguesa mobile */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menú mobile */}
        {menuAbierto && (
          <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
            <Link to="/" className="text-blue-200 hover:text-white font-medium" onClick={() => setMenuAbierto(false)}>Inicio</Link>
            <Link to="/productos" className="text-blue-200 hover:text-white font-medium" onClick={() => setMenuAbierto(false)}>Productos</Link>
            <Link to="/nosotros" className="text-blue-200 hover:text-white font-medium" onClick={() => setMenuAbierto(false)}>Nosotros</Link>
            <Link to="/contacto" className="text-blue-200 hover:text-white font-medium" onClick={() => setMenuAbierto(false)}>Contacto</Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar