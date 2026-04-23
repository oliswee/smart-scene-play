import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Cpu, Tv, Film, Gamepad2 } from "lucide-react";

type Strategy = {
  id: "A" | "B" | "C";
  scene: string;
  strategy: string;
  module: string;
  to: string;
  color: string;
  icon: typeof Tv;
};

function decideStrategy(p: {
  casting: boolean;
  audioSpeaker: boolean;
  volume: number;
  continuous: boolean;
  videoLength: number;
}): Strategy {
  // 判断条件 1
  if (p.casting || (p.audioSpeaker && p.volume > 50)) {
    return {
      id: "C",
      scene: "公共社交场景",
      strategy: "Time-Invisible (C)",
      module: "模块 C · 跨端 VPP 静默植入",
      to: "/module-c",
      color: "purple",
      icon: Tv,
    };
  }
  // 判断条件 2
  if (!p.casting && p.continuous) {
    return {
      id: "A",
      scene: "沉浸追剧场景",
      strategy: "Time-Convertible (A)",
      module: "模块 A · AIGC 动态回顾",
      to: "/module-a",
      color: "primary",
      icon: Film,
    };
  }
  // 判断条件 3 兜底
  return {
    id: "B",
    scene: "碎片点播场景",
    strategy: "Time-Choice (B)",
    module: "模块 B · 二选一互动竞价",
    to: "/module-b",
    color: "accent",
    icon: Gamepad2,
  };
}

export default function Simulator() {
  const [casting, setCasting] = useState(false);
  const [audioSpeaker, setAudioSpeaker] = useState(false);
  const [volume, setVolume] = useState(60);
  const [continuous, setContinuous] = useState(false);
  const [videoLength, setVideoLength] = useState(35);

  const result = useMemo(
    () => decideStrategy({ casting, audioSpeaker, volume, continuous, videoLength }),
    [casting, audioSpeaker, volume, continuous, videoLength]
  );
  const Icon = result.icon;

  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">Scenario Simulator</p>
          <h1 className="text-3xl lg:text-4xl font-bold">场景模拟器</h1>
          <p className="text-muted-foreground mt-2">调整下方环境参数，实时观察 ATCA 调度引擎的判定结果</p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">
          {/* 左：参数面板 */}
          <div className="rounded-2xl border border-border bg-gradient-card p-6 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-border/60">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold">环境参数 Input</h3>
            </div>

            <div className="space-y-5">
              <ParamRow label="Casting_Status" desc="是否处于投屏状态">
                <Switch checked={casting} onCheckedChange={setCasting} />
              </ParamRow>
              <ParamRow label="Audio_Output = Speaker" desc="是否使用外放扬声器">
                <Switch checked={audioSpeaker} onCheckedChange={setAudioSpeaker} />
              </ParamRow>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Volume</p>
                    <p className="text-xs text-muted-foreground">系统音量</p>
                  </div>
                  <span className="font-mono text-sm text-primary">{volume}%</span>
                </div>
                <Slider value={[volume]} max={100} step={5} onValueChange={(v) => setVolume(v[0])} />
              </div>
              <ParamRow label="Playback_Type = Continuous" desc="是否连续播放 >1 集">
                <Switch checked={continuous} onCheckedChange={setContinuous} />
              </ParamRow>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Video_Length</p>
                    <p className="text-xs text-muted-foreground">视频时长（分钟）</p>
                  </div>
                  <span className="font-mono text-sm text-primary">{videoLength}min</span>
                </div>
                <Slider value={[videoLength]} max={90} step={5} onValueChange={(v) => setVideoLength(v[0])} />
              </div>
            </div>
          </div>

          {/* 右：结果面板 */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border-2 p-8 relative overflow-hidden ${
                  result.id === "A"
                    ? "border-primary/50 bg-primary/5"
                    : result.id === "B"
                    ? "border-accent/50 bg-accent/5"
                    : "border-purple-500/50 bg-purple-500/5"
                }`}
              >
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-30 bg-current pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">命中策略</span>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center shrink-0">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{result.scene}</h2>
                      <p className="font-mono text-sm text-muted-foreground">{result.strategy}</p>
                    </div>
                    <span className="ml-auto text-7xl font-black opacity-15">{result.id}</span>
                  </div>
                  <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                    <Link to={result.to}>
                      跳转到 {result.module} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 判定逻辑展示 */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-muted-foreground">判定执行链</h3>
              <div className="space-y-3 font-mono text-xs">
                <RuleStep
                  active={casting || (audioSpeaker && volume > 50)}
                  passed={casting || (audioSpeaker && volume > 50)}
                  label="Condition 1"
                  expr={`Casting==${casting} OR (Speaker==${audioSpeaker} AND Vol>50)`}
                  hit="→ Time-Invisible (C)"
                />
                <RuleStep
                  active={!(casting || (audioSpeaker && volume > 50))}
                  passed={!casting && continuous}
                  label="Condition 2"
                  expr={`!Casting AND Continuous==${continuous}`}
                  hit="→ Time-Convertible (A)"
                />
                <RuleStep
                  active={
                    !(casting || (audioSpeaker && volume > 50)) && !(!casting && continuous)
                  }
                  passed={videoLength < 45}
                  label="Fallback"
                  expr={`Video_Length(${videoLength}) < 45`}
                  hit="→ Time-Choice (B)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParamRow({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function RuleStep({
  active,
  passed,
  label,
  expr,
  hit,
}: {
  active: boolean;
  passed: boolean;
  label: string;
  expr: string;
  hit: string;
}) {
  return (
    <div
      className={`rounded-lg border p-3 transition-all ${
        active && passed
          ? "border-primary bg-primary/10"
          : active
          ? "border-border bg-background/40"
          : "border-border/40 bg-background/20 opacity-50"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        {active && passed && <span className="text-primary text-[10px]">● MATCH</span>}
      </div>
      <p className="text-foreground/80">{expr}</p>
      {active && passed && <p className="text-primary mt-1">{hit}</p>}
    </div>
  );
}