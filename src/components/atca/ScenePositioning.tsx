import { motion } from "framer-motion";
import { ArrowRight, MapPin, Target, Zap, type LucideIcon } from "lucide-react";

export interface ScenePositioningProps {
  /** 模块代号 A/B/C */
  code: "A" | "B" | "C";
  /** 模块标题 */
  title: string;
  /** 策略英文名 */
  strategy: string;
  /** 使用场景一句话 */
  scene: string;
  /** 核心商业价值 */
  value: string;
  /** 流程节点（4-6 个） */
  flow: { label: string; desc?: string; icon?: LucideIcon }[];
  /** 主题渐变 class */
  accent: string;
}

/**
 * 场景定位卡片 + 流程图
 * 用在每个模块页顶部，向产品评审/广告主清晰说明：
 *   "这个模块解决什么场景的什么问题，用户经历了什么流程"
 */
export default function ScenePositioning({
  code,
  title,
  strategy,
  scene,
  value,
  flow,
  accent,
}: ScenePositioningProps) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-6 lg:p-8">
      {/* 顶部三栏：定位 / 场景 / 价值 */}
      <div className="grid lg:grid-cols-[auto_1fr_1fr_1fr] gap-6 items-start mb-8">
        <div
          className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-2xl font-black text-white shadow-lg`}
        >
          {code}
        </div>

        <InfoBlock icon={MapPin} label="使用场景" content={scene} />
        <InfoBlock icon={Target} label="策略代号" content={strategy} mono />
        <InfoBlock icon={Zap} label="核心价值" content={value} accent />
      </div>

      {/* 流程图 */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          User Flow · 用户体验流程
        </p>
        <div className="flex flex-wrap items-stretch gap-2">
          {flow.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-stretch gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-lg border border-border/60 bg-background/40 px-3 py-2 min-w-[120px] flex-1"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
                    <span className="text-xs font-semibold">{step.label}</span>
                  </div>
                  {step.desc && (
                    <p className="text-[10px] text-muted-foreground leading-snug">{step.desc}</p>
                  )}
                </motion.div>
                {i < flow.length - 1 && (
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  content,
  mono,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  content: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <p
        className={[
          "text-sm leading-snug",
          mono ? "font-mono text-primary" : "",
          accent ? "text-accent font-semibold" : "",
          !mono && !accent ? "text-foreground" : "",
        ].join(" ")}
      >
        {content}
      </p>
    </div>
  );
}