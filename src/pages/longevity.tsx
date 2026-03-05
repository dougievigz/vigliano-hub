import { Typography, Card, Row, Col, Statistic, Progress, Table } from "antd";
import { HeartOutlined, ThunderboltOutlined, FireOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const LongevityPage = () => {
  const labResults = [
    {
      key: "1",
      biomarker: "HbA1c",
      value: "4.9%",
      status: "Optimal",
      date: "Feb 6, 2026",
    },
    {
      key: "2",
      biomarker: "LDL Cholesterol",
      value: "90 mg/dL",
      status: "Good",
      date: "Feb 6, 2026",
    },
    {
      key: "3",
      biomarker: "eGFR",
      value: "104 mL/min",
      status: "Excellent",
      date: "Feb 6, 2026",
    },
    {
      key: "4",
      biomarker: "hs-CRP",
      value: "15.8 mg/L",
      status: "High (retest needed)",
      date: "Feb 6, 2026",
    },
  ];

  const columns = [
    {
      title: "Biomarker",
      dataIndex: "biomarker",
      key: "biomarker",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>🧬 Longevity Dashboard</Title>
      <Text type="secondary">Track your health metrics, lab results, and optimization experiments</Text>

      {/* Health Score Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card>
            <Title level={3}>Overall Health Score</Title>
            <Progress
              type="circle"
              percent={85}
              size={200}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              format={(percent) => (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "48px", fontWeight: "bold" }}>{percent}</div>
                  <div style={{ fontSize: "16px", color: "#595959" }}>Health Score</div>
                </div>
              )}
            />
            <Typography.Paragraph style={{ marginTop: "16px", textAlign: "center" }}>
              <Text type="success">↑ +5 points vs last month</Text>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Oura Ring Metrics */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Sleep Score"
              value={76}
              suffix="/ 100"
              prefix={<HeartOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
              7.5 hours last night
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Readiness"
              value={66}
              suffix="/ 100"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
              Recovery day recommended
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Activity"
              value={8245}
              prefix={<FireOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
              steps today
            </Typography.Text>
          </Card>
        </Col>
      </Row>

      {/* Lab Results */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Latest Lab Results">
            <Table dataSource={labResults} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>

      {/* Biohacking Experiments */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Active Biohacking Experiments">
            <Typography.Paragraph>
              <strong>GLP-1 Medication:</strong> Day 270+ (started Apr 2025)<br />
              <Text type="secondary">Monitoring weight, energy levels, and appetite</Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Hyperbaric Oxygen Therapy (HBOT):</strong> 1.3 ATA sessions<br />
              <Text type="secondary">3x per week for recovery and cognitive enhancement</Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Creatine Supplementation:</strong> 5g daily<br />
              <Text type="secondary">Muscle recovery and cognitive support</Text>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Data Sources */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card size="small">
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <strong>Data Sources:</strong> LabCorp (Apr 2025), Vibrant America (May 2025), Quest Diagnostics (Feb 2026), Oura Ring API
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
