import { readFileSync } from "fs";
import { join } from "path";
import { CompetitiveAnalysis } from "./types";
import Dashboard from "./components/Dashboard";

function getData(): CompetitiveAnalysis {
  const filePath = join(process.cwd(), "public/data/trade_desk/competitive_analysis.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function Home() {
  const data = getData();
  return <Dashboard data={data} />;
}
