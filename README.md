# PropCraft ✍️

**AI-powered SOW & proposal generator for freelancers.**

Generate professional Statements of Work, project proposals, and client contracts in seconds — not hours.

## The Problem

73M+ US freelancers waste 3-5 hours per proposal. Most copy-paste from old docs, miss key sections, and undercharge because scoping is painful.

## The Solution

PropCraft uses AI to generate polished, complete proposals from a simple form. Fill in the basics — get a professional document ready to send.

## Architecture

```
┌─────────────────────────────────────────┐
│            Next.js 14 (App Router)       │
│  ┌───────────┐  ┌──────────┐  ┌───────┐ │
│  │ Landing   │  │ Form/    │  │ API   │ │
│  │ Page      │  │ Editor   │  │ Routes│ │
│  └───────────┘  └──────────┘  └───┬───┘ │
│                                    │     │
│  ┌────────────────────────────────┐│     │
│  │ Tailwind CSS + shadcn/ui      ││     │
│  └────────────────────────────────┘│     │
└────────────────────────────────────┼─────┘
                                     │
        ┌────────────┬───────────────┼──────────┐
        │            │               │          │
   ┌────▼───┐  ┌────▼────┐  ┌──────▼──┐  ┌────▼────┐
   │Supabase│  │ Stripe  │  │ OpenAI  │  │ Vercel  │
   │Auth +  │  │Payments │  │  API    │  │ Deploy  │
   │Usage DB│  │$9/$19/mo│  │ GPT-4o  │  │  Edge   │
   └────────┘  └─────────┘  └─────────┘  └─────────┘
```

## Revenue Model

| Tier | Price | Docs/Month | Features |
|------|-------|-----------|----------|
| Free | $0 | 2 | Basic templates, markdown export |
| Pro | $9/mo | 10 | All templates, PDF + DOCX export |
| Unlimited | $19/mo | Unlimited | Custom branding, template library |

**Target:** $1K MRR within 60 days.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth & DB:** Supabase (magic link auth, usage tracking)
- **AI:** OpenAI API (GPT-4o)
- **Payments:** Stripe Checkout + Customer Portal
- **Hosting:** Vercel (Edge Functions)
- **Export:** react-pdf, docx.js

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in: OPENAI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── generate/         # Proposal form + generation
│   ├── dashboard/        # User's proposals
│   └── api/
│       ├── generate/     # AI generation endpoint
│       ├── stripe/       # Webhook + checkout
│       └── auth/         # Supabase auth callbacks
├── components/           # Reusable UI components
├── lib/                  # Utilities, AI prompts, Supabase client
└── types/                # TypeScript types
```

## License

Proprietary. All rights reserved.
