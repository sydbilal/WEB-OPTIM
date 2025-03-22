export const calculateSEOScore = (title: string, metaDescription: string, headings: string[], aiSuggestions: string) => {
    let score = 100; // Start with 100 points

    // Title length check (Optimal: 50-60 characters)
    if (title.length < 50 || title.length > 60) {
        score -= 10;
    }

    // Meta description length check (Optimal: 150-160 characters)
    if (metaDescription.length < 150 || metaDescription.length > 160) {
        score -= 15;
    }

    // Check if there are headings
    if (headings.length === 0) {
        score -= 10;
    }

    // AI Suggestions check (If AI suggests major improvements, reduce score)
    if (aiSuggestions.toLowerCase().includes("improve")) {
        score -= 15;
    }

    // Ensure score is within range
    return Math.max(0, Math.min(score, 100));
};
