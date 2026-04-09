"use client"

import "./globals.css"
import Sidebar from "../components/Sidebar"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const noSidebarRoutes = ["/", "/login", "/register"]
  const showSidebar = !noSidebarRoutes.includes(pathname)

  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        {showSidebar ? (

          <div className="flex h-screen">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

              {/* TOPBAR */}
              <div className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#020617]">

                <h1 className="text-sm font-medium text-gray-400">
                  Maritime AI System
                </h1>

                <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  D
                </div>

              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto px-8">
                {children}
              </div>

            </div>

          </div>

        ) : (

          <div className="w-full">
              {children}
            
          </div>

        )}

      </body>
    </html>
  )
}