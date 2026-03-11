import { Typography, Card, Row, Col, Statistic, Progress, Table, Tabs, Tag, Collapse, Divider } from "antd";
import { 
  HeartOutlined, 
  ThunderboltOutlined, 
  FireOutlined, 
  ExperimentOutlined,
  MedicineBoxOutlined,
  DashboardOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const LongevityPage = () => {
  // Lab Results Data
  const labResults = [
    {
      key: "1",
      biomarker: "HbA1c (Blood Sugar)",
      value: "4.9%",
      optimal: "< 5.7%",
      status: "optimal",
      date: "Feb 6, 2026",
      trend: "↓",
    },
    {
      key: "2",
      biomarker: "LDL Cholesterol",
      value: "90 mg/dL",
      optimal: "< 100 mg/dL",
      status: "optimal",
      date: "Feb 6, 2026",
      trend: "↓",
    },
    {
      key: "3",
      biomarker: "eGFR (Kidney Function)",
      value: "104 mL/min",
      optimal: "> 90 mL/min",
      status: "excellent",
      date: "Feb 6, 2026",
      trend: "↑",
    },
    {
      key: "4",
      biomarker: "hs-CRP (Inflammation)",
      value: "15.8 mg/L",
      optimal: "< 3 mg/L",
      status: "high",
      date: "Feb 6, 2026 (sick)",
      trend: "⚠️",
    },
    {
      key: "5",
      biomarker: "Nickel (Heavy Metal)",
      value: "23.69 μg/g",
      optimal: "< 3 μg/g",
      status: "high",
      date: "May 7, 2025",
      trend: "⚠️",
    },
  ];

  // Daily Supplement Stack
  const vitamins = [
    { name: "Vitamin A (palmitate)", amount: "2000 mcg", dv: "222%" },
    { name: "Vitamin C (ascorbic acid)", amount: "500 mg", dv: "556%" },
    { name: "Vitamin D3 (cholecalciferol)", amount: "125 mcg", dv: "625%" },
    { name: "Vitamin E (d-alpha tocopheryl)", amount: "150 mg", dv: "1000%" },
    { name: "Vitamin K (phylloquinone)", amount: "80 mcg", dv: "67%" },
    { name: "Vitamin K2 (MK-7)", amount: "100 mcg", dv: "83%" },
    { name: "Thiamin (benfotiamine)", amount: "50 mg", dv: "4167%" },
    { name: "Riboflavin (B2)", amount: "10 mg", dv: "769%" },
    { name: "Niacin (B3)", amount: "15 mg", dv: "94%" },
    { name: "Vitamin B6 (P5P)", amount: "5 mg", dv: "294%" },
    { name: "Folate (methylfolate)", amount: "680 mcg DFE", dv: "170%" },
    { name: "Vitamin B12 (methylcobalamin)", amount: "400 mcg", dv: "16667%" },
    { name: "Biotin", amount: "200 mcg", dv: "667%" },
    { name: "Pantothenic Acid (B5)", amount: "15 mg", dv: "300%" },
  ];

  const minerals = [
    { name: "Iodine (from kelp)", amount: "150 mcg", dv: "100%" },
    { name: "Magnesium (glycinate)", amount: "600 mg", dv: "143%" },
    { name: "Zinc (bisglycinate)", amount: "15 mg", dv: "136%" },
    { name: "Selenium (L-selenomethionine)", amount: "100 mcg", dv: "182%" },
    { name: "Copper (bisglycinate)", amount: "2 mg", dv: "222%" },
    { name: "Manganese (bisglycinate)", amount: "2 mg", dv: "87%" },
    { name: "Chromium (picolinate)", amount: "150 mcg", dv: "429%" },
  ];

  const herbalsNootropics = [
    { name: "Lion's Mane", amount: "500 mg", benefit: "Cognitive function, nerve growth" },
    { name: "Bacopa Monnieri Extract", amount: "250 mg", benefit: "Memory, learning" },
    { name: "L-Theanine", amount: "300 mg", benefit: "Calm focus, stress reduction" },
    { name: "Ginkgo Biloba Extract", amount: "200 mg", benefit: "Circulation, cognition" },
    { name: "Rhodiola Rosea Extract", amount: "250 mg", benefit: "Adaptogen, energy, stress" },
    { name: "Reishi Mushroom", amount: "500 mg", benefit: "Immune support, longevity" },
    { name: "L-Glutathione (Reduced)", amount: "200 mg", benefit: "Master antioxidant" },
    { name: "CoEnzyme Q10", amount: "100 mg", benefit: "Mitochondrial energy, heart" },
    { name: "SAMe", amount: "150 mg", benefit: "Mood, methylation" },
    { name: "Boswellia Serrata", amount: "200 mg", benefit: "Anti-inflammatory" },
    { name: "Quercetin Phytosome", amount: "75 mg", benefit: "Antioxidant, longevity" },
    { name: "Garlic Extract (1% Allicin)", amount: "200 mg", benefit: "Cardiovascular health" },
    { name: "Ginger Root", amount: "200 mg", benefit: "Anti-inflammatory, digestion" },
  ];

  const labColumns = [
    {
      title: "Biomarker",
      dataIndex: "biomarker",
      key: "biomarker",
      width: "30%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text: string, record: any) => (
        <Text strong>{record.trend} {text}</Text>
      ),
    },
    {
      title: "Optimal Range",
      dataIndex: "optimal",
      key: "optimal",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors: Record<string, string> = {
          optimal: "success",
          excellent: "cyan",
          high: "error",
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const supplementColumns = [
    {
      title: "Supplement",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Daily Dose",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "% Daily Value / Benefit",
      key: "dvBenefit",
      render: (_: any, record: any) => record.dv || record.benefit,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>
        <DashboardOutlined /> Longevity Dashboard
      </Title>
      <Text type="secondary">
        Comprehensive health tracking: biomarkers, Oura Ring metrics, supplements, and biohacking experiments
      </Text>

      {/* Health Score Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={8}>
          <Card>
            <Title level={4}>Overall Health Score</Title>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={85}
                size={180}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                format={(percent) => (
                  <div>
                    <div style={{ fontSize: "42px", fontWeight: "bold" }}>{percent}</div>
                    <div style={{ fontSize: "14px", color: "#595959" }}>Health Score</div>
                  </div>
                )}
              />
              <Typography.Paragraph style={{ marginTop: "16px" }}>
                <Text type="success">↑ +5 points vs last month</Text>
              </Typography.Paragraph>
            </div>
          </Card>
        </Col>

        {/* Oura Ring Metrics */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
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
            <Col xs={24} md={12}>
              <Card>
                <Statistic
                  title="HRV (Heart Rate Variability)"
                  value={42}
                  suffix="ms"
                  prefix={<HeartOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  Recovery status: Good
                </Typography.Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Statistic
                  title="Resting Heart Rate"
                  value={58}
                  suffix="bpm"
                  prefix={<HeartOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  Excellent cardiovascular fitness
                </Typography.Text>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Card style={{ marginTop: "24px" }}>
        <Tabs
          defaultActiveKey="labs"
          items={[
            {
              key: "labs",
              label: (
                <span>
                  <ExperimentOutlined /> Lab Results
                </span>
              ),
              children: (
                <div>
                  <Title level={4}>Recent Lab Results</Title>
                  <Table 
                    dataSource={labResults} 
                    columns={labColumns} 
                    pagination={false}
                    size="middle"
                  />
                  <Divider />
                  <Text type="secondary">
                    <strong>Data Sources:</strong> LabCorp (Apr 2025), Vibrant America Heavy Metals (May 2025), Quest Diagnostics (Feb 2026)
                  </Text>
                  <br />
                  <Text type="warning">
                    <strong>⚠️ Action Items:</strong> Retest hs-CRP (post-illness), Continue nickel chelation therapy
                  </Text>
                </div>
              ),
            },
            {
              key: "supplements",
              label: (
                <span>
                  <MedicineBoxOutlined /> Daily Supplements
                </span>
              ),
              children: (
                <div>
                  <Title level={4}>Daily Supplement Stack (9 capsules/day)</Title>
                  
                  <Collapse defaultActiveKey={["vitamins"]} style={{ marginTop: "16px" }}>
                    <Panel header={<strong>💊 Vitamins ({vitamins.length})</strong>} key="vitamins">
                      <Table 
                        dataSource={vitamins} 
                        columns={supplementColumns} 
                        pagination={false}
                        size="small"
                      />
                    </Panel>
                    
                    <Panel header={<strong>⚡ Minerals ({minerals.length})</strong>} key="minerals">
                      <Table 
                        dataSource={minerals} 
                        columns={supplementColumns} 
                        pagination={false}
                        size="small"
                      />
                    </Panel>
                    
                    <Panel header={<strong>🧠 Nootropics & Herbals ({herbalsNootropics.length})</strong>} key="herbals">
                      <Table 
                        dataSource={herbalsNootropics} 
                        columns={supplementColumns} 
                        pagination={false}
                        size="small"
                      />
                    </Panel>
                  </Collapse>

                  <Divider />
                  <Text type="secondary">
                    <strong>Formulation:</strong> Microcrystalline cellulose, hydroxypropyl methylcellulose (vegetarian capsules)
                  </Text>
                  <br />
                  <Text type="secondary">
                    <strong>Contains:</strong> Soy (from other ingredients)
                  </Text>
                </div>
              ),
            },
            {
              key: "biohacking",
              label: (
                <span>
                  <ExperimentOutlined /> Biohacking Experiments
                </span>
              ),
              children: (
                <div>
                  <Title level={4}>Active Interventions</Title>
                  
                  <Card style={{ marginBottom: "16px" }} type="inner" title="💉 GLP-1 Medication">
                    <Typography.Paragraph>
                      <strong>Status:</strong> Day 270+ (started Apr 2025)<br />
                      <strong>Purpose:</strong> Weight optimization, metabolic health<br />
                      <strong>Monitoring:</strong> Weight, energy levels, appetite, blood glucose
                    </Typography.Paragraph>
                  </Card>

                  <Card style={{ marginBottom: "16px" }} type="inner" title="🫧 Hyperbaric Oxygen Therapy (HBOT)">
                    <Typography.Paragraph>
                      <strong>Protocol:</strong> 1.3 ATA sessions, 3x per week<br />
                      <strong>Purpose:</strong> Recovery, cognitive enhancement, anti-aging<br />
                      <strong>Benefits:</strong> Increased tissue oxygenation, neuroplasticity, stem cell mobilization
                    </Typography.Paragraph>
                  </Card>

                  <Card style={{ marginBottom: "16px" }} type="inner" title="💪 Creatine Monohydrate">
                    <Typography.Paragraph>
                      <strong>Dosage:</strong> 5g daily<br />
                      <strong>Purpose:</strong> Muscle recovery, cognitive support, cellular energy<br />
                      <strong>Benefits:</strong> ATP production, brain health, strength gains
                    </Typography.Paragraph>
                  </Card>

                  <Card type="inner" title="☀️ Red Light Therapy (Available at Nuvitru)">
                    <Typography.Paragraph>
                      <strong>Wavelengths:</strong> 660nm (red) + 850nm (near-infrared)<br />
                      <strong>Purpose:</strong> Skin health, mitochondrial function, inflammation reduction<br />
                      <strong>Access:</strong> Available at Nuvitru Wellness clinic
                    </Typography.Paragraph>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Key Health Insights */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="📊 Key Health Insights">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card type="inner" size="small">
                  <Text strong style={{ color: "#52c41a" }}>✅ Strengths</Text>
                  <ul>
                    <li>Excellent kidney function (eGFR: 78 → 104, +33%)</li>
                    <li>Optimal blood sugar control (HbA1c: 4.9%)</li>
                    <li>LDL cholesterol optimized (90 mg/dL)</li>
                    <li>Comprehensive supplement coverage (33 nutrients)</li>
                    <li>Active biohacking protocols (GLP-1, HBOT, creatine)</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card type="inner" size="small">
                  <Text strong style={{ color: "#fa8c16" }}>⚠️ Areas to Monitor</Text>
                  <ul>
                    <li>hs-CRP elevated (15.8 mg/L) - retest post-illness needed</li>
                    <li>Nickel toxicity (23.69 μg/g, &gt;95th percentile) - chelation needed</li>
                    <li>Oura readiness score moderate (66/100) - optimize recovery</li>
                    <li>Some vitamins dosed very high (B12 16,667% DV) - confirm with doctor</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <Card size="small" style={{ marginTop: "24px" }}>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          <strong>Last Updated:</strong> March 11, 2026 | 
          <strong> Data Sources:</strong> Oura Ring API, LabCorp, Vibrant America, Quest Diagnostics, Manual Supplement Entry
        </Text>
      </Card>
    </div>
  );
};
