import puppeteer from "puppeteer";
import { Request, Response } from "express";
import { getAIRecommendations } from "../services/aiService";
import { calculateSEOScore } from "../services/seoService";

export const analyzeSEO = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { url } = req.body;
    console.log("Received URL:", url);
    if (!url) {
      console.log("Error: URL is missing");
      res.status(400).json({ error: "URL is required" });
      return;
    }

    const browser = await puppeteer.launch();
    console.log("Puppeteer launched");

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    console.log("Page loaded");

    console.log("Final Page URL:", page.url()); // Debugging redirections

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const title = await page.title();
    const metaDescription = await page.evaluate(() => {
      const metaTag = document.querySelector("meta[name='description']");
      return metaTag?.getAttribute("content") ?? "Missing"; // Ensures it is always a string
    });

    await page
      .waitForSelector("h1, h2", { timeout: 5000 })
      .catch(() => console.log("No headings found"));

    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2"))
        .map((h) => h.textContent?.trim() || "")
        .filter((text) => text.length > 0)
    );

    console.log("Extracted Headings:", headings);

    await browser.close();
    console.log("Puppeteer closed");

    // Ensure aiSuggestions is always a string
    const aiSuggestions =
      (await getAIRecommendations(title, metaDescription, headings)) || "";

    console.log("AI Suggestions generated");

    const seoScore = calculateSEOScore(
      title,
      metaDescription,
      headings,
      aiSuggestions
    );

    res.json({
      title,
      metaDescription,
      headings,
      suggestions: aiSuggestions,
      seoScore,
    });
  } catch (error: any) {
    console.error("SEO Analysis Error:", error.message);
    res
      .status(500)
      .json({ error: "SEO Analysis Failed", details: error.message });
  }
};
