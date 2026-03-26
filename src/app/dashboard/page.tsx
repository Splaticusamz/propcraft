export default function Dashboard() {
  const buildDate = "March 26, 2026";


  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-950 text-gray-100 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            ⚡ PropCraft — Hustle Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Private ops dashboard • Last build: {buildDate}</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          🟢 LIVE
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Status", value: "MVP Live", color: "emerald", icon: "🚀" },
          { label: "Users", value: "0", color: "violet", icon: "👥" },
          { label: "Proposals Generated", value: "0", color: "cyan", icon: "📄" },
          { label: "MRR", value: "$0", color: "amber", icon: "💰" },
        ].map((s, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-gray-500 text-xs mb-1">{s.icon} {s.label}</div>
            <div className={`text-2xl font-bold text-${s.color}-400`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* How It Works - Flow Diagram */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">🔄 How PropCraft Works</h2>
        <pre className="text-sm font-[family-name:var(--font-geist-mono)] text-cyan-300 overflow-x-auto">{`
  ┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
  │  FREELANCER  │────▶│  FILL FORM   │────▶│  AI ENGINE  │────▶│  SOW / PDF   │
  │  lands on    │     │  client name │     │  generates   │     │  ready to    │
  │  propcraft   │     │  scope, $$$  │     │  proposal    │     │  send client │
  └─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
        │                                                              │
        │                    ┌─────────────────────┐                   │
        │                    │   USAGE TRACKING     │                   │
        └───────────────────▶│   Free: 2/mo         │◀──────────────────┘
                             │   Pro: 10/mo ($9)    │
                             │   Unlimited ($19/mo) │
                             └─────────────────────┘
                                       │
                             ┌─────────▼──────────┐
                             │   💰 STRIPE        │
                             │   Recurring billing │
                             │   Upgrade flow      │
                             └────────────────────┘
        `}</pre>
      </div>

      {/* Automation Flow */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">⚙️ Automation & Growth Pipeline</h2>
        <pre className="text-sm font-[family-name:var(--font-geist-mono)] text-violet-300 overflow-x-auto">{`
  ┌────────────────────────────────────────────────────────────────────┐
  │                      ACQUISITION FUNNEL                            │
  ├────────────────────────────────────────────────────────────────────┤
  │                                                                    │
  │  SEO Content ──┐                                                   │
  │  ("freelance    │    ┌──────────┐    ┌────────┐    ┌───────────┐  │
  │   proposal      ├───▶│ Landing  │───▶│ Sign   │───▶│ Generate  │  │
  │   template")    │    │ Page     │    │ Up     │    │ 1st SOW   │  │
  │                 │    └──────────┘    └────────┘    └─────┬─────┘  │
  │  Reddit ────────┤                                        │        │
  │  r/freelance    │                                  ┌─────▼─────┐  │
  │                 │                                  │ Hit Free  │  │
  │  Indie ─────────┤                                  │ Limit     │  │
  │  Hackers        │                                  └─────┬─────┘  │
  │                 │                                        │        │
  │  Twitter ───────┘                                  ┌─────▼─────┐  │
  │                                                    │ UPGRADE   │  │
  │                                                    │ $9 / $19  │  │
  │                                                    └───────────┘  │
  └────────────────────────────────────────────────────────────────────┘
        `}</pre>
      </div>

      {/* Revenue Timeline */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">📈 Revenue Timeline</h2>
        <div className="space-y-3 text-sm">
          {[
            { week: "Week 1 (Now)", milestone: "MVP live, seed Reddit/IH/Twitter", revenue: "$0", status: "🔵 IN PROGRESS", bar: 15 },
            { week: "Week 2", milestone: "Stripe integration, first paid users", revenue: "$9-50", status: "⏳ PLANNED", bar: 5 },
            { week: "Week 3-4", milestone: "SEO content, 50+ organic visits/day", revenue: "$50-200", status: "⏳ PLANNED", bar: 0 },
            { week: "Month 2", milestone: "100 users, word of mouth", revenue: "$200-500/mo", status: "⏳ PLANNED", bar: 0 },
            { week: "Month 3", milestone: "Referral program, 500 users", revenue: "$500-1500/mo", status: "🎯 TARGET", bar: 0 },
            { week: "Month 6", milestone: "API, integrations, steady growth", revenue: "$2000-5000/mo", status: "🎯 TARGET", bar: 0 },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-28 text-gray-400 shrink-0">{r.week}</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>{r.milestone}</span>
                  <span className="text-emerald-400 font-medium">{r.revenue}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all" style={{ width: `${r.bar}%` }} />
                </div>
              </div>
              <div className="w-28 text-right shrink-0 text-xs">{r.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Status */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🛠 Development Status</h2>
          <div className="space-y-2 text-sm">
            {[
              { task: "Next.js scaffold", status: "done" },
              { task: "Landing page with pricing", status: "done" },
              { task: "Proposal generation form", status: "done" },
              { task: "Template-based SOW engine", status: "done" },
              { task: "API route /api/generate", status: "done" },
              { task: "Dashboard (this page)", status: "done" },
              { task: "Vercel deployment", status: "done" },
              { task: "Supabase auth (magic link)", status: "pending" },
              { task: "Usage tracking (free tier limit)", status: "pending" },
              { task: "LLM-powered generation (OpenAI)", status: "pending" },
              { task: "PDF export", status: "pending" },
              { task: "Stripe checkout integration", status: "pending" },
              { task: "Template library (5+ industries)", status: "pending" },
              { task: "Custom branding (logo, colors)", status: "planned" },
              { task: ".docx export", status: "planned" },
              { task: "SEO blog content", status: "planned" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`w-5 text-center ${t.status === "done" ? "text-emerald-400" : t.status === "pending" ? "text-amber-400" : "text-gray-600"}`}>
                  {t.status === "done" ? "✅" : t.status === "pending" ? "🔶" : "⬜"}
                </span>
                <span className={t.status === "done" ? "text-gray-400 line-through" : ""}>{t.task}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Progress: 7/16 tasks (44%) • Phase 1 MVP
          </div>
          <div className="mt-2 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" style={{ width: "44%" }} />
          </div>
        </div>

        {/* Complementary Stats */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">📊 Complementary Stats</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Target Market (US Freelancers)</span>
                <span className="text-cyan-400 font-medium">73M+</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Keyword: &quot;proposal template&quot; (monthly)</span>
                <span className="text-violet-400 font-medium">~40K</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: "65%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Keyword: &quot;SOW generator&quot; (monthly)</span>
                <span className="text-violet-400 font-medium">~8K</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: "25%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Monthly hosting cost</span>
                <span className="text-emerald-400 font-medium">$0 (Vercel free)</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>Break-even (at $9/mo)</span>
                <span className="text-amber-400 font-medium">1 paid user</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>API cost per proposal (GPT-4o)</span>
                <span className="text-emerald-400 font-medium">~$0.01</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mt-4">
              <h3 className="font-semibold mb-2">🏗 Other Hustles</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>llm-prices</span>
                  <span className="text-emerald-400">🟢 Live</span>
                </div>
                <div className="flex justify-between">
                  <span>shopready</span>
                  <span className="text-amber-400">🟡 Dormant</span>
                </div>
                <div className="flex justify-between">
                  <span>pragmasix</span>
                  <span className="text-gray-600">⚪ Skeleton</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">🧱 Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel", "Supabase (planned)", "Stripe (planned)", "OpenAI API (planned)"].map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 pb-8">
        PropCraft Dashboard • Auto-generated {buildDate} • 🔒 Private
      </div>
    </div>
  );
}
