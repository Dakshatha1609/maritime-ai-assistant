"use client"

import { useRouter } from "next/navigation"
import { Brain, Network, Sparkles } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden px-6 md:px-16 flex items-center justify-center">

      {/* Background glow */}
      <div className="absolute w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full bottom-[-250px] right-[-250px]" />

      {/* MAIN */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center -mt-20">

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Maritime AI Assistant
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl">
          Search maritime regulations, explore knowledge graphs, and get accurate answers
          using retrieval-augmented AI.
        </p>

        {/* CARDS */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Brain className="text-indigo-400" size={20} />
              <h3 className="text-indigo-400 font-semibold">Semantic Search</h3>
            </div>
            <p className="text-sm text-gray-400">
              Retrieve precise maritime regulations using FAISS-powered vector embeddings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Network className="text-purple-400" size={20} />
              <h3 className="text-purple-400 font-semibold">Knowledge Graph</h3>
            </div>
            <p className="text-sm text-gray-400">
              Visualize relationships between SOLAS, IMO, IALA, and navigation systems.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="text-pink-400" size={20} />
              <h3 className="text-pink-400 font-semibold">Context-Aware AI</h3>
            </div>
            <p className="text-sm text-gray-400">
              Generate accurate answers using retrieval-augmented generation.
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-24">
          <button
            onClick={() => router.push("/register")}
            className="px-12 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold shadow-xl hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>

      </div>
    </div>
  )
}