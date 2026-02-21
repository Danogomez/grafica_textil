import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white text-center py-36 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <p className="text-blue-300 uppercase tracking-widest text-sm mb-4 font-semibold">Fabricación a medida</p>
        <h1 className="text-6xl font-black mb-6 leading-tight">
          Tu marca en <br />
          <span className="text-blue-300">cada prenda</span>
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-200">
          Fabricamos remeras, uniformes y artículos publicitarios para empresas, 
          grupos de trabajo y deportes.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/productos" className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-100 transition-colors shadow-lg">
            Ver Productos
          </Link>
          <Link to="/contacto" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-colors">
            Contactanos
          </Link>
        </div>
      </div>

      {/* Servicios */}
      <div className="py-24 px-8 text-center bg-white">
        <p className="text-blue-500 uppercase tracking-widest text-sm mb-2 font-semibold">Lo que hacemos</p>
        <h2 className="text-4xl font-black text-blue-900 mb-16">Nuestros servicios</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {[
            { emoji: '👕', titulo: 'Remeras', desc: 'Personalizadas con tu logo o diseño para equipos y empresas.' },
            { emoji: '👔', titulo: 'Uniformes', desc: 'Uniformes corporativos y deportivos a medida.' },
            { emoji: '⚽', titulo: 'Deportivo', desc: 'Indumentaria deportiva para clubes y equipos.' },
            { emoji: '🎨', titulo: 'Publicidad', desc: 'Artículos publicitarios con tu marca.' },
          ].map((item) => (
            <div key={item.titulo} className="bg-blue-50 border-2 border-blue-100 hover:border-blue-900 rounded-2xl p-8 w-56 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">{item.titulo}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Por qué elegirnos */}
      <div className="bg-blue-950 text-white py-24 px-8 text-center">
        <h2 className="text-4xl font-black mb-16">¿Por qué elegirnos?</h2>
        <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
          {[
            { emoji: '⚡', titulo: 'Entrega rápida', desc: 'Cumplimos con los tiempos acordados.' },
            { emoji: '✅', titulo: 'Calidad garantizada', desc: 'Materiales de primera calidad.' },
            { emoji: '💬', titulo: 'Asesoramiento', desc: 'Te ayudamos a elegir la mejor opción.' },
          ].map((item) => (
            <div key={item.titulo} className="w-56">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-lg font-bold mb-2">{item.titulo}</h3>
              <p className="text-blue-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-20 px-8">
        <h2 className="text-4xl font-black mb-4">¿Tenés un proyecto en mente?</h2>
        <p className="text-blue-200 mb-8 text-lg">Contactanos y te asesoramos sin compromiso.</p>
        <Link to="/contacto" className="bg-white text-blue-900 font-bold px-10 py-4 rounded-lg hover:bg-blue-100 transition-colors shadow-lg text-lg">
          Contactanos ahora
        </Link>
      </div>
    </div>
  )
}

export default Inicio