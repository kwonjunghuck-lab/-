
import React, { useState } from 'react';
import { 
  BarChart3, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  MessageCircle, 
  PlayCircle,
  ShoppingBag,
  Award,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Lightbulb,
  Box,
  Layers,
  Presentation,
  Download,
  Calendar,
  Sparkles,
  Heart,
  MessageSquare,
  Activity,
  Video,
  Quote,
  Rocket,
  Search,
  PenTool,
  Package,
  Layout,
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  PieChart as PieChartIcon,
  Clapperboard,
  ArrowLeft,
  Star,
  Microscope,
  HeartHandshake,
  Cpu,
  Handshake
} from 'lucide-react';
import { minscoData } from './data';
import { CelebQuantData, CelebContentData, StrategyDetail } from './types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// --- Shared UI Components ---

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-white border border-slate-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease-out ${!noPadding ? 'p-6' : ''} ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, icon: Icon, className="" }: { title: string, icon?: React.ElementType, className?: string }) => (
  <h3 className={`text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-6 tracking-tight ${className}`}>
    {Icon && <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Icon className="w-5 h-5" strokeWidth={2.5} /></div>}
    {title}
  </h3>
);

interface BadgeProps {
  children?: React.ReactNode;
  color?: "indigo" | "emerald" | "amber" | "slate" | "purple" | "rose" | "blue" | "gray";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = "indigo", className="" }) => {
  const styles = {
    indigo: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10",
    emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    slate: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-600/10",
    purple: "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10",
    rose: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-700/10",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10",
    gray: "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-600/10",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${styles[color]} ${className}`}>
      {children}
    </span>
  );
};

// --- Helper Functions ---

const renderTextWithBold = (text: string) => {
  return text.split(/(\*\*.*?\*\*)/).map((part, index) => 
    part.startsWith('**') && part.endsWith('**') ? 
      <strong key={index} className="text-white font-extrabold bg-white/20 px-1.5 py-0.5 rounded mx-0.5 box-decoration-clone leading-relaxed">{part.slice(2, -2)}</strong> : 
      part
  );
};

// --- Quantitative View Components ---

const QuantDashboard = ({ data }: { data: CelebQuantData }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* 1. Hero Profile & KPI Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Dark Hero Profile */}
        <div className="xl:col-span-4 bg-[#0F172A] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-all duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge color="indigo" className="!bg-indigo-500/20 !text-indigo-200 !ring-indigo-400/30">Verified Channel</Badge>
                <ShieldCheck className="text-emerald-400 w-6 h-6" />
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight mb-2">{data.profile.name}</h1>
              <p className="text-slate-400 text-lg font-medium mb-8">{data.profile.category}</p>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Subscribers</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold font-tnum text-white">{data.profile.subscribers}</span>
                    <span className="text-emerald-400 text-sm font-bold flex items-center bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      <TrendingUp size={12} className="mr-1" />
                      {data.profile.growth}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Core Target</p>
                  <p className="text-lg font-medium leading-snug">{data.profile.target}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Analysis • KR Region</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="xl:col-span-8 flex flex-col gap-6">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.kpis.map((kpi, idx) => (
                <Card key={idx} className={`flex flex-col justify-between group ${kpi.highlight ? 'ring-1 ring-indigo-500/50 bg-indigo-50/30' : ''}`}>
                <div>
                    <div className="flex justify-between items-start mb-3">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</span>
                    {kpi.subValue && <Badge color="purple">{kpi.subValue}</Badge>}
                    </div>
                    <div className="text-3xl font-bold text-slate-900 font-tnum tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
                    {kpi.value}
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {kpi.meaning}
                    </p>
                </div>
                </Card>
            ))}
            </div>

             {/* Engagement Deep Dive */}
             <Card className="flex-1 !p-0 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 p-4 px-6 flex justify-between items-center">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-600" />
                        Engagement Quality & Format Strategy
                    </h4>
                    <span className="text-xs font-medium text-slate-500">Data source: Recent 30 uploads</span>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-rose-50 rounded-lg text-rose-500"><Heart size={16} /></div>
                                <span className="text-sm font-medium text-slate-600">Avg Likes</span>
                            </div>
                            <span className="font-bold text-slate-900">{data.engagement.likes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-500"><MessageSquare size={16} /></div>
                                <span className="text-sm font-medium text-slate-600">Avg Comments</span>
                            </div>
                            <span className="font-bold text-slate-900">{data.engagement.comments}</span>
                        </div>
                        <div className="bg-indigo-50 rounded-xl p-3 flex items-center justify-between border border-indigo-100">
                             <span className="text-xs font-bold text-indigo-800 uppercase">Comment/Like Ratio</span>
                             <span className="text-lg font-bold text-indigo-600">{data.engagement.commentRatio}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4 relative">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-xs font-bold text-slate-500 uppercase">Longform Focus</span>
                            <span className="text-2xl font-bold text-slate-900">{data.format.longformRatio}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-slate-800 h-full rounded-full" style={{ width: `${data.format.longformRatio}%` }}></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <span className="text-[10px] text-slate-400 block uppercase">Longform ER</span>
                                <span className="text-sm font-bold text-slate-900">{data.engagement.platformEr}</span>
                             </div>
                             <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <span className="text-[10px] text-slate-400 block uppercase">Shorts ER</span>
                                <span className="text-sm font-bold text-slate-900">{data.engagement.shortsEr}</span>
                             </div>
                        </div>
                    </div>
                </div>
             </Card>
        </div>
      </section>

      {/* 2. Comprehensive Evaluation (New Section) */}
      <section>
       <SectionTitle title="Comprehensive Commerce Evaluation" icon={FileText} />
       <Card className="relative overflow-hidden border-indigo-100">
         <div className="absolute top-0 right-0 p-8 opacity-5">
           <Quote size={120} />
         </div>
         
         {/* Title & Desc */}
         <div className="mb-8 relative z-10">
           <h4 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4 leading-tight">
             "{data.coreDefinition.title}"
           </h4>
           <p className="text-slate-600 leading-relaxed text-lg">
             {data.coreDefinition.description}
           </p>
         </div>

         {/* 3 Pillars */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {data.coreDefinition.features.map((feature, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {idx + 1}
                        </div>
                        <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                            {idx === 0 ? "Traffic" : idx === 1 ? "Target Fit" : "Trust"}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        {feature.split('**').map((part, i) => 
                           i % 2 === 1 ? <span key={i} className="font-bold text-slate-800 bg-indigo-50/80 px-1 rounded-sm">{part}</span> : part
                        )}
                    </p>
                </div>
            ))}
         </div>

         {/* Format Strategy */}
         <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100/50 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm text-indigo-600">
                <Video size={24} />
            </div>
            <div>
                <h5 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wide">Format Strategy Analysis</h5>
                <p className="text-slate-700 leading-relaxed text-sm">
                   {data.coreDefinition.formatStrategy.split('**').map((part, i) => 
                      i % 2 === 1 ? <span key={i} className="font-bold bg-indigo-100 text-indigo-800 px-1 rounded">{part}</span> : part
                   )}
                </p>
            </div>
         </div>
       </Card>
      </section>

      {/* 3. Top 3 Metrics Deep Dive */}
      <section>
        <SectionTitle title="Critical Commerce Signals" icon={Target} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.top3Metrics.map((metric, idx) => (
            <Card key={idx} className="flex flex-col h-full !p-0 overflow-hidden group border-t-4 border-t-indigo-500">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-3">
                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">{idx + 1}</span>
                   <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{metric.title.split('(')[0]}</h4>
                </div>
                <div className="text-3xl font-extrabold text-indigo-600 font-tnum tracking-tight">{metric.value}</div>
              </div>
              
              <div className="flex-grow bg-slate-50/50 p-6 pt-4 space-y-4">
                <div className="relative pl-4 border-l-2 border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Logic</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{metric.reason}</p>
                </div>
                <div className="relative pl-4 border-l-2 border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">Impact</span>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">{metric.interpretation}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Funnel */}
      <section>
        <SectionTitle title="Conversion Funnel Logic" icon={Layers} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.funnels.map((funnel, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white rounded-2xl transform transition-transform group-hover:scale-[1.01] -z-10 border border-slate-200"></div>
              <div className="p-7 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                   <Badge color={idx === 0 ? "slate" : "indigo"}>{funnel.type}</Badge>
                   <div className="h-px flex-grow bg-slate-200 mx-4"></div>
                   <Target className="text-slate-300 w-5 h-5" />
                </div>
                
                {/* Visual Flow */}
                <div className="flex items-center gap-2 mb-6 w-full">
                  {funnel.flow.split('→').map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <div className={`flex-1 py-3 px-2 text-center rounded-lg text-xs font-bold transition-all ${i === arr.length - 1 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white border border-slate-200 text-slate-600'}`}>
                        {step.trim().split('(')[0]}
                      </div>
                      {i < arr.length - 1 && <ArrowRight size={14} className="text-slate-300 flex-shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
                
                <p className="flex-grow text-slate-600 text-sm leading-relaxed bg-white/50 p-4 rounded-xl border border-slate-100">
                  {funnel.description.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="font-bold text-slate-800 bg-indigo-50/80 px-1 rounded-sm">{part}</span> : part
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Executive Summary */}
      <section className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden mt-16">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Award size={400} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900 pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-5">
               <Sparkles size={12} fill="currentColor" /> Final Decision
            </div>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-3 w-full max-w-4xl">
              {data.executiveSummary.title}
            </h3>
            <p className="text-slate-400 text-lg font-light">
              데이터가 증명하는 필연적 선택, 지금 투입해야 하는 3가지 결정적 이유
            </p>
          </div>
        </div>
        
        {/* Cards Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.executiveSummary.points.map((point, idx) => {
            // Split title by colon if it exists
            const parts = point.title.split(':');
            const category = parts.length > 1 ? parts[0].trim() : `Point ${idx + 1}`;
            const headline = parts.length > 1 ? parts[1].trim() : point.title;
            
            // Define visual theme per card
            const themes = [
              { color: 'indigo', icon: Target, border: 'border-indigo-500/30', bg: 'bg-indigo-500/10', text: 'text-indigo-300' },
              { color: 'emerald', icon: BarChart3, border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-300' },
              { color: 'rose', icon: Rocket, border: 'border-rose-500/30', bg: 'bg-rose-500/10', text: 'text-rose-300' }
            ];
            const theme = themes[idx % themes.length];
            const Icon = theme.icon;

            return (
              <div key={idx} className="group relative flex flex-col h-full">
                {/* Glassmorphism Card Background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"></div>
                <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r from-transparent via-${theme.color}-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative p-8 flex flex-col h-full">
                   {/* Card Header: Icon & Number */}
                   <div className="flex items-start justify-between mb-8">
                      <div className={`p-3.5 rounded-2xl border ${theme.border} ${theme.bg} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                         <Icon size={24} strokeWidth={2} />
                      </div>
                      <span className="text-6xl font-bold text-white/5 font-tnum select-none group-hover:text-white/10 transition-colors">
                        0{idx + 1}
                      </span>
                   </div>
                   
                   {/* Content */}
                   <div className="mb-6">
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-3 ${theme.text}`}>
                         {category.replace('[', '').replace(']', '')}
                      </span>
                      <h4 className="text-xl font-bold text-white leading-snug group-hover:text-white transition-colors">
                        {headline}
                      </h4>
                   </div>
                   
                   {/* Divider */}
                   <div className="w-full h-px bg-white/5 mb-6 group-hover:bg-white/10 transition-colors"></div>
                   
                   {/* Description */}
                   <div className="mt-auto">
                      <p className="text-slate-200 text-[15px] leading-7 font-normal">
                        {point.desc.split('**').map((part, i) => 
                          i % 2 === 1 ? (
                            <span key={i} className={`${theme.text} font-bold bg-white/5 px-1 rounded mx-0.5`}>
                              {part}
                            </span>
                          ) : part
                        )}
                      </p>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// --- Content Strategy View Components ---

const StrategyCarousel = ({ strategies }: { strategies: StrategyDetail[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextStrategy = () => {
    setActiveIndex((prev) => (prev + 1) % strategies.length);
  };

  const prevStrategy = () => {
    setActiveIndex((prev) => (prev - 1 + strategies.length) % strategies.length);
  };

  const strategy = strategies[activeIndex];

  // Visual Theme mapping based on index
  const gradients = [
    "from-[#2A2D3E] to-[#1F2233]", // Slate/Dark
    "from-[#1e1b4b] to-[#312e81]", // Indigo
    "from-[#064e3b] to-[#065f46]", // Emerald
    "from-[#4c0519] to-[#881337]", // Rose
  ];
  const activeGradient = gradients[activeIndex % gradients.length];

  return (
    <div className="w-full select-none">
       {/* Carousel Controls */}
       <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Layers className="w-5 h-5" strokeWidth={2.5} />
             </div>
             <span>Core Strategies (Deep Dive Analysis)</span>
             <span className="ml-2 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                {activeIndex + 1} / {strategies.length}
             </span>
          </h3>
          <div className="flex gap-2">
             <button 
                onClick={prevStrategy}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
             >
                <ChevronLeft size={20} />
             </button>
             <button 
                onClick={nextStrategy}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-sm"
             >
                <ChevronRight size={20} />
             </button>
          </div>
       </div>

       {/* Main Slide - High Impact Dark Card */}
       <div className="overflow-hidden rounded-3xl shadow-2xl">
         <div 
           className="transition-all duration-500 ease-in-out transform"
           key={activeIndex} 
         >
             <div className={`relative bg-gradient-to-br ${activeGradient} text-white min-h-[700px] flex flex-col`}>
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   <Target size={400} />
                </div>
                <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
                   <Sparkles size={300} />
                </div>

                {/* 1. Header Section */}
                <div className="p-10 pb-6 border-b border-white/10 relative z-10">
                   <div className="flex items-start justify-between gap-6">
                      <div>
                         <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 text-white/90">
                               Strategy 0{activeIndex + 1}
                            </span>
                            <div className="h-px w-8 bg-white/20"></div>
                            <span className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-1.5">
                               <User size={12} /> {strategy.persona.label}
                            </span>
                         </div>
                         <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                            {strategy.title.split('(')[0]}
                         </h2>
                         <div className="inline-block px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border-l-4 border-white/30">
                            <p className="text-lg md:text-xl font-medium text-white/90 italic">
                               "{strategy.concept.definition}"
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* 2. Content Grid */}
                <div className="flex-grow p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
                   
                   {/* Left Col: Logic & Insight (The "Why") */}
                   <div className="space-y-8">
                      <div className="bg-black/20 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                         <h4 className="flex items-center gap-2 text-sm font-bold text-white/50 uppercase tracking-widest mb-4">
                            <Box size={14} /> The Logic (Why it works)
                         </h4>
                         
                         <div className="space-y-6">
                            <div>
                               <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">Persona Fit</span>
                               <p className="text-white/90 leading-relaxed text-lg">
                                  {renderTextWithBold(strategy.persona.desc)}
                               </p>
                            </div>
                            <div className="h-px bg-white/10"></div>
                            <div>
                               <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-2">Data Evidence</span>
                               <p className="text-white/90 leading-relaxed text-lg">
                                  {renderTextWithBold(strategy.evidence.desc)}
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right Col: Execution (The "How") */}
                   <div className="space-y-6 flex flex-col h-full">
                      {/* Item Highlight */}
                      <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg transform transition-transform hover:-translate-y-1">
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl shrink-0">
                               <ShoppingBag size={24} />
                            </div>
                            <div>
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Recommended Item</span>
                               <h4 className="text-xl font-bold text-slate-900 mb-2">{strategy.item.name}</h4>
                               <p className="text-lg text-slate-700 leading-snug">
                                 {renderTextWithBold(strategy.item.spec.replace(/\*\*/g, ''))}
                               </p>
                            </div>
                         </div>
                      </div>

                      {/* Scenario Script */}
                      <div className="flex-grow bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm flex flex-col justify-center">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                               <Clapperboard size={14} /> Content Scenario
                            </span>
                         </div>
                         <div className="space-y-4 font-mono text-base text-white/90">
                            {strategy.concept.detail.split('(').filter(Boolean).slice(0, 2).map((part, i) => {
                               const [label, content] = part.split(')');
                               if(!content) return null;
                               return (
                                  <div key={i} className="pl-3 border-l-2 border-white/30">
                                     <span className="text-white/50 text-xs font-bold uppercase block mb-1">{label}</span>
                                     <p className="leading-relaxed opacity-90">{content}</p>
                                  </div>
                               )
                            })}
                         </div>
                      </div>
                   </div>

                </div>

             </div>
         </div>
       </div>

       {/* Carousel Dots */}
       <div className="flex justify-center gap-2 mt-6">
          {strategies.map((_, idx) => (
             <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                   idx === activeIndex ? 'bg-indigo-600 w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
             />
          ))}
       </div>
    </div>
  );
};

const StrategyDashboard = ({ data }: { data: CelebContentData }) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* SECTION I: Intro Header */}
      <section className="bg-white border border-indigo-100 rounded-3xl p-10 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <Box size={300} />
         </div>
         <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
               <FileText size={12} /> Strategic Report
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
               {data.reportTitle}
            </h1>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed border-l-4 border-indigo-500 pl-6">
               <p>
                 {data.intro.background.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="text-slate-900 font-bold bg-indigo-50/80 px-1 rounded-sm">{part}</span> : part
                 )}
               </p>
               <p>
                 {data.intro.objective.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="text-slate-900 font-bold bg-indigo-50/80 px-1 rounded-sm">{part}</span> : part
                 )}
               </p>
            </div>
            
            <div className="mt-10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Logic Framework</p>
              <div className="flex flex-wrap gap-3">
                 {data.logicFramework.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg">
                       <span className="text-xs font-bold text-indigo-600 bg-white border border-indigo-100 w-6 h-6 flex items-center justify-center rounded-full shadow-sm">{idx + 1}</span>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{step.step}</span>
                          <span className="text-xs font-bold text-slate-800">{step.label}</span>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
         </div>
      </section>

      {/* SECTION II: Base Requirements */}
      <section>
        <SectionTitle title="Base Requirements (Hygiene Factors)" icon={CheckCircle2} />
        
        <div className="mb-8 p-8 bg-gradient-to-r from-slate-100 to-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 text-slate-200">
              <ShieldCheck size={120} />
           </div>
           <div className="relative z-10 flex gap-6 items-start max-w-3xl">
             <div className="p-3 bg-indigo-600 rounded-xl text-white shrink-0 shadow-lg shadow-indigo-200">
               <Lightbulb size={24} strokeWidth={2.5} />
             </div>
             <div>
               <h4 className="text-lg font-bold text-slate-900 mb-2">Foundation for Success</h4>
               <p className="text-slate-600 text-base leading-relaxed">
                 {data.baseRequirements.intro.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="font-bold text-slate-900 bg-indigo-50 px-1 rounded">{part}</span> : part
                 )}
               </p>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.baseRequirements.items.map((req, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:border-indigo-400 transition-all duration-300 group flex flex-col h-full overflow-hidden hover:shadow-xl">
               {/* Header */}
               <div className="p-8 pb-6 border-b border-slate-100 bg-white relative">
                  <div className="absolute top-0 right-0 p-4 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                     <CheckCircle2 size={80} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-12 h-12 bg-emerald-50 rounded-2xl text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                         <CheckCircle2 size={24} strokeWidth={3} />
                       </div>
                       <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Requirement 0{idx + 1}</span>
                          <h4 className="font-bold text-slate-900 text-xl">{req.title}</h4>
                       </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                       {req.description.split('**').map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="font-bold text-slate-800 bg-slate-100 px-1 rounded">{part}</span> : part
                       )}
                    </p>
                  </div>
               </div>

               {/* Action List */}
               <div className="p-8 bg-slate-50/50 flex-grow flex flex-col">
                  <div className="mb-6">
                     <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-4 flex items-center gap-2">
                        <Zap size={12} /> Mandatory Actions
                     </span>
                     <ul className="space-y-4">
                        {req.actionList.map((action, i) => (
                           <li key={i} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm">
                              <div className="mt-0.5 p-0.5 bg-emerald-100 text-emerald-600 rounded-full shrink-0">
                                 <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="font-medium">{action}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Data Proof Footer */}
                  <div className="mt-auto bg-slate-900 rounded-xl p-5 text-white shadow-md relative overflow-hidden group-hover:shadow-lg transition-shadow">
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                     <div className="flex items-start gap-3 relative z-10">
                        <BarChart3 size={18} className="text-emerald-400 mt-1 shrink-0" />
                        <div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Evidence & Impact</span>
                           <p className="font-bold text-white text-sm mb-2 leading-snug">{req.dataProof}</p>
                           <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-2 mt-1">
                              {req.impact}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION III: Core Strategies */}
      <section>
        <StrategyCarousel strategies={data.strategies} />
      </section>

      {/* SECTION IV: Partnership Proposal */}
      <section className="bg-slate-900 rounded-[2.5rem] p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900" />
         <div className="absolute right-0 top-0 p-10 opacity-[0.03] pointer-events-none">
            <Rocket size={400} />
         </div>
         
         <div className="relative z-10 max-w-6xl mx-auto">
             {/* 1. Header & Philosophy */}
             <div className="text-center mb-16">
               <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/20 backdrop-blur-sm">
                  <Handshake size={14} /> Final Partnership Proposal
               </span>
               <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                 {data.proposal.philosophy}
               </h2>
               <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                 <p className="text-slate-300 text-lg leading-relaxed">
                   {data.proposal.intro.split('**').map((part, i) => 
                      i % 2 === 1 ? <span key={i} className="text-white font-bold bg-indigo-500/20 px-1 rounded">{part}</span> : part
                   )}
                 </p>
               </div>
             </div>

             {/* 2. Dual Sourcing Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Rational Card */}
                <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70"></div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                         <Microscope size={28} />
                      </div>
                      <div>
                         <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block">Logic & Evidence</span>
                         <h3 className="text-xl font-bold text-white">{data.proposal.points[0].title}</h3>
                      </div>
                   </div>
                   <p className="text-slate-300 leading-relaxed text-sm">
                     {data.proposal.points[0].content.split('**').map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="text-white font-bold">{part}</span> : part
                     )}
                   </p>
                </div>

                {/* Emotional Card */}
                <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800 transition-colors group relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 opacity-70"></div>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
                         <HeartHandshake size={28} />
                      </div>
                      <div>
                         <span className="text-rose-400 text-xs font-bold uppercase tracking-widest block">Context & Persona</span>
                         <h3 className="text-xl font-bold text-white">{data.proposal.points[1].title}</h3>
                      </div>
                   </div>
                   <p className="text-slate-300 leading-relaxed text-sm">
                     {data.proposal.points[1].content.split('**').map((part, i) => 
                        i % 2 === 1 ? <span key={i} className="text-white font-bold">{part}</span> : part
                     )}
                   </p>
                </div>
             </div>

             {/* 3. Infrastructure & Assurance */}
             <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-8 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                   <div className="shrink-0 flex flex-col items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                         <Cpu size={32} />
                      </div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">System Assurance</span>
                   </div>
                   <div className="flex-grow text-center md:text-left">
                      <h4 className="text-white font-bold text-lg mb-2">Verified Infrastructure</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {data.proposal.infrastructure.split('**').map((part, i) => 
                           i % 2 === 1 ? <span key={i} className="text-indigo-300 font-bold">{part}</span> : part
                        )}
                      </p>
                   </div>
                   <div className="shrink-0">
                      <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase">
                         <ShieldCheck size={14} /> AI Verified
                      </div>
                   </div>
                </div>
             </div>

             {/* 4. Closing Statement */}
             <div className="text-center pt-8 border-t border-white/10">
                <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto mb-8">
                   "{data.proposal.closing}"
                </p>
                <button className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-xl shadow-indigo-900/50">
                   <Rocket size={20} className="text-indigo-600" />
                   Start Partnership
                </button>
             </div>
         </div>
      </section>

    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState<'quant' | 'content'>('quant');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* 1. Logo */}
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                <BarChart3 size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">Cele<span className="text-indigo-600">beauty</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Intelligence Dashboard</span>
              </div>
            </div>

            {/* 2. Center Tabs (Segmented Control) */}
            <div className="hidden md:flex p-1.5 bg-slate-100/80 rounded-xl border border-slate-200/50 relative">
              <button
                onClick={() => setActiveTab('quant')}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 font-['Pretendard'] ${
                  activeTab === 'quant' 
                    ? 'text-slate-900 shadow-sm bg-white ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <BarChart3 size={16} className={activeTab === 'quant' ? 'text-indigo-600' : ''} />
                팬덤 지표 분석
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 font-['Pretendard'] ${
                  activeTab === 'content' 
                    ? 'text-slate-900 shadow-sm bg-white ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText size={16} className={activeTab === 'content' ? 'text-indigo-600' : ''} />
                채널 핵심 콘텐츠 분석
              </button>
            </div>

            {/* 3. Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 font-['Pretendard']">
                  <Calendar size={10} /> 2025. 12. 15
                </span>
              </div>
            </div>

          </div>
        </div>
      </nav>
      
      {/* Mobile Tab Fallback */}
      <div className="md:hidden px-4 py-4 sticky top-20 z-40 bg-[#F8F9FC]/95 backdrop-blur-sm border-b border-slate-200">
         <div className="flex w-full p-1 bg-slate-200/50 rounded-lg">
           <button 
             onClick={() => setActiveTab('quant')}
             className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all font-['Pretendard'] ${activeTab === 'quant' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
           >
             팬덤 지표 분석
           </button>
           <button 
             onClick={() => setActiveTab('content')}
             className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all font-['Pretendard'] ${activeTab === 'content' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
           >
             채널 핵심 콘텐츠 분석
           </button>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'quant' ? (
          <QuantDashboard data={minscoData.quant} />
        ) : (
          <StrategyDashboard data={minscoData.content} />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 text-center mt-12">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>
        <p className="text-slate-400 text-xs font-medium tracking-wide uppercase">
          Confidential • Internal Use Only • Generated by Celebeauty
        </p>
      </footer>
    </div>
  );
};

export default App;
