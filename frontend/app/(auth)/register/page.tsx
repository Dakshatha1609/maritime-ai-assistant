"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem("user", email)
      router.push("/login")
    } else {
      alert("Enter details")
    }
  }

  return (

    <div className="min-h-screen bg-[#020617] relative overflow-hidden text-white px-6 flex items-center justify-center">

      {/* 🔥 SAME BACKGROUND GLOW AS HOMEPAGE */}
      <div className="absolute w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full bottom-[-250px] right-[-250px]" />

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MaritimeGPT
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Create your account to explore maritime intelligence powered by 
            retrieval-augmented generation and knowledge graphs.
          </p>

          <div className="space-y-3 text-sm text-gray-400">

            <div className="flex items-center gap-2">
              AI-powered maritime regulation search
            </div>

            <div className="flex items-center gap-2">
              Interactive knowledge graph visualization
            </div>

            <div className="flex items-center gap-2">
              Fast semantic retrieval with context-aware answers
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-2xl"></div>

          <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto space-y-5 border border-white/10">

            <h2 className="text-2xl font-bold text-center">
              Create Account
            </h2>

            <p className="text-sm text-gray-300 text-center">
              Get started with MaritimeGPT
            </p>

            <input
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition py-3 rounded-lg font-semibold shadow-md"
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-300">
              Already have an account?{" "}
              <span
                className="text-indigo-400 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}