import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cast, Smartphone, Gift, Tv, Wifi, X, Sparkles, Cloud, BellRing, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScenePositioning from "@/components/atca/ScenePositioning";
import AIInsightPanel from "@/components/atca/AIInsightPanel";
import vppSceneImg from "@/assets/c-vpp-scene.png";
import showPosterImg from "@/assets/c-show-poster.png";

type Phase = "idle" | "connecting" | "playing" | "vpp";

export default function ModuleC() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showHint, setShowHint] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [vppPulse, setVppPulse] = useState(false);
  const [progress, setProgress] = useState(0);

  const startCast = () => {
    setPhase("connecting");
    setTimeout(() => {
      setPhase("playing");
      setShowHint(true);
      setTimeout(() => setShowBanner(true), 800);
      setTimeout(() => setShowHint(false), 5800);
    }, 1600);
  };

  // 进度推进 & VPP 触发
  useEffect(() => {
    if (phase !== "playing" && phase !== "vpp") return;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.6;
        if (next > 40 && next < 65) setVppPulse(true);
        else setVppPulse(false);
        return next > 100 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(t);
  }, [phase]);

  const reset = () => {
    setPhase("idle");
    setShowHint(false);
    setShowBanner(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-purple-400 uppercase tracking-widest mb-2">Module C · Time-Invisible</p>
            <h1 className="text-3xl lg:text-4xl font-bold">跨端 VPP 静默植入</h1>
            <p className="text-muted-foreground mt-2">投屏免打扰 · 大屏 VPP 虚拟物品 · 小屏代金券 · 跨端状态同步</p>
          </div>
          <Button onClick={phase === "idle" ? startCast : reset} className="bg-gradient-to-r from-purple-500 to-pink-500">
            <Cast className="h-4 w-4" />
            {phase === "idle" ? "开始投屏" : "重置演示"}
          </Button>
        </div>

        {/* 场景定位 + 流程图 */}
        <div className="mb-6">
          <ScenePositioning
            code="C"
            title="跨端 VPP 静默植入"
            strategy="Time-Invisible (C)"
            scene="客厅观影 / 投屏 / 外放音量 > 50% 的公共社交场景"
            value="大屏零贴片打扰保住体验，VPP 虚拟物品做品牌曝光，小屏同步发券完成转化"
            accent="from-purple-500 to-pink-500"
            flow={[
              { label: "投屏检测", desc: "Casting=True 命中", icon: Cast },
              { label: "云端拉取 VPP 流", desc: "已合成虚拟物品分片", icon: Cloud },
              { label: "大屏秒播正片", desc: "无任何前贴片", icon: ShieldCheck },
              { label: "VPP 虚拟物品曝光", desc: "正片中自然植入", icon: Sparkles },
              { label: "小屏 In-App Banner", desc: "跨端同步推送", icon: BellRing },
              { label: "代金券核销", desc: "完成商业闭环", icon: Gift },
            ]}
          />
        </div>

        {/* AI 内容理解层 · 模块 C 实时输出 */}
        <div className="mb-6">
          <AIInsightPanel
            relevance={{
              title: "投屏环境 + 内容场景识别",
              items: [
                { label: "环境", value: "客厅 / 投屏 / 外放" },
                { label: "陪同观看", value: "推断 ≥2 人", confidence: 0.78 },
                { label: "内容类型", value: "庆余年 · 长视频强情节" },
                { label: "适配品牌", value: "农夫山泉 (饮品·客厅高频)" },
              ],
            }}
            moment={{
              title: "公共社交场景 · 任何贴片都打扰",
              tension: 88,
              verdict: "整集禁止显式广告 · 仅允许 VPP 自然植入",
              safe: false,
            }}
            format={{
              title: "大屏静默 + 小屏激活",
              chosen: "VPP 虚拟物品(大屏) + In-App 代金券(小屏)",
              reason: "大屏免打扰守住口碑，小屏跨端发券完成转化闭环",
              alternatives: ["前贴片", "暂停广告", "中插互动"],
            }}
          />
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* TV 大屏 */}
          <div>
            <div className="rounded-3xl border-8 border-card bg-black p-2 shadow-elegant">
              <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-purple-950/30 to-black rounded-2xl overflow-hidden">
                {phase === "idle" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <Tv className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <p className="text-muted-foreground">客厅 TV 大屏 · 等待投屏指令</p>
                  </div>
                )}

                {phase === "connecting" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <Wifi className="h-14 w-14 text-primary" />
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ripple" />
                    </div>
                    <p className="mt-4 text-primary text-sm font-mono">建立投屏连接 · 拉取 VPP 视频流分片...</p>
                  </div>
                )}

                {(phase === "playing" || phase === "vpp") && (
                  <>
                    {/* 替代视频：AI 生成的含 VPP 合成场景图（农夫山泉酒旗自然植入） */}
                    <img
                      src={vppSceneImg}
                      alt="正片场景 · AI 合成农夫山泉 VPP 植入"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-background/60 text-[10px] text-muted-foreground">
                      AI 虚拟生成 · VPP 合成分片
                    </div>

                    {/* 右下小字提示 */}
                    <AnimatePresence>
                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-background/70 backdrop-blur-md text-xs"
                        >
                          本集无贴片打扰，由 <span className="text-accent">农夫山泉</span> 邀您沉浸观影
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 进度条 */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-background/40">
                      <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="absolute top-3 left-4 px-2 py-0.5 rounded bg-background/60 text-[10px]">
                      📺 投屏中 · 4K HDR
                    </div>
                  </>
                )}
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">客厅大屏 · TV 端</p>
          </div>

          {/* Mobile 小屏 */}
          <div className="flex flex-col items-center">
            <div className="relative w-[260px] h-[520px] rounded-[2.5rem] border-[10px] border-card bg-black overflow-hidden shadow-elegant">
              {/* 刘海 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-card rounded-b-2xl z-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-background pt-8">
                {/* App header */}
                <div className="px-4 py-3 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    腾
                  </div>
                  <span className="text-sm font-medium">腾讯视频</span>
                </div>

                <div className="px-4 space-y-3">
                  {/* 投屏状态卡 */}
                  <div
                    className={`rounded-xl p-3 border ${
                      phase === "playing" || phase === "vpp"
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/60 bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Cast className="h-3.5 w-3.5 text-primary" />
                      <span>{phase === "idle" ? "未投屏" : "已投屏到客厅 TV"}</span>
                    </div>
                  </div>

                  {/* 节目卡片 */}
                  <div className="rounded-xl bg-card border border-border/40 overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img src={showPosterImg} alt="庆余年 第二季" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium">庆余年 第二季</p>
                      <p className="text-[10px] text-muted-foreground">EP06 · 投屏播放中</p>
                    </div>
                  </div>
                </div>

                {/* In-App Banner */}
                <AnimatePresence>
                  {showBanner && (
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      className="absolute bottom-4 left-3 right-3 rounded-2xl bg-gradient-to-r from-accent to-pink-500 p-3 shadow-accent-glow"
                    >
                      <button
                        onClick={() => setShowBanner(false)}
                        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/30 flex items-center justify-center"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                          {/* 【素材占位 - 图片】模块C：50元代金券视觉，建议 80x80 PNG */}
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-white">
                          <p className="text-[11px] font-semibold">大屏免打扰已生效！</p>
                          <p className="text-[10px] opacity-90">农夫山泉赠您 ¥50 代金券</p>
                        </div>
                        <button className="px-2 py-1 rounded-md bg-white text-accent text-[10px] font-bold">
                          领取
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Smartphone className="h-3 w-3" /> 手机 App · Mobile 端
            </div>

            {/* 跨端同步示意 */}
            <div className="mt-6 w-full rounded-xl border border-border bg-card p-4 text-xs space-y-2">
              <p className="text-muted-foreground uppercase tracking-widest text-[10px]">跨端同步事件</p>
              <SyncRow active={phase !== "idle"} text="投屏指令上报 ATCA 中台" />
              <SyncRow active={phase === "connecting" || phase === "playing"} text="拉取 VPP 合成视频流" />
              <SyncRow active={phase === "playing"} text="大屏：免打扰提示 (5s)" />
              <SyncRow active={showBanner} text="小屏：In-App Banner 触达" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SyncRow({ active, text }: { active: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 ${active ? "text-primary" : "text-muted-foreground/50"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary animate-pulse" : "bg-muted"}`} />
      <span>{text}</span>
    </div>
  );
}