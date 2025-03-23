import { Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

interface AISuggestionsProps {
  suggestions: string;
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  if (!suggestions) return <Text>No suggestions available.</Text>;

  // Split AI response into sections based on `###` headers or newlines
  const sections = suggestions.split(/\n(?=### )/).filter((s) => s.trim() !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<Title level={4}>🤖 AI Suggestions</Title>}
        bordered={false}
        style={{
          background: "#f0f2f5",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        {sections.map((section, index) => {
          const lines = section.split("\n").filter((line) => line.trim() !== "");

          return (
            <div key={index} style={{ marginBottom: 16 }}>
              {lines.map((line, i) => {
                if (line.startsWith("### ")) {
                  return (
                    <Title key={i} level={5} style={{ marginTop: 12 }}>
                      {line.replace("### ", "")}
                    </Title>
                  );
                } else if (line.startsWith("- ") || line.startsWith("• ")) {
                  return (
                    <ul key={i} style={{ paddingLeft: 20 }}>
                      <li>
                        <Text>{line.replace(/^[-•] /, "")}</Text>
                      </li>
                    </ul>
                  );
                } else {
                  return <Paragraph key={i}>{line}</Paragraph>;
                }
              })}
            </div>
          );
        })}
      </Card>
    </motion.div>
  );
}
