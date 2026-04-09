"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {

  const pathname = usePathname()

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-xl transition ${
      pathname === path
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`

  return (
    <div className="w-64 bg-[#020617] border-r border-white/10 p-5 flex flex-col justify-between">

      <div>
        <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          MaritimeGPT
        </h1>

        <div className="space-y-2">
          <Link href="/chat" className={linkClass("/chat")}>
            Chat Assistant
          </Link>
          <Link href="/graph" className={linkClass("/graph")}>
            Knowledge Graph
          </Link>
        </div>
      </div>

      <button className="text-red-400 text-sm hover:text-red-500">
        Logout
      </button>

    </div>
  )
}