"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("user", email)
      router.push("/chat")
    } else {
      alert("Enter credentials")
    }
  }

  return (

    <div className="min-h-screen bg-[#020617] relative overflow-hidden text-white px-6 flex items-center justify-center">

      {/* 🔥 SAME BACKGROUND AS HOMEPAGE */}
      <div className="absolute w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full bottom-[-250px] right-[-250px]" />

      <div className="relative z-10 max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="hidden md:block space-y-4">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MaritimeGPT
          </h1>

          <p className="text-gray-300 leading-relaxed">
            Maritime assistant powered by RAG, vector search, and knowledge graphs.
            Get accurate answers for regulations, safety, and navigation systems.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl rounded-2xl"></div>

          <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto space-y-5 border border-white/10">

            <h2 className="text-2xl font-bold text-center">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-300 text-center">
              Login to continue
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
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition py-3 rounded-lg font-semibold"
            >
              Login
            </button>

            <p className="text-sm text-center text-gray-300">
              Don’t have an account?{" "}
              <span
                className="text-indigo-400 cursor-pointer hover:underline"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}