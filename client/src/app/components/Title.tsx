import { Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title: AntTitle, Text } = Typography;

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title={<AntTitle level={4}>🏷️ Title</AntTitle>}
        bordered={false}
        style={{
          background: "#f0f2f5",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text>{title || "No title found"}</Text>
      </Card>
    </motion.div>
  );
}
