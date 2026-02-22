import { useState, useEffect } from 'react'
import axios from 'axios'

function Productos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  useEffect(() => {
    axios.get('https://grafica-textil-backend.onrender.com/api/productos')
      .then(res => {
        setProductos(res.data)
        setCargando(false)
      })
      .catch(err => {
        console.error(err)
        setCargando(false)
      })
  }, [])

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))]

  const productosFiltrados = categoriaActiva === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaActiva)

  const emojiPorCategoria = {
    remeras: '👕',
    buzos: '🧥',
    deportivo: '⚽',
    publicidad: '🎨',
  }

  if (cargando) return (
    <div className="text-center py-32">
      <p className="text-2xl text-blue-900 font-semibold animate-pulse">Cargando productos...</p>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white text-center py-20 px-8">
        <p className="text-blue-300 uppercase tracking-widest text-sm mb-2 font-semibold">Lo que fabricamos HOY</p>
        <h1 className="text-5xl font-black">Nuestros Productos</h1>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-5 py-2 rounded-full font-semibold capitalize transition-all ${
                categoriaActiva === cat
                  ? 'bg-blue-900 text-white shadow-lg'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="bg-white border-2 border-blue-100 hover:border-blue-900 rounded-2xl p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-blue-50 rounded-xl py-6 mb-4 text-6xl">
                {emojiPorCategoria[producto.categoria] || '📦'}
              </div>
              <span className="text-blue-400 text-xs uppercase font-bold tracking-widest">{producto.categoria}</span>
              <h3 className="text-xl font-bold text-blue-900 mt-1 mb-2">{producto.nombre}</h3>
              <p className="text-gray-500 text-sm mb-4">{producto.descripcion}</p>
              <p className="text-3xl font-black text-blue-900">${producto.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Productos