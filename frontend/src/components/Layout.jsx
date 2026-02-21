import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
