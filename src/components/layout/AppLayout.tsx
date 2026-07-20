import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

/**
 * Shared chrome for every module. Route views render only their own main
 * content inside the <Outlet />, so the 22-module route tree never
 * re-declares the navbar/sidebar.
 */
export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col items-start bg-canvas">
      <Navbar />
      <div className="flex w-full flex-1 items-start">
        <Sidebar />
        <main className="flex flex-1 flex-col items-start overflow-y-auto p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
