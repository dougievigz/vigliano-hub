import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";

// Dashboard pages
import { DashboardPage } from "./pages/dashboard";
import { LongevityPage } from "./pages/longevity";
import { FinancePage } from "./pages/finance";
import { PersonalPage } from "./pages/personal";
import { NuvitruPage } from "./pages/nuvitru";
import { FractionalPage } from "./pages/fractional";
import { VibrantPage } from "./pages/vibrant";
import { AgenticAIPage } from "./pages/agentic-ai";
import { CronJobsPage } from "./pages/cron-jobs";
import { OpenClawPage } from "./pages/openclaw";
import { SystemHealthPage } from "./pages/system-health";
import { WorkspacePage } from "./pages/workspace";

// Simple data provider (we'll enhance this later)
const dataProvider: any = {
  getList: async () => ({ data: [], total: 0 }),
  getOne: async () => ({ data: {} }),
  create: async () => ({ data: {} }),
  update: async () => ({ data: {} }),
  deleteOne: async () => ({ data: {} }),
  getApiUrl: () => "",
};

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: "🏠",
                },
              },
              {
                name: "longevity",
                list: "/longevity",
                meta: {
                  label: "Longevity",
                  icon: "🧬",
                },
              },
              {
                name: "finance",
                list: "/finance",
                meta: {
                  label: "Finance",
                  icon: "💰",
                },
              },
              {
                name: "personal",
                list: "/personal",
                meta: {
                  label: "Personal Life",
                  icon: "🏠",
                },
              },
              {
                name: "nuvitru",
                list: "/nuvitru",
                meta: {
                  label: "Nuvitru",
                  icon: "🌱",
                },
              },
              {
                name: "fractional",
                list: "/fractional",
                meta: {
                  label: "FraXtional CMO",
                  icon: "💼",
                },
              },
              {
                name: "vibrant",
                list: "/vibrant",
                meta: {
                  label: "Vibrant",
                  icon: "🔬",
                },
              },
              {
                name: "agentic-ai",
                list: "/agentic-ai",
                meta: {
                  label: "Agentic AI",
                  icon: "🦾",
                },
              },
              {
                name: "cron-jobs",
                list: "/cron-jobs",
                meta: {
                  label: "Cron Jobs",
                  icon: "🔧",
                },
              },
              {
                name: "openclaw",
                list: "/openclaw",
                meta: {
                  label: "OpenClaw",
                  icon: "🦞",
                },
              },
              {
                name: "system-health",
                list: "/system-health",
                meta: {
                  label: "System Health",
                  icon: "🔍",
                },
              },
              {
                name: "workspace",
                list: "/workspace",
                meta: {
                  label: "Workspace",
                  icon: "📂",
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="/longevity" element={<LongevityPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/personal" element={<PersonalPage />} />
                <Route path="/nuvitru" element={<NuvitruPage />} />
                <Route path="/fractional" element={<FractionalPage />} />
                <Route path="/vibrant" element={<VibrantPage />} />
                <Route path="/agentic-ai" element={<AgenticAIPage />} />
                <Route path="/cron-jobs" element={<CronJobsPage />} />
                <Route path="/openclaw" element={<OpenClawPage />} />
                <Route path="/system-health" element={<SystemHealthPage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
