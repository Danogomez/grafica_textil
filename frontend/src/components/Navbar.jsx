import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const linkClass = (path) =>
    `transition-colors font-medium ${
      location.pathname === path
        ? 'text-white border-b-2 border-white pb-1'
        : 'text-blue-200 hover:text-white'
    }`

  return (
    <nav className="bg-gradient-to-r from-blue-950 to-blue-800 px-10 py-5 flex justify-between items-center shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-white text-blue-900 font-black text-lg px-3 py-1 rounded-lg">GT</div>
        <span className="text-white text-xl font-bold tracking-wide">Gráfica Textil</span>
      </Link>
      <div className="flex gap-10">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/productos" className={linkClass('/productos')}>Productos</Link>
        <Link to="/nosotros" className={linkClass('/nosotros')}>Nosotros</Link>
        <Link to="/contacto" className={linkClass('/contacto')}>Contacto</Link>
      </div>
    </nav>
  )
}

export default Navbar