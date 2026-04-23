import { motion } from "framer-motion";
import { Brain, Eye, Clock, Layers, Activity, type LucideIcon } from "lucide-react";

/**
 * AI 内容理解层 · 模块级落地面板
 *
 * 三个模块复用，统一展示 AI 三大能力如何在该模块中被调用：
 *   1. Content-Relevance · 内容相关性（AI 识别剧集/人物/道具/情绪）
 *   2. Moment-Awareness  · 时机感知（情节张力曲线 → 安全插入点）
 *   3. Format-Orchestration · 形式编排（动态选择 A/B/C 形式）
 *
 * 与首页 AIContentLayer 总览呼应，形成"总-分"叙事结构。
 */

export interface AIInsight {
  /** 当前剧集/内容识别结果（Content-Relevance） */
  relevance: {
    title: string;
    items: { label: string; value: string; confidence?: number }[];
  };
  /** 时机判定（Moment-Awareness） */
  moment: {
    title: string;
    /** 0-100 当前情节张力值 */
    tension: number;
    /** 文案：当前是否安全插入点 */
    verdict: string;
    safe: boolean;
  };
  /** 形式编排（Format-Orchestration） */
  format: {
    title: string;
    chosen: string;
    reason: string;
    alternatives: string[];
  };
  /** 主题色 (tailwind class) */
  accent?: string;
}

export default function AIInsightPanel({
  relevance,
  moment,
  format,
  accent = "text-accent",
}: AIInsight) {
  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-card p-5 lg:p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center">
          <Brain className={`h-4 w-4 ${accent}`} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-accent font-mono">
            AI Content Layer · 实时输出
          </p>
          <h3 className="text-sm font-bold">本模块由 AI 内容理解层驱动</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {/* 1. Content Relevance */}
        <Block icon={Eye} code="① Content-Relevance" title={relevance.title} delay={0}>
          <div className="space-y-1.5">
            {relevance.items.map((it) => (
              <div key={it.label} className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{it.label}</span>
                <span className="text-foreground font-medium truncate ml-2">
                  {it.value}
                  {it.confidence !== undefined && (
                    <span className="ml-1 text-accent font-mono">
                      {it.confidence.toFixed(2)}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </Block>

        {/* 2. Moment Awareness */}
        <Block icon={Clock} code="② Moment-Awareness" title={moment.title} delay={0.1}>
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">情节张力</span>
                <span className="font-mono text-foreground">{moment.tension}</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-background overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${moment.tension}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${
                    moment.tension > 70
                      ? "bg-destructive"
                      : moment.tension > 40
                      ? "bg-accent"
                      : "bg-primary"
                  }`}
                />
              </div>
            </div>
            <div
              className={`rounded-md px-2 py-1.5 text-[11px] flex items-center gap-1.5 ${
                moment.safe
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-destructive/10 text-destructive border border-destructive/30"
              }`}
            >
              <Activity className="h-3 w-3" />
              {moment.verdict}
            </div>
          </div>
        </Block>

        {/* 3. Format Orchestration */}
        <Block icon={Layers} code="③ Format-Orchestration" title={format.title} delay={0.2}>
          <div className="space-y-2">
            <div className="rounded-md bg-accent/10 border border-accent/40 px-2 py-1.5">
              <p className="text-[10px] text-muted-foreground">最终下发形式</p>
              <p className="text-xs font-bold text-accent">{format.chosen}</p>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug">{format.reason}</p>
            <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
              <span className="text-[9px] text-muted-foreground">候选：</span>
              {format.alternatives.map((a) => (
                <span
                  key={a}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-background/60 text-muted-foreground line-through"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Block>
      </div>
    </div>
  );
}

function Block({
  icon: Icon,
  code,
  title,
  children,
  delay,
}: {
  icon: LucideIcon;
  code: string;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border/60 bg-background/50 p-3"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3.5 w-3.5 text-accent" />
        <code className="text-[9px] font-mono text-accent uppercase tracking-wider">{code}</code>
      </div>
      <p className="text-xs font-semibold mb-2.5">{title}</p>
      {children}
    </motion.div>
  );
}