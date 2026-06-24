// Next.js automatically renders this while the projects page suspends.
// Pure Tailwind — no additional dependencies.

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* ── Header skeleton ── */}
      <div className="mb-12">
        {/* "Portfolio" label */}
        <div className="w-20 h-3 bg-neutral-800 rounded-full animate-pulse mb-4" />
        {/* Title */}
        <div className="w-72 h-12 bg-neutral-800 rounded-xl animate-pulse mb-3" />
        {/* Sub-copy */}
        <div className="w-96 h-5 bg-neutral-800/60 rounded-lg animate-pulse mb-8" />
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "NLP", "CV", "Agentic", "Web","Machine Learning","Deep learning"].map((_, i) => (
            <div
              key={i}
              className="w-16 h-9 bg-neutral-900 border border-neutral-800 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* ── Card grid skeleton ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl h-[400px] bg-neutral-900 border border-white/[0.05] overflow-hidden animate-pulse"
            // Stagger the pulse timing slightly via inline style so cards
            // don't all throb in perfect unison — feels more natural.
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Image area */}
            <div className="w-full h-[55%] bg-neutral-800" />
            {/* Text content area */}
            <div className="p-5 flex flex-col gap-3">
              {/* Category pill placeholder */}
              <div className="w-24 h-3 bg-neutral-700/60 rounded-full" />
              {/* Title */}
              <div className="w-3/4 h-5 bg-neutral-700/60 rounded-lg" />
              {/* Description lines */}
              <div className="w-full h-3 bg-neutral-800/80 rounded" />
              <div className="w-5/6 h-3 bg-neutral-800/80 rounded" />
              {/* Tech pills */}
              <div className="flex gap-1.5 mt-1">
                <div className="w-14 h-5 bg-neutral-800 rounded-md" />
                <div className="w-16 h-5 bg-neutral-800 rounded-md" />
                <div className="w-12 h-5 bg-neutral-800 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}