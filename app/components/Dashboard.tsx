"use client";

import { useState } from "react";
import { CompetitiveAnalysis } from "../types";
import Overview from "./tabs/Overview";
import Dimensions from "./tabs/Dimensions";
import GapsOpportunities from "./tabs/GapsOpportunities";

const TABS = ["Overview", "Dimensions", "Gaps & Opportunities"] as const;
type Tab = (typeof TABS)[number];

export default function Dashboard({ data }: { data: CompetitiveAnalysis }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">
              B2B Growth Research
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {data.client_company} · Analysed {data.analysis_date}
            </p>
          </div>
          <span className="text-xs bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full font-medium">
            {data.competitor_companies.length > 0
              ? `${data.competitor_companies.length} competitors`
              : "Solo analysis"}
          </span>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-zinc-200 px-6">
        <div className="max-w-6xl mx-auto flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "Overview" && <Overview data={data} />}
        {activeTab === "Dimensions" && <Dimensions data={data} />}
        {activeTab === "Gaps & Opportunities" && (
          <GapsOpportunities data={data} />
        )}
      </main>
    </div>
  );
}
