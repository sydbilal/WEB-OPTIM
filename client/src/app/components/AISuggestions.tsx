import { Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

interface AISuggestionsProps {
  suggestions: string;
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
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
        }}
      >
        <Text>{suggestions || "No suggestions available"}</Text>
      </Card>
    </motion.div>
  );
}
