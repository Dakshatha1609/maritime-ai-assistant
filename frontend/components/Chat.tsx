"use client"

import { useState } from "react"
import axios from "axios"

export default function Chat() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [contexts, setContexts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [topk, setTopk] = useState(3)

  const askQuestion = async () => {
    if (!question.trim()) return

    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
          question: question,
          top_k: topk
        }
      )

      setAnswer(res.data.answer)
      setContexts(res.data.contexts || [])

    } catch (err) {
      console.error("Chat API error:", err)
    }

    setLoading(false)
  }

  // highlight keywords
  const highlight = (text: string) => {
    return text.replace(
      /(SOLAS|IMO|AIS|GMDSS|IALA|VTS)/gi,
      `<span class="text-indigo-400 font-semibold">$1</span>`
    )
  }

  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">

        {/* ASK BOX */}
        <div className="bg-gradient-to-br from-black/40 to-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 space-y-5 shadow-lg">

          

          <input
            className="w-full p-3 rounded bg-black/30 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Ask about SOLAS, IMO regulations, AIS systems..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          />

          <div>
            <label className="text-sm text-gray-300">
              Top-K Retrieval: <span className="text-indigo-400">{topk}</span>
            </label>

            <input
              type="range"
              min="1"
              max="6"
              value={topk}
              onChange={(e) => setTopk(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={askQuestion}
            disabled={loading}
            className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2 w-fit"
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Generating...
              </>
            ) : "Ask"}
          </button>

        </div>

        {/* ANSWER */}
        {answer && (
          <div className="bg-gradient-to-br from-black/40 to-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 shadow-md space-y-3">

            <h2 className="text-xl font-semibold text-indigo-300">
              AI Response
            </h2>

            <p className="text-gray-200 leading-relaxed text-[15px]">
              {answer}
            </p>

            <div className="space-y-1">
              <p className="text-xs text-green-400">
                ✔ Answer generated from maritime knowledge base
              </p>

              <p className="text-xs text-gray-400">
                Retrieval based on semantic search + reranking
              </p>
            </div>

          </div>
        )}

        {/* CONTEXT */}
        {contexts.length > 0 && (
          <div className="bg-gradient-to-br from-black/40 to-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 space-y-6">

            <h2 className="text-xl font-semibold text-indigo-300">
              Source Evidence
            </h2>

            <div className="space-y-5">

              {contexts.map((c: any, i: number) => (

                <div
                  key={i}
                  className="bg-black/40 border border-indigo-500/20 rounded-lg p-5 hover:shadow-md hover:shadow-indigo-500/10 transition"
                >

                  {/* HEADER */}
                  <div className="flex justify-between items-start text-xs text-gray-400 border-b border-white/10 pb-2 mb-3">

                    <div className="flex gap-2 items-center">

                      <span className="text-indigo-400 font-medium">
                        Rank #{c.rank}
                      </span>

                      {/* SCORE */}
                      <span className="bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md text-[11px] font-medium">
                        {(1 / (1 + Math.exp(-c.score))).toFixed(2)}
                      </span>

                    </div>

                    <span className="text-right">
                      {c.source || "Unknown"} <br />
                      Page {c.page || "-"}
                    </span>

                  </div>

                  {/* TEXT */}
                  <p
                    className="text-gray-200 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlight(c.text) }}
                  />

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

      {/* RIGHT */}
      <div className="space-y-6">

        {/* TIPS */}
        <div className="bg-gradient-to-br from-black/40 to-indigo-900/20 border border-indigo-500/20 rounded-xl p-6">

          <h3 className="font-semibold mb-3 text-indigo-300">
             Tips
          </h3>

          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Ask precise queries (e.g., “SOLAS safety rules”)</li>
            <li>• Use domain keywords (IMO, AIS, VTS)</li>
            <li>• Increase Top-K for deeper retrieval</li>
          </ul>
        </div>

        {/* EMPTY STATE */}
        {!answer && (
          <div className="text-gray-400 text-sm p-4 border border-dashed border-white/10 rounded-lg">
            Start by asking about maritime regulations, navigation systems, or safety conventions.
          </div>
        )}

      </div>

    </div>
  )
}