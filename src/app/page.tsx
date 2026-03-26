import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ PropCraft
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="/generate" className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition font-medium">
            Generate Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
          🚀 Free tier — 2 proposals/month
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Proposals that{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            close deals
          </span>
          <br />in seconds, not hours.
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8">
          AI-powered SOW & proposal generator for freelancers. Enter your project details,
          get a polished, professional document ready to send. Export as PDF or Markdown.
        </p>
        <div className="flex gap-4">
          <Link
            href="/generate"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition font-semibold text-lg"
          >
            Create Your First Proposal →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 text-left w-full">
          {[
            { icon: "⚡", title: "60-Second Proposals", desc: "Fill in your project details, get a complete SOW with scope, timeline, and payment terms." },
            { icon: "🎨", title: "Professional Templates", desc: "Web dev, design, marketing, consulting — templates tailored to your industry." },
            { icon: "📄", title: "PDF & Markdown Export", desc: "Download as PDF or copy markdown. Brand it with your logo and colors." },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-8">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "$0", period: "/forever", features: ["2 proposals/month", "Markdown export", "All templates"], cta: "Get Started", highlight: false },
              { name: "Pro", price: "$9", period: "/month", features: ["10 proposals/month", "PDF export", "Custom branding", "Priority support"], cta: "Start Pro", highlight: true },
              { name: "Unlimited", price: "$19", period: "/month", features: ["Unlimited proposals", "All Pro features", ".docx export", "API access"], cta: "Go Unlimited", highlight: false },
            ].map((p, i) => (
              <div key={i} className={`p-6 rounded-xl border ${p.highlight ? "border-violet-500 bg-violet-500/5" : "border-gray-800 bg-gray-900/50"}`}>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-gray-500">{p.period}</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                  {p.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                </ul>
                <Link href="/generate" className={`block text-center py-2 rounded-lg font-medium ${p.highlight ? "bg-violet-600 hover:bg-violet-500" : "bg-gray-800 hover:bg-gray-700"} transition`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 mt-20 text-center text-sm text-gray-500">
        © 2026 PropCraft. Built for freelancers who&apos;d rather do the work than write about it.
      </footer>
    </div>
  );
}
