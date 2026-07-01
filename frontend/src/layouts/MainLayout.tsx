import { Outlet } from "react-router-dom"
import { Navigation } from '@/components/Navigation/Navigation'

export const MainLayout = () => {
  return (
    <div className="content">
      <Navigation />
      <main className="content__main"> 
        <div className="container"><Outlet /> </div>
      </main>
    </div>
  )
}