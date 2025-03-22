import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.OPENROUTER_API_KEY, 
    baseURL: "https://openrouter.ai/api/v1" // OpenRouter base URL
});

export const getAIRecommendations = async (title: string, metaDescription: string, headings: string[]) => {
    console.log("Sending to AI: ", { title, metaDescription, headings });

    const prompt = `Analyze this website's SEO through Title, Meta Description, and Headings and provide improvement suggestions.
    Title: ${title}
    Meta Description: ${metaDescription}
    Headings: ${headings.join(", ")}

    Provide SEO improvement suggestions in details. in points`;

    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo", // Free model on OpenRouter
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
        });

        console.log("AI Response:", response.choices[0]?.message?.content?.trim());
        return response.choices[0]?.message?.content?.trim();
    } catch (error) {
        console.error("AI Error:", error);
        return "AI processing failed.";
    }
};
