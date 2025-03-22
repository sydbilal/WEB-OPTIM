"use client";

import { useState } from "react";
import { Input, Button, Card, Spin, Typography, Space } from "antd";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import MetaDescription from "../components/MetaDescription";
import Headings from "../components/Headings";
import AISuggestions from "../components/AISuggestions";
import SEOChart from "../components/SeoChart";

const { Title: AntTitle, Text } = Typography;

interface SEOResult {
  title: string;
  metaDescription: string;
  headings: string[];
  suggestions: string;
  seoScore: number;
}

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [result, setResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const analyzeSEO = async () => {
    setLoading(true);
    setStep(2);

    const res = await fetch("http://localhost:5000/api/seo/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data: SEOResult = await res.json();
    setResult(data);
    setLoading(false);
    setStep(3);
  };

  const resetSEOCheck = () => {
    setUrl("");
    setResult(null);
    setStep(1);
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="flex flex-col items-center mt-20 p-10 space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <AntTitle level={2} className="mb-6">🚀 SEO Optimizer</AntTitle>
        </motion.div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Space direction="vertical" className="mt-3">
            <Text className="text-lg">🔎 Step 1: Enter your website URL to analyze its SEO.</Text>
            
              <Input
                className="w-80"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button type="primary" onClick={analyzeSEO} disabled={loading || !url}>
                {loading ? <Spin /> : "Analyze"}
              </Button>
            </Space>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Text className="text-lg">⏳ Step 2: Analyzing SEO for <strong>{url.length > 15 ? url.slice(0, 15) + "..." : url}</strong>...</Text>
            <Spin size="large" className="mt-3" />
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }} 
            className="w-full flex flex-col items-center space-y-6"
          >
            <Card className="w-96 shadow-lg p-6 space-y-7">
              <Text className="text-lg ">✅ Step 3: SEO Analysis Complete!</Text>

              {/* SEO Components with Spacing */}
              <div className="space-y-7 ">
                <Title title={result.title} />
                <MetaDescription metaDescription={result.metaDescription} />
                <Headings headings={result.headings} />
                <AISuggestions suggestions={result.suggestions} />
                <SEOChart score={result.seoScore} />
              </div>

              {/* AI-based Fixing */}
              <div className="mt-6 text-center flex flex-col">
                <Text className="text-lg">🤖 Step 4: Let AI optimize your SEO for better rankings!</Text>
                <Button type="primary" className="mt-3" onClick={() => alert("AI will now suggest SEO fixes!")}>
                  Optimize with AI
                </Button>
              </div>

              {/* Check Another Website Button */}
              <div className="mt-6 text-center">
                <Button danger className="mt-3" onClick={resetSEOCheck}>
                  🔄 Check Another Website
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
