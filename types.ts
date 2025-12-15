
export interface Metric {
  label: string;
  value: string;
  subValue?: string;
  meaning?: string;
  highlight?: boolean;
}

export interface DetailedMetric {
  title: string;
  value: string;
  reason: string;
  interpretation: string;
}

export interface FunnelFlow {
  type: string;
  flow: string; // e.g., "Shorts -> Channel -> Longform"
  description: string;
}

export interface StrategyItemDetail {
  name: string;
  context: string;   // [1] Contextual Necessity
  dataProof: string; // [2] Data Proof
  spec: string;      // [3] Spec Optimization
}

export interface StrategyConceptDetail {
  definition: string;
  detail: string;    // Content Detail (Scenario)
  emphasis: string;  // Emphasis Point
}

export interface StrategyDetail {
  id: string;
  title: string;
  persona: {
    label: string;
    desc: string;
  };
  evidence: {
    label: string;
    desc: string;
  };
  item: StrategyItemDetail;
  concept: StrategyConceptDetail;
}

export interface SourcingPoint {
  title: string;
  subtitle?: string;
  content: string;
}

export interface EngagementData {
  likes: string;
  comments: string;
  commentRatio: string; // 7.1%
  viewEr: string;
  platformEr: string;
  shortsEr: string;
}

export interface FormatData {
  longformRatio: number; // 84%
  longformAvg: string;
  shortsAvg: string;
  description: string;
}

export interface LogicStep {
  step: string;
  label: string;
  desc: string;
}

export interface BaseRequirementDetail {
  title: string;
  description: string; // The high-level concept
  actionList: string[]; // Specific actions (e.g., "High quality video")
  dataProof: string; // "30 out of 36 cases"
  impact: string; // "Minimizes search cost"
}

export interface CelebQuantData {
  profile: {
    name: string;
    category: string;
    subscribers: string;
    growth: string;
    target: string;
    region: string;
  };
  kpis: Metric[];
  engagement: EngagementData;
  format: FormatData;
  coreDefinition: {
    title: string;
    description: string;
    features: string[];
    formatStrategy: string;
  };
  top3Metrics: DetailedMetric[];
  funnels: FunnelFlow[];
  executiveSummary: {
    title: string;
    points: { title: string; desc: string }[];
  };
}

export interface CelebContentData {
  reportTitle: string;
  intro: {
    background: string;
    objective: string;
  };
  logicFramework: LogicStep[];
  baseRequirements: {
    intro: string;
    items: BaseRequirementDetail[];
  };
  strategies: StrategyDetail[];
  proposal: {
    intro: string;
    philosophy: string;
    points: SourcingPoint[];
    closing: string;
    infrastructure: string;
  };
}

export interface FullCelebData {
  quant: CelebQuantData;
  content: CelebContentData;
}
