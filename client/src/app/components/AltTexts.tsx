import { Card, List, Typography } from "antd";
import { motion } from "framer-motion";

const { Title: AntTitle, Text } = Typography;

interface AltTextsProps {
  altTexts: string[];
}

export default function AltTexts({ altTexts = [] }: AltTextsProps) {
    return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<AntTitle level={4}>🖼️ Alt Texts</AntTitle>}
        bordered={false}
        style={{
          background: "#f0f2f5",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {altTexts.length > 0 ? (
          <List
            dataSource={altTexts}
            renderItem={(altText, index) => (
              <List.Item>
                <Text>{index + 1}. {altText}</Text>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No alt texts found</Text>
        )}
      </Card>
    </motion.div>
  );
}
