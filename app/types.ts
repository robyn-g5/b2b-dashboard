export interface ScoreEntry {
  company_name: string;
  score: number;
  notes?: string;
}

export interface DimensionComparison {
  dimension: string;
  scores: ScoreEntry[];
  leader: string;
  summary: string;
}

export interface Gap {
  gap_description: string;
  dimension: string;
  client_weakness?: string;
  competitor_advantage?: string;
  impact: "high" | "medium" | "low";
  effort_to_close: "high" | "medium" | "low";
}

export interface GapAnalysis {
  positioning_gaps: Gap[];
  offer_gaps: Gap[];
  acquisition_gaps: Gap[];
  content_gaps: Gap[];
  experience_gaps: Gap[];
  product_gaps: Gap[];
}

export interface Opportunity {
  opportunity_title: string;
  type: "quick_win" | "strategic" | "defensive" | "exploratory";
  description?: string;
  rationale?: string;
  estimated_impact: "high" | "medium" | "low";
  estimated_effort: "high" | "medium" | "low";
  suggested_actions?: string[];
}

export interface CompetitiveAnalysis {
  client_company: string;
  competitor_companies: string[];
  analysis_date: string;
  dimension_comparisons: DimensionComparison[];
  gap_analysis: GapAnalysis;
  opportunity_portfolio: Opportunity[];
  top_3_recommended_priorities: string[];
  overall_narrative: string;
}
