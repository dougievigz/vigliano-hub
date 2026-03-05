import { Typography, Card } from "antd";
const { Title } = Typography;
export const OpenClawPage = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>🦞 OpenClaw Dashboard</Title>
    <Card><Typography.Paragraph>Session status, memory usage, token consumption coming soon...</Typography.Paragraph></Card>
  </div>
);
