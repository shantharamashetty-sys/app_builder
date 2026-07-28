import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

/**
 * Shared chrome for every module. Route views render only their own main
 * content inside the <Outlet />, so the 22-module route tree never
 * re-declares the navbar/sidebar. Sidebar visibility below `lg` is owned
 * here since both Navbar (the toggle) and Sidebar (the drawer) need it.
 */
export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col items-start bg-canvas">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex w-full flex-1 items-stretch">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex min-w-0 flex-1 flex-col items-start overflow-y-auto p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
