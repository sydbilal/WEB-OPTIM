"use client";

import { Card, Progress, Typography } from "antd";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const { Title, Text } = Typography;

interface SEOChartProps {
  score: number; // SEO score (out of 100)
}

export default function SEOChart({ score }: SEOChartProps) {
  const data = [{ name: "SEO Score", value: score }];
  const color = score > 70 ? "#4CAF50" : score > 40 ? "#FFC107" : "#F44336"; // Dynamic bar color

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex flex-col items-center mt-5"
    >
      <Card
        bordered={false}
        style={{
          width: "90%",
          borderRadius: 10,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#f9f9f9",
        }}
      >
        <Title level={4} style={{ textAlign: "center" }}>
          📊 SEO Rating
        </Title>

        <div className="flex flex-col items-center">
          <Progress
            type="dashboard"
            percent={score}
            strokeColor={color}
            format={(percent) => `${percent}%`}
          />

          <Text strong style={{ marginTop: "10px" }}>
            Your SEO Score: <span style={{ color }}>{score}</span>
          </Text>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
