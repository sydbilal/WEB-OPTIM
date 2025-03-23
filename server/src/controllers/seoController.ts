import puppeteer from "puppeteer";
import { Request, Response } from "express";
import { getAIRecommendations } from "../services/aiService";
import { calculateSEOScore } from "../services/seoService";

export const analyzeSEO = async (req: Request, res: Response): Promise<void> => {
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

    console.log("Final Page URL:", page.url());

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Extract Title
    const title = await page.title();

    // Extract Meta Description
    const metaDescription = await page.evaluate(() => {
      const metaTag = document.querySelector("meta[name='description']");
      return metaTag?.getAttribute("content") ?? "Missing";
    });

    // Extract All Headings (H1-H6)
    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .map((h) => ({
          tag: h.tagName,
          text: h.textContent?.trim() || "",
        }))
        .filter((h) => h.text.length > 0)
    );

    console.log("Extracted Headings:", headings);

    // Extract Image Alt Texts
    const imageAltTexts = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .map((img) => img.getAttribute("alt")?.trim() || "Missing Alt Text")
        .filter((alt) => alt.length > 0)
    );

    console.log("Extracted Image Alt Texts:", imageAltTexts);

    // Extract Keywords from Meta Keywords Tag
    const metaKeywords = await page.evaluate(() => {
      const metaTag = document.querySelector("meta[name='keywords']");
      return metaTag?.getAttribute("content") ?? "No keywords found";
    });

    console.log("Extracted Keywords:", metaKeywords);

    await browser.close();
    console.log("Puppeteer closed");

    // AI SEO Suggestions
    const aiSuggestions =
  (await getAIRecommendations(
    title, 
    metaDescription, 
    headings.map(h => h.text), 
    imageAltTexts,  // Pass extracted alt texts
    metaKeywords.split(",").map(k => k.trim()),  // Convert keywords to an array
    [], // Internal links (Modify if needed)
    []  // External links (Modify if needed)
  )) || "";

    console.log("AI Suggestions generated");

    const seoScore = calculateSEOScore(
      title,
      metaDescription,
      headings.map(h => h.text),
      aiSuggestions
    );

    res.json({
      title,
      metaDescription,
      headings,
      imageAltTexts,
      keywords: metaKeywords,
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
