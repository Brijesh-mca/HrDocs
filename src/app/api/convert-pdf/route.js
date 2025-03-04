import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || "John Doe";
    const date = url.searchParams.get("date") || "2025-03-04";
    const id = url.searchParams.get("id") || "default";

    // Read HTML file from public folder
    const htmlPath = path.join(process.cwd(), "public", "offer.html");
    let html = fs.readFileSync(htmlPath, "utf8");

    // Replace placeholders
    html = html.replace(/{{name}}/g, name);
    html = html.replace(/{{date}}/g, date);

    // Convert HTML to PDF using Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // Return the PDF response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="template_${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({error: "Failed to generate PDF" }, { status: 500 });
  }
}

