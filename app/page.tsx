import { CompetitiveAnalysis } from "./types";
import Dashboard from "./components/Dashboard";

async function getData(): Promise<CompetitiveAnalysis> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/data/trade_desk/competitive_analysis.json`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return <Dashboard data={data} />;
}
