import { useState, useEffect } from "react";
import { Typography, Card, Row, Col, Statistic, Progress, Table, Tabs, Tag, Collapse, Divider, Spin, Alert, Timeline, Badge, Tooltip } from "antd";
import { 
  HeartOutlined, 
  ThunderboltOutlined, 
  FireOutlined, 
  ExperimentOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
  ReloadOutlined,
  CalendarOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const LongevityPage = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch health data
  const fetchHealthData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/health-summary');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setHealthData(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch health data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchHealthData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchHealthData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Lab Results Data (static for now, will come from API)
  const labResults = [
    {
      key: "1",
      biomarker: "HbA1c (Blood Sugar)",
      value: healthData?.labs?.hba1c?.value ? `${healthData.labs.hba1c.value}%` : "4.9%",
      optimal: "< 5.7%",
      status: healthData?.labs?.hba1c?.status || "optimal",
      date: healthData?.labs?.hba1c?.date || "Feb 6, 2026",
      trend: "↓",
    },
    {
      key: "2",
      biomarker: "LDL Cholesterol",
      value: healthData?.labs?.ldl?.value ? `${healthData.labs.ldl.value} mg/dL` : "90 mg/dL",
      optimal: "< 100 mg/dL",
      status: healthData?.labs?.ldl?.status || "optimal",
      date: healthData?.labs?.ldl?.date || "Feb 6, 2026",
      trend: "↓",
    },
    {
      key: "3",
      biomarker: "eGFR (Kidney Function)",
      value: healthData?.labs?.egfr?.value ? `${healthData.labs.egfr.value} mL/min` : "104 mL/min",
      optimal: "> 90 mL/min",
      status: healthData?.labs?.egfr?.status || "excellent",
      date: healthData?.labs?.egfr?.date || "Feb 6, 2026",
      trend: "↑",
    },
    {
      key: "4",
      biomarker: "hs-CRP (Inflammation)",
      value: healthData?.labs?.hscrp?.value ? `${healthData.labs.hscrp.value} mg/L` : "15.8 mg/L",
      optimal: "< 3 mg/L",
      status: healthData?.labs?.hscrp?.status || "high",
      date: healthData?.labs?.hscrp?.date || "Feb 6, 2026 (sick)",
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

  // Daily Supplement Stack (unchanged)
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

  if (loading && !healthData) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
        <p style={{ marginTop: "16px" }}>Loading health data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Title level={2}>
            <DashboardOutlined /> Longevity Dashboard
          </Title>
          <Text type="secondary">
            Real-time health tracking: biomarkers, Oura Ring metrics, supplements, and biohacking experiments
          </Text>
        </div>
        <div>
          <button 
            onClick={fetchHealthData} 
            disabled={loading}
            style={{ 
              padding: "8px 16px", 
              cursor: loading ? "not-allowed" : "pointer",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "white"
            }}
          >
            <ReloadOutlined spin={loading} /> Refresh
          </button>
          {lastUpdated && (
            <div style={{ fontSize: "12px", color: "#8c8c8c", marginTop: "4px" }}>
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {error && (
        <Alert
          message="Failed to load health data"
          description={error}
          type="warning"
          showIcon
          closable
          style={{ marginTop: "16px" }}
        />
      )}

      {/* Health Score Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={8}>
          <Card>
            <Title level={4}>Overall Health Score</Title>
            <div style={{ textAlign: "center" }}>
              <Progress
                type="circle"
                percent={healthData?.health_score || 85}
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
                <Text type="success">↑ Live from Oura + Labs</Text>
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
                  value={healthData?.oura?.sleep?.score || 76}
                  suffix="/ 100"
                  prefix={<HeartOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  {healthData?.oura?.sleep?.duration_hours || 7.5} hours last night
                </Typography.Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Readiness"
                  value={healthData?.oura?.readiness?.score || 66}
                  suffix="/ 100"
                  prefix={<ThunderboltOutlined />}
                  valueStyle={{ color: "#fa8c16" }}
                />
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  {healthData?.oura?.readiness?.score > 70 ? 'Ready to train' : 'Recovery day recommended'}
                </Typography.Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Activity"
                  value={healthData?.oura?.activity?.steps || 8245}
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
                  value={healthData?.oura?.hrv?.value || 42}
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
                  value={healthData?.oura?.resting_heart_rate?.value || 58}
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
              key: "peptides",
              label: (
                <span>
                  💉 Peptide Protocol
                </span>
              ),
              children: (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <Title level={4} style={{ margin: 0 }}>Peptide Stack & Cycling Protocol</Title>
                    <Tag color="green">6 Active Peptides</Tag>
                  </div>

                  <Text type="secondary" style={{ display: "block", marginBottom: "24px" }}>
                    Subcutaneous injection protocol. Rotate injection sites (abdomen, thighs). Store all vials refrigerated.
                  </Text>

                  {/* Protocol Overview Cards */}
                  <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
                    <Col xs={24} md={8}>
                      <Card size="small" style={{ background: "#f0f5ff", borderColor: "#adc6ff" }}>
                        <Statistic title="Current Phase" value="Metabolic" valueStyle={{ fontSize: "20px", color: "#1890ff" }} />
                        <Text type="secondary" style={{ fontSize: "12px" }}>Weeks 1-4: Fat loss + energy focus</Text>
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card size="small" style={{ background: "#f6ffed", borderColor: "#b7eb8f" }}>
                        <Statistic title="Injection Days" value="Mon-Fri" valueStyle={{ fontSize: "20px", color: "#52c41a" }} />
                        <Text type="secondary" style={{ fontSize: "12px" }}>5 on / 2 off (Sat-Sun rest)</Text>
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card size="small" style={{ background: "#fff7e6", borderColor: "#ffd591" }}>
                        <Statistic title="Next Bloodwork" value="Apr 15" valueStyle={{ fontSize: "20px", color: "#fa8c16" }} />
                        <Text type="secondary" style={{ fontSize: "12px" }}>CMP + CBC + hormones recommended</Text>
                      </Card>
                    </Col>
                  </Row>

                  {/* Peptide Details Table */}
                  <Table
                    dataSource={[
                      {
                        key: "1",
                        peptide: "NAD+",
                        concentration: "100mg/mL",
                        dose: "100-200mg (0.1-0.2mL)",
                        frequency: "Daily (AM)",
                        timing: "Morning, fasted",
                        cycle: "Continuous",
                        category: "foundation",
                        purpose: "Cellular energy, DNA repair, mitochondrial function, anti-aging",
                        pharmacy: "Optimal Balance Pharmacy",
                      },
                      {
                        key: "2",
                        peptide: "BPC-157 / TB-500",
                        concentration: "3mg/3mg per mL",
                        dose: "250-500mcg BPC + 1-2mg TB (0.1-0.15mL)",
                        frequency: "Daily (PM)",
                        timing: "Evening, near injury site if applicable",
                        cycle: "4-8 weeks on, 2-4 weeks off",
                        category: "recovery",
                        purpose: "Gut healing, tendon/ligament repair, systemic inflammation reduction",
                        pharmacy: "Compounding pharmacy",
                      },
                      {
                        key: "3",
                        peptide: "AOD / Mots-C / Tesa / IPA",
                        concentration: "2mg each per mL",
                        dose: "0.25-0.5mL (0.5-1mg each peptide)",
                        frequency: "Daily (AM)",
                        timing: "Morning, fasted, 30 min before exercise",
                        cycle: "4 weeks on, 2 weeks off",
                        category: "metabolic",
                        purpose: "Fat metabolism (AOD), mitochondrial (Mots-C), GH release (Tesa), GH secretagogue (IPA)",
                        pharmacy: "Compounding pharmacy",
                      },
                      {
                        key: "4",
                        peptide: "GHK-Cu / Epithalon",
                        concentration: "10mg/2mg per mL",
                        dose: "0.1-0.2mL (1-2mg GHK, 0.2-0.4mg Epithalon)",
                        frequency: "Daily (PM)",
                        timing: "Evening before bed",
                        cycle: "10-20 day Epithalon cycles, 4-6 month gap",
                        category: "longevity",
                        purpose: "Collagen synthesis, wound healing (GHK-Cu), telomere lengthening, pineal gland (Epithalon)",
                        pharmacy: "Optimal Balance Pharmacy",
                      },
                      {
                        key: "5",
                        peptide: "Thymosin Alpha-1",
                        concentration: "3mg/mL",
                        dose: "1-1.6mg (0.33-0.5mL)",
                        frequency: "2-3x/week",
                        timing: "Morning",
                        cycle: "4-8 weeks on, 4 weeks off",
                        category: "immune",
                        purpose: "Immune modulation, T-cell activation, anti-viral, anti-tumor",
                        pharmacy: "Optimal Balance Pharmacy",
                      },
                      {
                        key: "6",
                        peptide: "Melanotan II",
                        concentration: "2mg/mL",
                        dose: "0.25-0.5mg (loading), 0.5-1mg (maintenance 2x/wk)",
                        frequency: "Load 5-7 days, then 2x/week",
                        timing: "Evening (may cause nausea/flushing)",
                        cycle: "Seasonal (spring/summer), 2-3 months off",
                        category: "aesthetic",
                        purpose: "Melanogenesis (tanning), mild appetite suppression",
                        pharmacy: "Grand Ave Pharmacy (exp 03/30)",
                      },
                    ]}
                    columns={[
                      {
                        title: "Peptide",
                        dataIndex: "peptide",
                        key: "peptide",
                        width: "15%",
                        render: (text: string, record: any) => (
                          <div>
                            <Text strong>{text}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: "11px" }}>{record.concentration}</Text>
                          </div>
                        ),
                      },
                      {
                        title: "Dose",
                        dataIndex: "dose",
                        key: "dose",
                        width: "18%",
                        render: (text: string) => <Text style={{ fontSize: "13px" }}>{text}</Text>,
                      },
                      {
                        title: "Frequency",
                        dataIndex: "frequency",
                        key: "frequency",
                        width: "12%",
                        render: (text: string, record: any) => (
                          <Tooltip title={record.timing}>
                            <Tag color="blue">{text}</Tag>
                          </Tooltip>
                        ),
                      },
                      {
                        title: "Cycle",
                        dataIndex: "cycle",
                        key: "cycle",
                        width: "18%",
                        render: (text: string) => <Text style={{ fontSize: "13px" }}>{text}</Text>,
                      },
                      {
                        title: "Category",
                        dataIndex: "category",
                        key: "category",
                        width: "10%",
                        render: (cat: string) => {
                          const colors: Record<string, string> = {
                            foundation: "purple",
                            recovery: "green",
                            metabolic: "orange",
                            longevity: "cyan",
                            immune: "blue",
                            aesthetic: "magenta",
                          };
                          return <Tag color={colors[cat]}>{cat.toUpperCase()}</Tag>;
                        },
                      },
                      {
                        title: "Purpose",
                        dataIndex: "purpose",
                        key: "purpose",
                        render: (text: string) => <Text style={{ fontSize: "12px" }}>{text}</Text>,
                      },
                    ]}
                    pagination={false}
                    size="small"
                    expandable={{
                      expandedRowRender: (record: any) => (
                        <div style={{ padding: "8px 0" }}>
                          <Text><strong>Timing:</strong> {record.timing}</Text><br />
                          <Text><strong>Pharmacy:</strong> {record.pharmacy}</Text>
                        </div>
                      ),
                    }}
                  />

                  <Divider />

                  {/* Cycling Calendar */}
                  <Title level={5}><CalendarOutlined /> 10-Week Cycling Protocol</Title>
                  <Text type="secondary" style={{ display: "block", marginBottom: "16px" }}>
                    Rotating focus blocks to prevent receptor desensitization and optimize results.
                  </Text>

                  <Timeline
                    items={[
                      {
                        color: "orange",
                        children: (
                          <Card size="small" style={{ background: "#fff7e6" }}>
                            <Text strong>Weeks 1-4: Metabolic Phase</Text>
                            <div style={{ marginTop: "8px" }}>
                              <Tag color="purple">NAD+ (daily AM)</Tag>
                              <Tag color="orange">AOD/Mots-C/Tesa/IPA (daily AM)</Tag>
                              <Tag color="green">BPC-157/TB-500 (daily PM)</Tag>
                              <Tag color="blue">Thymosin Alpha-1 (2-3x/wk)</Tag>
                            </div>
                            <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
                              Focus: Fat metabolism, energy optimization, gut healing
                            </Text>
                          </Card>
                        ),
                      },
                      {
                        color: "cyan",
                        children: (
                          <Card size="small" style={{ background: "#e6fffb" }}>
                            <Text strong>Weeks 5-8: Longevity Phase</Text>
                            <div style={{ marginTop: "8px" }}>
                              <Tag color="purple">NAD+ (daily AM)</Tag>
                              <Tag color="cyan">GHK-Cu/Epithalon (daily PM)</Tag>
                              <Tag color="green">BPC-157/TB-500 (daily PM)</Tag>
                              <Tag color="blue">Thymosin Alpha-1 (2-3x/wk)</Tag>
                            </div>
                            <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
                              Focus: Telomere support, collagen synthesis, immune system, tissue repair
                            </Text>
                          </Card>
                        ),
                      },
                      {
                        color: "red",
                        children: (
                          <Card size="small" style={{ background: "#fff1f0" }}>
                            <Text strong>Weeks 9-10: Reset Phase</Text>
                            <div style={{ marginTop: "8px" }}>
                              <Tag color="purple">NAD+ only (daily AM)</Tag>
                            </div>
                            <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
                              All other peptides OFF. Prevent receptor desensitization. Recommended: bloodwork (CMP, CBC, hormones, IGF-1).
                            </Text>
                          </Card>
                        ),
                      },
                      {
                        color: "green",
                        children: (
                          <Card size="small" style={{ background: "#f6ffed" }}>
                            <Text strong>Then: Repeat from Week 1</Text>
                            <Text type="secondary" style={{ fontSize: "12px", display: "block", marginTop: "8px" }}>
                              Adjust doses based on bloodwork and subjective response. Continue indefinitely.
                            </Text>
                          </Card>
                        ),
                      },
                    ]}
                  />

                  <Divider />

                  {/* Melanotan Protocol (Separate - Seasonal) */}
                  <Card type="inner" title="☀️ Melanotan II (Seasonal Protocol)" style={{ marginBottom: "16px" }}>
                    <Timeline
                      items={[
                        {
                          color: "orange",
                          children: <Text><strong>Loading (Days 1-7):</strong> 0.25mg SubQ daily, evening. May cause nausea/flushing. Take with food if needed.</Text>,
                        },
                        {
                          color: "blue",
                          children: <Text><strong>Maintenance:</strong> 0.5-1mg SubQ, 2x/week before UV exposure. Combine with 15-20 min sun or low-bed tanning.</Text>,
                        },
                        {
                          color: "gray",
                          children: <Text><strong>Off-Season:</strong> Discontinue 2-3 months (fall/winter). Tan will fade gradually. Resume loading phase in spring.</Text>,
                        },
                      ]}
                    />
                  </Card>

                  {/* Safety Notes */}
                  <Card type="inner" title="⚠️ Safety & Monitoring" style={{ background: "#fffbe6", borderColor: "#ffe58f" }}>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      <li><Text>Never mix peptides in the same syringe unless verified compatible</Text></li>
                      <li><Text>Rotate injection sites: abdomen (2 inches from navel), outer thigh, upper arm</Text></li>
                      <li><Text>Use insulin syringes (29-31 gauge) for SubQ injections</Text></li>
                      <li><Text>Reconstituted peptides: refrigerate, use within 30 days</Text></li>
                      <li><Text>Get bloodwork every 3-6 months: CMP, CBC, IGF-1, kidney/liver function</Text></li>
                      <li><Text>Track subjective response: energy, sleep quality, recovery, mood in Oura data</Text></li>
                      <li><Text><strong>Melanotan II:</strong> Start VERY low (0.25mg). Watch for nausea, mole changes, blood pressure</Text></li>
                      <li><Text><strong>Epithalon:</strong> Use in short 10-20 day cycles. Extended use not well studied</Text></li>
                    </ul>
                  </Card>
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
                    <li>Oura readiness score moderate ({healthData?.oura?.readiness?.score || 66}/100) - optimize recovery</li>
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
          <strong>Last API Update:</strong> {lastUpdated?.toLocaleString() || 'Loading...'} | 
          <strong> Data Sources:</strong> Oura Ring API (live), LabCorp, Vibrant America, Quest Diagnostics, Manual Supplement Entry |
          <strong> Auto-refresh:</strong> Every 5 minutes
        </Text>
      </Card>
    </div>
  );
};
