import { CompetitiveAnalysis } from "../../types";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function ScoreDot({ score }: { score: number }) {
  const color =
    score >= 4
      ? "bg-emerald-500"
      : score === 3
      ? "bg-amber-400"
      : "bg-red-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-semibold`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {score}/5
    </span>
  );
}

export default function Overview({ data }: { data: CompetitiveAnalysis }) {
  const radarData = data.dimension_comparisons.map((d) => ({
    dimension: d.dimension.replace(" / ", "/"),
    score: d.scores[0]?.score ?? 0,
  }));

  return (
    <div className="space-y-8">
      {/* Top priorities */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <h2 className="text-base font-semibold text-zinc-900 mb-4">
          Top 3 Recommended Priorities
        </h2>
        <ol className="space-y-3">
          {data.top_3_recommended_priorities.map((p, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-semibold">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-700 leading-relaxed">{p}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <h2 className="text-base font-semibold text-zinc-900 mb-4">
            Competitiveness Scores
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e4e4e7" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 11, fill: "#71717a" }}
              />
              <Radar
                dataKey="score"
                stroke="#18181b"
                fill="#18181b"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip
                formatter={(v) => [`${v}/5`, "Score"]}
                contentStyle={{ fontSize: 12 }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {data.dimension_comparisons.map((d) => (
              <div key={d.dimension} className="flex justify-between items-center text-sm">
                <span className="text-zinc-600">{d.dimension}</span>
                <ScoreDot score={d.scores[0]?.score ?? 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6">
          <h2 className="text-base font-semibold text-zinc-900 mb-4">
            Overall Narrative
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            {data.overall_narrative}
          </p>
        </div>
      </div>
    </div>
  );
}
