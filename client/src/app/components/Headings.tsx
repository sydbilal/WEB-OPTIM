import { Card, List, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

interface HeadingsProps {
  headings: string[];
}

export default function Headings({ headings }: HeadingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<Title level={4}>📌 Headings</Title>}
        bordered={false}
        style={{
          background: "#f0f2f5",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {headings.length > 0 ? (
          <List
            dataSource={headings}
            renderItem={(heading, index) => (
              <List.Item>
                <Text strong>{index + 1}. {heading}</Text>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No headings found</Text>
        )}
      </Card>
    </motion.div>
  );
}
