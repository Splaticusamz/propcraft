"use client";

import { useState } from "react";
import Link from "next/link";

export default function GeneratePage() {
  const [form, setForm] = useState({
    clientName: "",
    projectType: "web-development",
    scopeBullets: "",
    timeline: "2 weeks",
    budgetRange: "$1,000 - $3,000",
    paymentTerms: "50% upfront, 50% on delivery",
    yourName: "",
    yourCompany: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data.proposal || data.error || "Something went wrong");
    } catch {
      setResult("Failed to generate. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <nav className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ PropCraft
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h1 className="text-2xl font-bold mb-6">Generate Proposal</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Name</label>
              <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.yourName} onChange={e => setForm({...form, yourName: e.target.value})} placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Company (optional)</label>
              <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.yourCompany} onChange={e => setForm({...form, yourCompany: e.target.value})} placeholder="Smith Design Co." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Client Name</label>
              <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} placeholder="Acme Corp" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Project Type</label>
              <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.projectType} onChange={e => setForm({...form, projectType: e.target.value})}>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="design">Design / Branding</option>
                <option value="marketing">Marketing Campaign</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Scope (one item per line)</label>
              <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500 h-28" value={form.scopeBullets} onChange={e => setForm({...form, scopeBullets: e.target.value})} placeholder={"Homepage redesign\nResponsive mobile layout\n5 inner pages\nCMS integration"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Timeline</label>
                <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Budget Range</label>
                <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.budgetRange} onChange={e => setForm({...form, budgetRange: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Payment Terms</label>
              <input className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-violet-500" value={form.paymentTerms} onChange={e => setForm({...form, paymentTerms: e.target.value})} />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition font-semibold disabled:opacity-50"
            >
              {loading ? "Generating..." : "⚡ Generate Proposal"}
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Preview</h2>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 min-h-[500px] whitespace-pre-wrap text-sm font-[family-name:var(--font-geist-mono)]">
            {result || <span className="text-gray-600">Your generated proposal will appear here...</span>}
          </div>
          {result && (
            <div className="mt-4 flex gap-3">
              <button onClick={() => navigator.clipboard.writeText(result)} className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm transition">
                📋 Copy Markdown
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
