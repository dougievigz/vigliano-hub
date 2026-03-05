import { useState, useEffect } from "react";
import { Card, Input, Button, Typography, Space } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CORRECT_PASSWORD = "Vigliano2026!";
const SESSION_KEY = "vigliano_auth";

export const PasswordProtect = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem(SESSION_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <LockOutlined style={{ fontSize: 48, color: "#1890ff" }} />
            <Title level={2} style={{ marginTop: 16 }}>
              🏠 Vigliano Hub
            </Title>
            <Text type="secondary">Enter password to access dashboard</Text>
          </div>

          <form onSubmit={handleSubmit}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Input.Password
                size="large"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined />}
                status={error ? "error" : ""}
              />
              {error && <Text type="danger">{error}</Text>}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
              >
                Access Dashboard
              </Button>
            </Space>
          </form>

          <div style={{ textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Password protected • Contact Doug for access
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};
