import { motion } from "framer-motion";
import { Brain, Eye, Clock, Layers, ArrowDown, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * AI 内容理解层
 * 回应 PRD V1.1 新增需求：
 *   痛点 1：广告与正在观看内容毫无关联 → AI 内容理解 + 创意动态适配
 *   痛点 2：广告时机差（剧情高潮硬切） → AI 情节节奏识别 + 安全插入点
 *   痛点 3：广告形式单一硬塞 → AI 形式编排（互动 / 浮层 / VPP / 跨端）
 *
 * 该层位于"环境调度引擎"之上，提供"内容感知"能力。
 */

const painPoints = [
  {
    icon: AlertTriangle,
    pain: "广告与剧情无关",
    solution: "AI 内容理解",
    desc: "多模态模型实时解析当前剧集类型、人物、道具、情绪标签",
    output: "→ 推荐与剧情同源的品牌/品类",
    capability: "Content-Relevance",
    icon2: Eye,
  },
  {
    icon: AlertTriangle,
    pain: "时机差·剧情高潮硬切",
    solution: "AI 节奏感知",
    desc: "情节张力曲线建模，识别低张力安全插入点（过场/转场/片尾）",
    output: "→ 仅在情绪低谷期下发广告",
    capability: "Moment-Awareness",
    icon2: Clock,
  },
  {
    icon: AlertTriangle,
    pain: "形式单一·硬塞贴片",
    solution: "AI 形式编排",
    desc: "根据场景+内容+用户特征，动态选择 互动 / 浮层 / VPP / 跨端 形式",
    output: "→ 一人一剧一形式",
    capability: "Format-Orchestration",
    icon2: Layers,
  },
];

export default function AIContentLayer() {
  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-card p-6 lg:p-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center">
            <Brain className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-accent font-mono mb-1">
              AI Content Layer · V1.1 新增
            </p>
            <h3 className="text-2xl font-bold">AI 内容理解层 · 让广告"懂剧情、识时机、变形式"</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          调度引擎只解决"<strong className="text-foreground">什么场景</strong>下发什么策略"，
          AI 内容层进一步解决"<strong className="text-foreground">什么内容</strong>、
          <strong className="text-foreground">什么时机</strong>、<strong className="text-foreground">什么形式</strong>"——
          形成内容感知 → 调度判定 → 创意编排的完整闭环。
        </p>

        {/* 三大痛点 → 三大 AI 能力 */}
        <div className="grid lg:grid-cols-3 gap-4">
          {painPoints.map((p, i) => {
            const PainIcon = p.icon;
            const CapIcon = p.icon2;
            return (
              <motion.div
                key={p.pain}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className="rounded-xl border border-border/60 bg-background/50 p-5 flex flex-col"
              >
                {/* 痛点 */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/40">
                  <PainIcon className="h-4 w-4 text-destructive" />
                  <span className="text-xs font-semibold text-destructive">用户痛点</span>
                </div>
                <p className="text-sm font-bold mb-4">"{p.pain}"</p>

                {/* 箭头 */}
                <div className="flex justify-center mb-4">
                  <ArrowDown className="h-4 w-4 text-accent animate-pulse" />
                </div>

                {/* AI 能力 */}
                <div className="rounded-lg bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/30 p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CapIcon className="h-4 w-4 text-accent" />
                    <span className="text-sm font-bold text-accent">{p.solution}</span>
                  </div>
                  <code className="text-[10px] text-primary font-mono block mb-3">{p.capability}</code>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex items-start gap-1.5 pt-2 border-t border-border/40">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-semibold text-foreground">{p.output}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 底部：与调度引擎的关系 */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-primary font-mono">Pipeline</span>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="px-2 py-1 rounded bg-accent/15 text-accent font-semibold">① AI 内容理解</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-2 py-1 rounded bg-primary/15 text-primary font-semibold">② 环境调度引擎</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-2 py-1 rounded bg-accent/10 text-accent font-semibold">③ 模块 A/B/C 创意编排</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-2 py-1 rounded bg-foreground/10 font-semibold">④ 客户端下发</span>
          </div>
        </div>
      </div>
    </div>
  );
}