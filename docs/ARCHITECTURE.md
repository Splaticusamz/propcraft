# Architecture — PropCraft

## Overview

PropCraft is a serverless Next.js application deployed on Vercel Edge. It uses AI to transform structured form inputs into professional freelance proposals and SOWs.

## Data Flow

1. **User fills form** → project type, client name, scope bullets, timeline, budget, payment terms
2. **API route** validates input, checks usage quota (Supabase), streams to OpenAI
3. **AI generates** structured proposal in markdown
4. **User reviews/edits** in rich editor
5. **Export** to PDF, DOCX, or copy markdown

## Auth & Usage Tracking

- Supabase Auth with magic link (email-only, no passwords)
- `usage` table: `user_id`, `month`, `doc_count`
- Free tier: 2 docs/month checked server-side before generation

## AI Prompt Strategy

- System prompt defines proposal structure, tone, and formatting
- User input injected as structured JSON
- Output: markdown with clear sections (Executive Summary, Scope, Timeline, Budget, Terms)
- Temperature: 0.7 for professional but not robotic output

## Payment Flow

- Stripe Checkout for subscription creation
- Stripe Customer Portal for management
- Webhook handler for subscription status updates
- Usage limits enforced server-side per billing period
