import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clientName, projectType, scopeBullets, timeline, budgetRange, paymentTerms, yourName, yourCompany } = body;

  // For MVP, generate a template-based proposal (no LLM API key needed)
  const scopeItems = (scopeBullets || "TBD").split("\n").filter((s: string) => s.trim()).map((s: string) => `  - ${s.trim()}`).join("\n");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const fromLine = yourCompany ? `${yourName}, ${yourCompany}` : yourName || "Your Name";

  const proposal = `# Statement of Work

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

  return NextResponse.json({ proposal });
}
