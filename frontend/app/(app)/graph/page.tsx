"use client"

import { useState, useEffect } from "react"
import GraphView from "@/components/GraphView"
import axios from "axios"

export default function GraphPage() {

  const [input, setInput] = useState("")
  const [query, setQuery] = useState("")

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  const [loading, setLoading] = useState(false)

  // 🔥 Fetch suggestions
  useEffect(() => {

    if (!input.trim()) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/suggest`,
          { params: { q: input } }
        )

        setSuggestions(res.data || [])
        setShowDropdown(true)

      } catch {
        setSuggestions([])
      }
    }

    const delay = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(delay)

  }, [input])

  const handleSearch = (value?: string) => {
    const q = (value || input).trim()
    if (!q) return

    setLoading(true) // 🔥 start loading
    setQuery(q.toUpperCase())
    setShowDropdown(false)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Knowledge Graph Explorer
        </h1>
        <p className="text-gray-400 mt-1">
          Explore relationships between maritime concepts
        </p>
      </div>

      {/* INPUT */}
      <div className="relative flex gap-3">

        <input
          className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search maritime concepts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />

        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load"}
        </button>

        {/* DROPDOWN */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-[#0f172a] border border-white/10 rounded-xl shadow-lg z-10">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => handleSearch(s)}
                className="px-4 py-2 hover:bg-indigo-600 cursor-pointer text-sm"
              >
                {s}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* INSTRUCTION */}
      <p className="text-sm text-gray-400">
        Click on nodes to explore relationships
      </p>

      {/* GRAPH */}
      <GraphView query={query} setLoading={setLoading} loading={loading} />

    </div>
  )
}