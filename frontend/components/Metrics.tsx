export default function Metrics() {

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-gray-400 text-sm">Graph Nodes</p>
        <h2 className="text-2xl font-bold mt-1">43</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-gray-400 text-sm">Graph Edges</p>
        <h2 className="text-2xl font-bold mt-1">50</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <p className="text-gray-400 text-sm">Avg Latency</p>
        <h2 className="text-2xl font-bold mt-1">~120 ms</h2>
      </div>
    </>
  )
}