export default function MovieDetailSkeleton() {
    return (
      <>
        <style>{`
          @keyframes shimmer {
            0%   { background-position: -800px 0; }
            100% { background-position:  800px 0; }
          }
          .sk {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0.04) 0%,
              rgba(255,255,255,0.09) 40%,
              rgba(255,255,255,0.04) 80%
            );
            background-size: 800px 100%;
            animation: shimmer 1.6s infinite linear;
            border-radius: 6px;
          }
        `}</style>
  
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080810", minHeight: "100vh" }} className="text-white">
  
          {/* ── Backdrop ── */}
          <div className="relative w-full h-[520px] overflow-hidden">
            <div className="sk w-full h-full rounded-none" />
            {/* same gradients as real page so the layout feels identical */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080810]/95 via-[#080810]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-[#080810]/30" />
  
            {/* Status chip ghost */}
            <div className="absolute top-6 right-6">
              <div className="sk w-24 h-7 rounded-full" />
            </div>
          </div>
  
          {/* ── Content ── */}
          <div className="max-w-6xl mx-auto px-6 -mt-52 relative z-10 pb-20">
            <div className="flex gap-10 items-end">
  
              {/* Poster ghost */}
              <div className="flex-shrink-0 hidden md:block">
                <div className="sk w-[210px] rounded-2xl" style={{ aspectRatio: "2/3" }} />
              </div>
  
              {/* Text block */}
              <div className="flex-1 pb-2">
  
                {/* Genre badges */}
                <div className="flex gap-2 mb-4">
                  <div className="sk w-20 h-6 rounded-full" />
                  <div className="sk w-16 h-6 rounded-full" />
                  <div className="sk w-24 h-6 rounded-full" />
                </div>
  
                {/* Title */}
                <div className="sk w-3/4 h-14 mb-2 rounded-lg" />
  
                {/* Tagline */}
                <div className="sk w-1/2 h-4 mb-6 rounded" />
  
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="sk w-10 h-3.5 rounded" />
                  <div className="sk w-1 h-1 rounded-full" />
                  <div className="sk w-12 h-3.5 rounded" />
                  <div className="sk w-1 h-1 rounded-full" />
                  <div className="sk w-8  h-3.5 rounded" />
                  <div className="sk w-1 h-1 rounded-full" />
                  <div className="sk w-6  h-3.5 rounded" />
                </div>
  
                {/* Rating ring + label */}
                <div className="flex items-center gap-5 mb-7">
                  <div className="sk w-20 h-20 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <div className="sk w-20 h-3.5 rounded" />
                    <div className="sk w-28 h-3.5 rounded" />
                  </div>
                </div>
  
                {/* CTA buttons */}
                <div className="flex gap-3">
                  <div className="sk w-36 h-11 rounded-full" />
                  <div className="sk w-28 h-11 rounded-full" />
                </div>
              </div>
            </div>
  
            {/* ── Overview ── */}
            <div className="mt-12">
              <div className="sk w-16 h-3 rounded mb-4" />
              <div className="flex flex-col gap-2.5 max-w-2xl">
                <div className="sk w-full h-3.5 rounded" />
                <div className="sk w-full h-3.5 rounded" />
                <div className="sk w-5/6 h-3.5 rounded" />
                <div className="sk w-3/4 h-3.5 rounded" />
              </div>
            </div>
  
            {/* ── Stats grid ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2.5 px-5 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03]"
                >
                  <div className="sk w-14 h-2.5 rounded" />
                  <div className="sk w-20 h-4 rounded" />
                </div>
              ))}
            </div>
  
            {/* ── Production companies ── */}
            <div className="mt-12">
              <div className="sk w-20 h-3 rounded mb-5" />
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="sk rounded-xl border border-white/[0.07]"
                    style={{ width: `${90 + i * 18}px`, height: "46px" }}
                  />
                ))}
              </div>
            </div>
  
          </div>
        </div>
      </>
    );
  }
  