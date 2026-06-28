import { Outlet } from "react-router-dom"
import { Navigation } from '@/components/Navigation/Navigation'

export const MainLayout = () => {
  return (
    <div className="main">
      <Navigation />
      <main> <Outlet /> </main>
    </div>
  )
}