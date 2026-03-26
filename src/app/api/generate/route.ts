import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function isOpenAIConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY || "";
  return !!key && !key.includes("placeholder") && key.startsWith("sk-");
}

function generateTemplateFallback(body: Record<string, string>): string {
  const { clientName, projectType, scopeBullets, timeline, budgetRange, paymentTerms, yourName, yourCompany } = body;
  const scopeItems = (scopeBullets || "TBD").split("\n").filter((s: string) => s.trim()).map((s: string) => `  - ${s.trim()}`).join("\n");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const fromLine = yourCompany ? `${yourName}, ${yourCompany}` : yourName || "Your Name";

  return `# Statement of Work

**Prepared for:** ${clientName || "[Client Name]"}
**Prepared by:** ${fromLine}
**Date:** ${today}
**Project Type:** ${projectType.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}

---

## 1. Project Overview

This Statement of Work outlines the scope, timeline, and terms for the ${projectType.replace(/-/g, " ")} project for ${clientName || "[Client]"}.

## 2. Scope of Work

The following deliverables are included in this engagement:

${scopeItems || "  - To be defined"}

## 3. Timeline

**Estimated Duration:** ${timeline}

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| Discovery & Planning | Week 1 | Requirements doc, wireframes |
| Development / Execution | Weeks 2-3 | Core deliverables |
| Review & Revisions | Week 4 | Client feedback incorporation |
| Final Delivery | End of ${timeline} | All deliverables + handoff |

## 4. Investment

**Budget Range:** ${budgetRange}

## 5. Payment Terms

${paymentTerms}

## 6. Terms & Conditions

- This SOW is valid for 30 days from the date above.
- Changes to scope will be documented via a Change Order.
- Client will provide timely feedback (within 3 business days).
- All work remains property of ${fromLine} until final payment is received.

## 7. Acceptance

By signing below, both parties agree to the terms outlined in this SOW.

**${fromLine}** — Date: ___________

**${clientName || "[Client Name]"}** — Date: ___________
`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clientName, projectType, scopeBullets, timeline, budgetRange, paymentTerms, yourName, yourCompany } = body;

  // If OpenAI is configured, use it
  if (isOpenAIConfigured()) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const fromLine = yourCompany ? `${yourName}, ${yourCompany}` : yourName || "Your Name";
      const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert freelance business consultant who writes professional Statements of Work (SOW) and proposals. Generate a comprehensive, professional SOW in Markdown format. Include:
1. Project Overview
2. Detailed Scope of Work (expand on the bullet points provided)
3. Timeline with phases
4. Investment/pricing section
5. Payment terms
6. Terms & conditions
7. Acceptance/signature section

Make it sound professional, thorough, and impressive. Use proper markdown formatting with headers (##), bold (**text**), bullet points, and tables where appropriate. Today's date is ${today}.`,
          },
          {
            role: "user",
            content: `Generate a professional Statement of Work with these details:
- Prepared by: ${fromLine}
- Client: ${clientName || "[Client Name]"}
- Project Type: ${projectType.replace(/-/g, " ")}
- Scope/Deliverables: ${scopeBullets || "To be defined"}
- Timeline: ${timeline}
- Budget Range: ${budgetRange}
- Payment Terms: ${paymentTerms}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const proposal = completion.choices[0]?.message?.content || generateTemplateFallback(body);
      return NextResponse.json({ proposal });
    } catch (error) {
      console.error("OpenAI error, falling back to template:", error);
      return NextResponse.json({ proposal: generateTemplateFallback(body) });
    }
  }

  // Fallback to template
  return NextResponse.json({ proposal: generateTemplateFallback(body) });
}
