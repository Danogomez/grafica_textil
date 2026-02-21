function Nosotros() {
  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white text-center py-20 px-8">
        <p className="text-blue-300 uppercase tracking-widest text-sm mb-2 font-semibold">Quiénes somos</p>
        <h1 className="text-5xl font-black">Nosotros</h1>
      </div>

      {/* Historia */}
      <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-500 uppercase tracking-widest text-sm mb-2 font-semibold">Nuestra historia</p>
          <h2 className="text-4xl font-black text-blue-900 mb-6">Años de experiencia en el rubro textil</h2>
          <p className="text-gray-500 mb-4">Somos una empresa dedicada a la fabricación de indumentaria personalizada para empresas, grupos de trabajo y deportes. Trabajamos con materiales de primera calidad y cumplimos siempre con los tiempos acordados.</p>
          <p className="text-gray-500">Nuestro objetivo es que cada cliente quede satisfecho con el producto final, por eso asesoramos en cada etapa del proceso, desde la elección del material hasta el diseño final.</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-12 text-center">
          <div className="text-8xl mb-4">👕</div>
          <p className="text-blue-900 font-bold text-xl">Gráfica Textil</p>
          <p className="text-gray-500">Fabricación a medida</p>
        </div>
      </div>

      {/* Números */}
      <div className="bg-blue-950 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { numero: '10+', label: 'Años de experiencia' },
            { numero: '500+', label: 'Clientes satisfechos' },
            { numero: '10.000+', label: 'Prendas fabricadas' },
            { numero: '100%', label: 'Calidad garantizada' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-5xl font-black text-blue-300 mb-2">{item.numero}</p>
              <p className="text-blue-200 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Valores */}
      <div className="max-w-6xl mx-auto px-8 py-20 text-center">
        <p className="text-blue-500 uppercase tracking-widest text-sm mb-2 font-semibold">Lo que nos define</p>
        <h2 className="text-4xl font-black text-blue-900 mb-16">Nuestros valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { emoji: '🤝', titulo: 'Compromiso', desc: 'Cumplimos con cada pedido en tiempo y forma, sin excepciones.' },
            { emoji: '⭐', titulo: 'Calidad', desc: 'Usamos materiales de primera para que el producto final sea impecable.' },
            { emoji: '💡', titulo: 'Creatividad', desc: 'Ayudamos a cada cliente a plasmar su idea de la mejor manera posible.' },
          ].map(item => (
            <div key={item.titulo} className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.titulo}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Nosotros