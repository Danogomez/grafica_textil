import { createContext, useContext, useState } from "react"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  function agregar(foto) {
    setItems(prev => {
      if (prev.find(i => i.id === foto.id)) return prev
      return [...prev, foto]
    })
  }

  function quitar(fotoId) {
    setItems(prev => prev.filter(i => i.id !== fotoId))
  }

  function limpiar() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + parseFloat(i.precio), 0)
  const cantidad = items.length

  return (
    <CarritoContext.Provider value={{ items, agregar, quitar, limpiar, total, cantidad }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}
