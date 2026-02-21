import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CarritoProvider } from "./context/CarritoContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Events from "./pages/Events"
import EventDetail from "./pages/EventDetail"
import Contact from "./pages/Contact"
import Carrito from "./pages/Carrito"
import Checkout from "./pages/Checkout"
import OrdenConfirmada from "./pages/OrdenConfirmada"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminEventos from "./pages/admin/AdminEventos"
import AdminFotos from "./pages/admin/AdminFotos"
import AdminOrdenes from "./pages/admin/AdminOrdenes"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas con Navbar/Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/eventos/:id" element={<EventDetail />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orden-confirmada/:id" element={<OrdenConfirmada />} />
          </Route>

          {/* Admin — sin Layout público */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/eventos" element={<ProtectedRoute><AdminEventos /></ProtectedRoute>} />
          <Route path="/admin/eventos/:id/fotos" element={<ProtectedRoute><AdminFotos /></ProtectedRoute>} />
          <Route path="/admin/ordenes" element={<ProtectedRoute><AdminOrdenes /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  )
}

export default App
