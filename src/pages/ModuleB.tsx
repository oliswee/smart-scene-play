import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Gift, RotateCcw, Trophy, Database, Timer, MousePointerClick, HelpCircle, Award, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScenePositioning from "@/components/atca/ScenePositioning";
import AIInsightPanel from "@/components/atca/AIInsightPanel";
import necklaceImg from "@/assets/b-necklace.png";
import advertVideo from "@/assets/b-advert.mp4";
import seriesVideo from "@/assets/b-series.mp4";

type Stage = "split" | "preroll" | "question" | "reward" | "main";

export default function ModuleB() {
  const [stage, setStage] = useState<Stage>("split");
  const [countdown, setCountdown] = useState(5);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const timerRef = useRef<number | null>(null);

  // split 阶段倒计时
  useEffect(() => {
    if (stage !== "split") return;
    setCountdown(5);
    const t = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(t);
          setStage("preroll");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    timerRef.current = t;
    return () => window.clearInterval(t);
  }, [stage]);

  const reset = () => {
    setStage("split");
    setSelected(null);
    setCorrect(null);
  };

  const choose = (opt: string) => {
    setSelected(opt);
    const isRight = opt === "Cartier";
    setCorrect(isRight);
    setTimeout(() => setStage("reward"), 600);
    setTimeout(() => setStage("main"), 3200);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-accent uppercase tracking-widest mb-2">Module B · Time-Choice · MVP</p>
            <h1 className="text-3xl lg:text-4xl font-bold">二选一互动竞价池</h1>
            <p className="text-muted-foreground mt-2">
              5秒倒计时分屏 · 答题免广告 · 微信卡券即时核销 · CPE 计费
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> 重新演示
          </Button>
        </div>

        {/* 场景定位 + 流程图 */}
        <div className="mb-6">
          <ScenePositioning
            code="B"
            title="二选一互动竞价池"
            strategy="Time-Choice (B)"
            scene="非连播的单次视频点击，用户碎片化点播短中视频（< 45min）"
            value={`把"被动看 60s 贴片"变"主动答题免广告"，按互动 CPE 竞价 + 微信卡券即时闭环`}
            accent="from-accent to-accent-glow"
            flow={[
              { label: "进入播放", desc: "命中 Time-Choice", icon: PlayCircle },
              { label: "5s 分屏倒计时", desc: "左 30% 贴片 / 右 70% 答题", icon: Timer },
              { label: "用户选择", desc: "默认走贴片 / 主动答题", icon: MousePointerClick },
              { label: "弹出选择题", desc: "剧中道具品牌识别", icon: HelpCircle },
              { label: "答对发卡券", desc: "微信卡包即时到账", icon: Award },
              { label: "切入正片", desc: "跳过 60s 贴片" },
            ]}
          />
        </div>

        {/* AI 内容理解层 · 模块 B 实时输出 */}
        <div className="mb-6">
          <AIInsightPanel
            relevance={{
              title: "剧中道具识别 → 题库匹配",
              items: [
                { label: "剧集", value: "三十而已 EP01" },
                { label: "镜头道具", value: "项链特写", confidence: 0.91 },
                { label: "品牌识别", value: "Cartier (款式比对)" },
                { label: "用户画像", value: "互动倾向 · 高" },
              ],
            }}
            moment={{
              title: "正片开播前 · 零张力起点",
              tension: 5,
              verdict: "用户期待值高、剧情未开始 · 适合互动",
              safe: true,
            }}
            format={{
              title: "形式编排：互动 vs 贴片",
              chosen: "5s 分屏倒计时 + 二选一答题 (CPE)",
              reason: "用户互动倾向高 + 道具品牌匹配成功，触发 Time-Choice 形式",
              alternatives: ["60s 强制贴片", "纯展示中插", "片尾贴片"],
            }}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* 播放器主舞台 */}
          <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-elegant">
            <div className="relative aspect-video bg-black">
              {/* 模块B：剧集正片首帧静音底图 */}
              <video
                src={seriesVideo}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />

              <AnimatePresence mode="wait">
                {stage === "split" && (
                  <motion.div
                    key="split"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex"
                  >
                    {/* 左 30% 贴片 */}
                    <button
                      onClick={() => setStage("preroll")}
                      className="w-[30%] bg-gradient-to-br from-slate-800 to-slate-900 border-r border-border/40 hover:from-slate-700 transition-all flex flex-col items-center justify-center gap-3 group"
                    >
                      {/* 【素材占位 - 视频】模块B：60s 标准贴片广告 */}
                      <div className="text-center px-4">
                        <p className="text-xs text-muted-foreground mb-2">Default · 60s</p>
                        <p className="text-sm font-medium">观看常规贴片</p>
                        <p className="text-xs text-muted-foreground mt-2">点击或等待倒计时</p>
                      </div>
                    </button>
                    {/* 右 70% 答题 */}
                    <button
                      onClick={() => setStage("question")}
                      className="flex-1 bg-gradient-to-br from-accent/30 via-accent/20 to-pink-500/20 hover:from-accent/40 transition-all flex flex-col items-center justify-center gap-3 relative group"
                    >
                      <Trophy className="h-10 w-10 text-accent" />
                      <p className="text-xl font-bold">回答 Cartier 的问题</p>
                      <p className="text-sm text-foreground/80">免广告直接看正片 + 卡券奖励</p>
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 text-xs">
                        <span className="text-accent">推荐</span>
                      </div>
                    </button>

                    {/* 倒计时圆环 */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-background/80 border-2 border-accent flex items-center justify-center">
                      <motion.span
                        key={countdown}
                        initial={{ scale: 1.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-xl font-bold text-accent"
                      >
                        {countdown}
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {stage === "preroll" && (
                  <motion.div
                    key="preroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black"
                  >
                    {/* 模块B：60s 标准贴片广告 */}
                    <video
                      src={advertVideo}
                      autoPlay
                      muted
                      playsInline
                      onEnded={() => setStage("main")}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-background/70 text-[10px] text-muted-foreground">
                      默认贴片广告
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-4 right-4 bg-background/70 backdrop-blur"
                      onClick={() => setStage("main")}
                    >
                      跳过
                    </Button>
                  </motion.div>
                )}

                {stage === "question" && (
                  <motion.div
                    key="q"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center p-8"
                  >
                    <div className="max-w-2xl w-full">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs">品牌互动</span>
                        <span className="text-xs text-muted-foreground">来自 Cartier · 答对赢免广告 + 卡券</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-6">剧中女主在第 3 集佩戴的项链是哪个品牌？</h2>
                      <div className="h-40 rounded-xl border border-border overflow-hidden mb-6 bg-card">
                        <img src={necklaceImg} alt="剧中项链特写" className="w-full h-full object-cover" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {["Tiffany", "Cartier", "Bvlgari", "Chanel"].map((opt) => {
                          const isSelected = selected === opt;
                          const showCorrect = selected !== null;
                          return (
                            <button
                              key={opt}
                              onClick={() => !selected && choose(opt)}
                              disabled={!!selected}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                isSelected && correct
                                  ? "border-primary bg-primary/20"
                                  : isSelected && !correct
                                  ? "border-destructive bg-destructive/20"
                                  : showCorrect && opt === "Cartier"
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-accent hover:bg-accent/10"
                              }`}
                            >
                              <span className="font-medium">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {stage === "reward" && (
                  <motion.div
                    key="r"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-purple-500/30 flex items-center justify-center"
                  >
                    <div className="text-center relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.6 }}
                      >
                        <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-4" />
                      </motion.div>
                      <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl font-bold mb-2 text-gradient-primary"
                      >
                        🎉 获得免广告特权
                      </motion.h2>
                      <p className="text-foreground/80 mb-2">由 Cartier 赞助</p>
                      {/* 飘字动效 */}
                      <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -80, opacity: 0 }}
                        transition={{ duration: 1.6, delay: 0.4 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center gap-2 whitespace-nowrap"
                      >
                        <Gift className="h-4 w-4" /> 卡券已到账微信卡包
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {stage === "main" && (
                  <motion.div
                    key="m"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    {/* 模块B：剧集正片视频流 */}
                    <video
                      src={seriesVideo}
                      autoPlay
                      loop
                      playsInline
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-background/70 text-[10px] text-foreground">
                      ▶ 三十而已 EP01
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">当前阶段：<span className="text-accent font-mono">{stage}</span></span>
              <span className="text-accent font-mono">CPE 计费 · ¥0.85 / engagement</span>
            </div>
          </div>

          {/* 题库配置预览 */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-gradient-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-sm">题库配置平台</h3>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { brand: "Cartier", q: "项链品牌识别", cpe: "¥0.85", state: "running" },
                  { brand: "元气森林", q: "饮料口味识别", cpe: "¥0.42", state: "running" },
                  { brand: "Tesla", q: "车型识别", cpe: "¥1.20", state: "queued" },
                  { brand: "兰蔻", q: "口红色号识别", cpe: "¥0.96", state: "queued" },
                ].map((item) => (
                  <div
                    key={item.brand}
                    className="rounded-lg border border-border/40 bg-background/40 p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.brand}</p>
                      <p className="text-muted-foreground text-[10px]">{item.q}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-accent">{item.cpe}</p>
                      <p
                        className={`text-[10px] ${
                          item.state === "running" ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        ● {item.state}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground">
                广告主可上传题目，或基于剧集台本由 AI 自动生成
              </p>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-xs text-primary mb-2">📊 实时数据</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Stat l="点击率" v="42.6%" />
                <Stat l="答对率" v="71.3%" />
                <Stat l="放弃率" v="18.4%" />
                <Stat l="CPE 均价" v="¥0.78" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-lg bg-background/40 p-3">
      <p className="text-muted-foreground">{l}</p>
      <p className="text-base font-bold text-foreground">{v}</p>
    </div>
  );
}