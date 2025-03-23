import { Card, List, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

interface Heading {
  tag: string;
  text: string;
}

interface HeadingsProps {
  headings: Heading[];
}

export default function Headings({ headings }: HeadingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<Title level={4}>📌 Extracted Headings</Title>}
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
                <Title level={getTitleLevel(heading.tag)}>
                  {index + 1}. {heading.text}
                </Title>
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

// Helper function to convert "H1", "H2", etc. to Ant Design Title levels
function getTitleLevel(tag: string): 1 | 2 | 3 | 4 | 5 | 6 {
  const level = parseInt(tag.replace("H", ""), 10);
  return (level >= 1 && level <= 6 ? level : 5) as 1 | 2 | 3 | 4 | 5 | 6;
}
