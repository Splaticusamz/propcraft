import jsPDF from "jspdf";

/**
 * Convert markdown-ish proposal text to a clean PDF and trigger download.
 */
export function exportProposalToPDF(markdown: string, filename = "proposal.pdf") {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const lines = markdown.split("\n");

  for (const line of lines) {
    // Check if we need a new page
    if (y > 270) {
      doc.addPage();
      y = margin;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith("# ")) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(trimmed.replace(/^# /, ""), margin, y);
      y += 10;
    } else if (trimmed.startsWith("## ")) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      y += 4;
      doc.text(trimmed.replace(/^## /, ""), margin, y);
      y += 8;
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(trimmed.replace(/\*\*/g, ""), margin, y);
      y += 6;
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("  - ")) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const indent = trimmed.startsWith("  ") ? margin + 6 : margin + 3;
      const bullet = trimmed.replace(/^\s*-\s*/, "• ");
      const wrapped = doc.splitTextToSize(bullet, maxWidth - (indent - margin));
      doc.text(wrapped, indent, y);
      y += wrapped.length * 5;
    } else if (trimmed.startsWith("---")) {
      y += 2;
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;
    } else if (trimmed.startsWith("|")) {
      // Simple table row
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const cells = trimmed.split("|").filter(c => c.trim() && !c.match(/^[-\s]+$/));
      if (cells.length > 0 && !cells[0].match(/^[-\s]+$/)) {
        const cellText = cells.map(c => c.trim()).join("  |  ");
        doc.text(cellText, margin, y);
        y += 5;
      }
    } else if (trimmed === "") {
      y += 3;
    } else {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      // Handle inline bold
      const cleanText = trimmed.replace(/\*\*(.*?)\*\*/g, "$1");
      const wrapped = doc.splitTextToSize(cleanText, maxWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 5;
    }
  }

  doc.save(filename);
}
