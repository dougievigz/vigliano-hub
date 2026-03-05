import { Typography, Card } from "antd";
const { Title } = Typography;
export const SystemHealthPage = () => (
  <div style={{ padding: "24px" }}>
    <Title level={2}>🔍 System Health Dashboard</Title>
    <Card><Typography.Paragraph>Mac Mini uptime, CPU/memory usage, disk space, services status coming soon...</Typography.Paragraph></Card>
  </div>
);
