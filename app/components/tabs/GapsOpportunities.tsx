"use client";

import { useState } from "react";
import { CompetitiveAnalysis, Gap, Opportunity } from "../../types";

function ImpactBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    high: "bg-red-50 text-red-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
        styles[value?.toLowerCase()] ?? "bg-zinc-100 text-zinc-600"
      }`}
    >
      {value}
    </span>
  );
}

function GapCard({ gap }: { gap: Gap }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 rounded-lg p-4 hover:border-zinc-300 transition-colors">
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-sm font-medium text-zinc-800 leading-snug">
          {gap.gap_description}
        </p>
        <div className="flex gap-1.5 flex-shrink-0">
          <ImpactBadge value={gap.impact} />
          <span className="text-xs text-zinc-400 self-center">
            {gap.effort_to_close} effort
          </span>
        </div>
      </div>
      {open && (gap.client_weakness || gap.competitor_advantage) && (
        <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
          {gap.client_weakness && (
            <p className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">Weakness: </span>
              {gap.client_weakness}
            </p>
          )}
          {gap.competitor_advantage && (
            <p className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">Competitor edge: </span>
              {gap.competitor_advantage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const OPP_TYPES: { key: Opportunity["type"]; label: string; icon: string }[] = [
  { key: "quick_win", label: "Quick Wins", icon: "⚡" },
  { key: "strategic", label: "Strategic", icon: "🎯" },
  { key: "defensive", label: "Defensive", icon: "🛡️" },
  { key: "exploratory", label: "Exploratory", icon: "🔭" },
];

function OppCard({ opp }: { opp: Opportunity }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 rounded-lg p-4">
      <div
        className="flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-sm font-semibold text-zinc-800">
          {opp.opportunity_title}
        </p>
        <div className="flex gap-1.5 flex-shrink-0">
          <ImpactBadge value={opp.estimated_impact} />
          <span className="text-xs text-zinc-400 self-center">
            {opp.estimated_effort} effort
          </span>
        </div>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
          {opp.description && (
            <p className="text-xs text-zinc-600 leading-relaxed">
              {opp.description}
            </p>
          )}
          {opp.rationale && (
            <p className="text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">Rationale: </span>
              {opp.rationale}
            </p>
          )}
          {opp.suggested_actions && opp.suggested_actions.length > 0 && (
            <ul className="mt-2 space-y-1">
              {opp.suggested_actions.map((a, i) => (
                <li key={i} className="text-xs text-zinc-600 flex gap-2">
                  <span className="text-zinc-400">→</span>
                  {a}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

const GAP_CATEGORIES: { key: keyof CompetitiveAnalysis["gap_analysis"]; label: string }[] = [
  { key: "positioning_gaps", label: "Positioning" },
  { key: "offer_gaps", label: "Offer / Pricing" },
  { key: "acquisition_gaps", label: "Acquisition" },
  { key: "content_gaps", label: "Content" },
  { key: "experience_gaps", label: "Experience" },
  { key: "product_gaps", label: "Product" },
];

export default function GapsOpportunities({
  data,
}: {
  data: CompetitiveAnalysis;
}) {
  const byType = OPP_TYPES.reduce((acc, { key }) => {
    acc[key] = data.opportunity_portfolio.filter((o) => o.type === key);
    return acc;
  }, {} as Record<Opportunity["type"], Opportunity[]>);

  return (
    <div className="space-y-8">
      {/* Gap Analysis */}
      <div>
        <h2 className="text-base font-semibold text-zinc-900 mb-4">
          Gap Analysis
        </h2>
        <div className="space-y-4">
          {GAP_CATEGORIES.map(({ key, label }) => {
            const gaps = data.gap_analysis[key];
            if (!gaps?.length) return null;
            return (
              <div key={key} className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-semibold text-zinc-700 mb-3">
                  {label}{" "}
                  <span className="text-zinc-400 font-normal">
                    ({gaps.length})
                  </span>
                </h3>
                <div className="space-y-2">
                  {gaps.map((gap, i) => (
                    <GapCard key={i} gap={gap} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities */}
      <div>
        <h2 className="text-base font-semibold text-zinc-900 mb-4">
          Opportunity Portfolio
        </h2>
        <div className="space-y-4">
          {OPP_TYPES.map(({ key, label, icon }) => {
            const opps = byType[key];
            if (!opps?.length) return null;
            return (
              <div key={key} className="bg-white rounded-xl border border-zinc-200 p-5">
                <h3 className="text-sm font-semibold text-zinc-700 mb-3">
                  {icon} {label}{" "}
                  <span className="text-zinc-400 font-normal">
                    ({opps.length})
                  </span>
                </h3>
                <div className="space-y-2">
                  {opps.map((opp, i) => (
                    <OppCard key={i} opp={opp} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
