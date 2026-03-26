# PropCraft Deployment Guide

## Prerequisites
- Node.js 18+
- Vercel account
- Supabase account (optional, for usage tracking)
- Stripe account (optional, for payments)
- OpenAI API key (optional, for AI-powered generation)

## 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new).

## 2. Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for AI generation. Without it, template fallback is used. |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-side only) |
| `STRIPE_SECRET_KEY` | No | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | No | Your production URL |

## 3. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:

```sql
CREATE TABLE usage (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  month text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_usage_user_month ON usage(user_id, month);
```

3. Copy your project URL and keys from Settings → API

## 4. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from Developers → API Keys
3. Set up a webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy the webhook signing secret

## 5. OpenAI Setup

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add it as `OPENAI_API_KEY` in Vercel
3. The app will automatically use GPT-4o-mini for proposal generation

## Local Development

```bash
cp .env.example .env.local
# Fill in your keys
npm install
npm run dev
```
