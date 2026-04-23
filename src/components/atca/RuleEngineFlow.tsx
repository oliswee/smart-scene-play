import { motion } from "framer-motion";
import { ArrowRight, Tv, Film, Gamepad2, Cpu } from "lucide-react";

const conditions = [
  {
    id: "C",
    label: "投屏 / 外放",
    rule: "Casting=True OR Speaker>50%",
    scene: "公共社交场景",
    strategy: "Time-Invisible (C)",
    color: "from-accent to-accent-glow",
    icon: Tv,
  },
  {
    id: "A",
    label: "连续追剧",
    rule: "Continuous Playback > 1集",
    scene: "沉浸追剧场景",
    strategy: "Time-Convertible (A)",
    color: "from-primary to-primary-glow",
    icon: Film,
  },
  {
    id: "B",
    label: "碎片点播 (兜底)",
    rule: "Video_Length < 45min",
    scene: "碎片点播场景",
    strategy: "Time-Choice (B)",
    color: "from-purple-500 to-pink-500",
    icon: Gamepad2,
  },
];

export default function RuleEngineFlow() {
  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Cpu className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Rule Engine · 实时判定</h3>
          <p className="text-xs text-muted-foreground">客户端上报环境参数 → 中台返回广告策略</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
        {/* 输入参数 */}
        <div className="rounded-xl border border-border/60 bg-background/40 p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">环境参数 Input</p>
          {["Casting_Status", "Audio_Output", "Playback_Type", "Video_Length"].map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 py-1.5 text-xs font-mono text-primary/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {p}
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-primary/60" />
        </div>

        {/* 规则判定 */}
        <div className="space-y-2">
          {conditions.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="rounded-lg border border-border/60 bg-background/40 p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`h-6 w-6 rounded bg-gradient-to-br ${c.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {c.id}
                </span>
                <span className="text-xs font-semibold">{c.label}</span>
              </div>
              <code className="text-[10px] text-muted-foreground font-mono">{c.rule}</code>
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-accent/60" />
        </div>

        {/* 输出策略 */}
        <div className="space-y-2">
          {conditions.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className={`rounded-lg border border-border/60 bg-gradient-to-br ${c.color}/10 p-3`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{c.scene}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{c.strategy}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}