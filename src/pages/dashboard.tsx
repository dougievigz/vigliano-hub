import { Typography, Row, Col, Card, Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const DashboardPage = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>🏠 Vigliano Hub Dashboard</Title>
      <Typography.Paragraph>
        Welcome to your personal command center. Choose a workspace from the sidebar to get started.
      </Typography.Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Health Score"
              value={85}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="/ 100"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Net Worth"
              value={1234567}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={5}
              precision={0}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="System Uptime"
              value="5 days"
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Quick Access">
            <Typography.Paragraph>
              <strong>🧬 Longevity:</strong> Track your health metrics, lab results, and biohacking experiments
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>💰 Finance:</strong> Monitor net worth, account balances, and budget
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>🏠 Personal Life:</strong> Family calendar, kids' activities, and household tasks
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>🌱 Nuvitru:</strong> Business analytics and client metrics
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
