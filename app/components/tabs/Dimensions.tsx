import { CompetitiveAnalysis } from "../../types";

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 5) * 100;
  const color =
    score >= 4 ? "bg-emerald-500" : score === 3 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-zinc-700 w-8">{score}/5</span>
    </div>
  );
}

export default function Dimensions({ data }: { data: CompetitiveAnalysis }) {
  return (
    <div className="space-y-4">
      {data.dimension_comparisons.map((dim) => (
        <div
          key={dim.dimension}
          className="bg-white rounded-xl border border-zinc-200 p-6"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">
                {dim.dimension}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Leader: {dim.leader}
              </p>
            </div>
          </div>

          {dim.scores.map((entry) => (
            <div key={entry.company_name} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-600 font-medium">
                  {entry.company_name}
                </span>
              </div>
              <ScoreBar score={entry.score} />
              {entry.notes && (
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {entry.notes}
                </p>
              )}
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-zinc-100">
            <p className="text-sm text-zinc-600 leading-relaxed">{dim.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
