"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import axios from "axios"

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
)

export default function GraphView({
  query,
  setLoading,
  loading
}: {
  query: string
  setLoading: (v: boolean) => void
  loading: boolean
}) {

  const fgRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [size, setSize] = useState({ width: 800, height: 540 })
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] })
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [nodeInfo, setNodeInfo] = useState("")

  // Resize
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: 540
        })
      }
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  // Fetch graph
  useEffect(() => {

    if (!query?.trim()) return

    setLoading(true)

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/graph`, {
      params: { query }
    }).then(res => {

      const q = query.toLowerCase()

      const nodes = res.data.nodes.map((n: any) => ({
        ...n,
        isCenter: n.id.toLowerCase() === q
      }))

      setGraphData({
        nodes,
        links: res.data.links
      })

      setLoading(false)

    }).catch(() => {
      setGraphData({ nodes: [], links: [] })
      setLoading(false)
    })

  }, [query])

  // Fixed radial layout
  useEffect(() => {

    if (!fgRef.current) return

    const nodes = graphData.nodes
    const centerNode = nodes.find((n: any) => n.isCenter)

    if (!centerNode) return

    centerNode.fx = size.width / 2
    centerNode.fy = size.height / 2

    const others = nodes.filter((n: any) => !n.isCenter)

    const radius = 120
    const angleStep = (2 * Math.PI) / (others.length || 1)

    others.forEach((node: any, i: number) => {
      node.fx = size.width / 2 + radius * Math.cos(i * angleStep)
      node.fy = size.height / 2 + radius * Math.sin(i * angleStep)
    })

  }, [graphData, size])

  // Node click
  const handleNodeClick = async (node: any) => {

    setSelectedNode(node)
    setNodeInfo("Loading...")

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/node-info`,
        { params: { name: node.id } }
      )

      setNodeInfo(
        (res.data.contexts || []).join("\n\n") || "No info"
      )

    } catch {
      setNodeInfo("Error fetching info")
    }
  }

  const getColor = (node: any) => {
    if (node.isCenter) return "#facc15"
    if (node.type === "ORG") return "#3b82f6"
    if (node.type === "SYSTEM") return "#a855f7"
    if (node.type === "REGULATION") return "#22c55e"
    return "#64748b"
  }

  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#020617] p-5">

      {/* LOADING TEXT */}
      {loading && (
        <p className="text-center text-gray-400 mb-2">
          Loading graph...
        </p>
      )}

      <div ref={containerRef} className="w-full h-[540px]">

        {!loading && (
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            width={size.width}
            height={size.height}

            nodeColor={getColor}
            nodeVal={(n: any) => n.isCenter ? 40 : 12}

            linkWidth={2}
            linkColor={() => "#94a3b8"}

            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}

            d3AlphaDecay={1}
            d3VelocityDecay={1}
            cooldownTicks={0}
            enableNodeDrag={false}

            linkLabel={(link: any) => link.relation}
            onNodeClick={handleNodeClick}

            nodeCanvasObject={(node: any, ctx, scale) => {
              const label = node.id
              const fontSize = 12 / scale
              ctx.font = `${fontSize}px Sans-Serif`

              const textWidth = ctx.measureText(label).width
              const padding = 4

              ctx.fillStyle = "rgba(0,0,0,0.6)"
              ctx.fillRect(
                node.x - textWidth / 2 - padding,
                node.y - fontSize / 2 - padding,
                textWidth + padding * 2,
                fontSize + padding * 2
              )

              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              ctx.fillStyle = "#ffffff"
              ctx.fillText(label, node.x, node.y)
            }}

            linkCanvasObject={(link: any, ctx) => {
              const start = link.source
              const end = link.target

              if (typeof start !== "object" || typeof end !== "object") return

              const text = link.relation
              const x = (start.x + end.x) / 2
              const y = (start.y + end.y) / 2

              ctx.font = "10px Sans-Serif"
              ctx.fillStyle = "#cbd5f5"
              ctx.textAlign = "center"
              ctx.fillText(text, x, y)
            }}
          />
        )}

      </div>

      {/* SIDE PANEL */}
      {selectedNode && (
        <div className="absolute top-6 right-6 w-80 bg-[#0f172a]/95 border border-white/10 p-4 rounded-xl shadow-lg">

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-yellow-400 font-semibold">
              {selectedNode.id}
            </h3>
            <button onClick={() => setSelectedNode(null)}>✖</button>
          </div>

          <div className="text-xs text-gray-400 mb-2">
            Type: {selectedNode.type}
          </div>

          <p className="text-sm text-gray-300 whitespace-pre-wrap max-h-60 overflow-y-auto">
            {nodeInfo}
          </p>

        </div>
      )}

    </div>
  )
}