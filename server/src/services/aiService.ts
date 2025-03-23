import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.OPENROUTER_API_KEY, 
    baseURL: "https://openrouter.ai/api/v1" // OpenRouter base URL
});

export const getAIRecommendations = async (
    title: string,
    metaDescription: string,
    headings: string[],
    altTexts: string[],
    keywords: string[],
    internalLinks: string[],
    externalLinks: string[]
) => {
    console.log("Sending to AI: ", { title, metaDescription, headings, altTexts, keywords, internalLinks, externalLinks });

    const prompt = `
You are an SEO expert analyzing a website's on-page SEO factors. Provide **detailed, actionable** suggestions based on the following parameters:

### **1️⃣ Title Analysis**
- Current title: "${title}"
- Is it optimized for search intent?
- Suggest an **SEO-friendly** title (max 60 characters).
- Include relevant **primary & secondary keywords**.

### **2️⃣ Meta Description**
- Current meta description: "${metaDescription}"
- Is it engaging, relevant, and under 160 characters?
- Suggest an improved **meta description** with keywords to boost CTR.

### **3️⃣ Headings Structure (H1-H6)**
- Extracted headings: "${headings.join(", ")}"
- Are they structured correctly? (H1 for main topic, H2-H6 for subtopics)
- Suggest **improved headings** with keyword placement.

### **4️⃣ Image SEO (Alt Text Optimization)**
- Extracted image alt texts: "${altTexts.join(", ")}"
- Are they **descriptive & keyword-rich**?
- Provide optimized alt text examples.

### **5️⃣ Keyword Optimization**
- Extracted keywords: "${keywords.join(", ")}"
- Are they **relevant & naturally placed** in the content?
- Suggest 3-5 additional **high-ranking** keywords.

### **6️⃣ Internal & External Links**
- **Internal Links**: "${internalLinks.join(", ")}"
- **External Links**: "${externalLinks.join(", ")}"
- Are they used **effectively** to boost authority?
- Recommend best practices for **internal linking & external authority links**.

### **7️⃣ Content & Performance Enhancements**
- Is the content **well-structured, engaging, & easy to read**?
- Are any **SEO elements missing** (schema markup, OpenGraph, canonical tags)?
- Suggest improvements for **page speed, mobile optimization, & user experience**.

💡 **Provide suggestions in bullet points for easy readability.**
`;

    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,  // Increased for more detailed responses
        });

        console.log("AI Response:", response.choices[0]?.message?.content?.trim());
        return response.choices[0]?.message?.content?.trim();
    } catch (error) {
        console.error("AI Error:", error);
        return "AI processing failed.";
    }
};
