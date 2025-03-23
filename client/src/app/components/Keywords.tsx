import { Card, List, Typography } from "antd";
import { motion } from "framer-motion";

const { Title: AntTitle, Text } = Typography;

interface KeywordsProps {
  keywords: string[];
}

export default function Keywords({ keywords }: KeywordsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<AntTitle level={4}>🔑 Extracted Keywords</AntTitle>}
        bordered={false}
        style={{
          background: "#f0f2f5",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {keywords.length > 0 ? (
          <List
            dataSource={keywords}
            renderItem={(keyword, index) => (
              <List.Item>
                <Text>{index + 1}. {keyword}</Text>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No keywords found</Text>
        )}
      </Card>
    </motion.div>
  );
}
