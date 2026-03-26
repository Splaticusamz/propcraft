#!/usr/bin/env npx ts-node
/**
 * Seed proposal templates into src/data/templates.json
 * Run: npx ts-node scripts/seed-templates.ts
 */
import * as fs from "fs";
import * as path from "path";

const templates = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Full-stack web development projects",
    defaultScope: "Homepage design and development\nResponsive mobile layout\nCMS integration\nSEO optimization\nPerformance optimization\nBrowser testing & QA",
    defaultTimeline: "4-6 weeks",
    defaultBudget: "$3,000 - $10,000",
    defaultPaymentTerms: "30% upfront, 40% at midpoint, 30% on delivery",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description: "Brand identity, visual design, and creative assets",
    defaultScope: "Logo design (3 concepts, 2 revision rounds)\nBrand style guide\nBusiness card design\nSocial media templates\nLetterhead & envelope design",
    defaultTimeline: "2-3 weeks",
    defaultBudget: "$1,500 - $5,000",
    defaultPaymentTerms: "50% upfront, 50% on delivery",
  },
  {
    id: "marketing",
    name: "Marketing Campaign",
    description: "Digital marketing and campaign management",
    defaultScope: "Market research & competitor analysis\nCampaign strategy document\nContent calendar (3 months)\nAd creative design\nPerformance tracking setup\nMonthly reporting",
    defaultTimeline: "3-6 months",
    defaultBudget: "$2,000 - $8,000/month",
    defaultPaymentTerms: "Monthly retainer, billed at start of each month",
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Business, technology, or strategy consulting",
    defaultScope: "Discovery & assessment (2-3 sessions)\nCurrent state analysis report\nStrategic recommendations document\nImplementation roadmap\nFollow-up review session",
    defaultTimeline: "2-4 weeks",
    defaultBudget: "$150 - $300/hour",
    defaultPaymentTerms: "Billed weekly, net 15",
  },
  {
    id: "general-freelance",
    name: "General Freelance",
    description: "Flexible template for any freelance project",
    defaultScope: "Project requirements gathering\nCore deliverables (as discussed)\nRevision rounds (up to 2)\nFinal delivery & handoff\nPost-delivery support (1 week)",
    defaultTimeline: "2-4 weeks",
    defaultBudget: "$1,000 - $5,000",
    defaultPaymentTerms: "50% upfront, 50% on delivery",
  },
];

const outPath = path.join(__dirname, "..", "src", "data", "templates.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(templates, null, 2) + "\n");
console.log(`✅ Seeded ${templates.length} templates to ${outPath}`);
