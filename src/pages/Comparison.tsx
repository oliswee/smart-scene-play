import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipForward, Volume2, X, 
  ThumbsDown, Clock, Angry, Sparkles, 
  Heart, ShoppingCart, Gift, CheckCircle2,
  ArrowRight, RotateCcw, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LegacyStage = "idle" | "preroll" | "main";
type ATCAStage = "idle" | "choice" | "question" | "reward" | "main";

export default function Comparison() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">Before vs After</p>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            广告体验 <span className="text-gradient-primary">改造对比</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            左侧为传统贴片广告体验，右侧为 ATCA AI 改造后的广告体验。
            <br />点击播放按钮，亲身感受两种体验的差异。
          </p>
        </div>

        {/* 痛点概览 */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <PainCard
            icon={ThumbsDown}
            pain="广告与内容无关"
            before="随机投放，看古装剧却推汽车广告"
            after="AI 识别剧情，推荐同类/同情绪品牌"
          />
          <PainCard
            icon={Clock}
            pain="时机差·高潮硬切"
            before="剧情最紧张时强制插入广告"
            after="AI 感知剧情张力，仅在低谷期插入"
          />
          <PainCard
            icon={Angry}
            pain="形式单一·强制观看"
            before="60秒硬塞贴片，无法跳过"
            after="互动答题 / AI混剪 / VPP静默 多形式"
          />
        </div>

        {/* 对比演示 Tabs */}
        <Tabs defaultValue="碎片点播" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="碎片点播">场景1: 碎片点播</TabsTrigger>
            <TabsTrigger value="连续追剧">场景2: 连续追剧</TabsTrigger>
            <TabsTrigger value="客厅投屏">场景3: 客厅投屏</TabsTrigger>
          </TabsList>

          <TabsContent value="碎片点播">
            <ScenarioComparison
              scenario="碎片点播场景"
              desc="用户随机点击一个短视频/综艺片段观看"
              LegacyDemo={LegacyPrerollDemo}
              ATCADemo={ATCAChoiceDemo}
              legacyLabel="传统: 60秒强制贴片"
              atcaLabel="ATCA: 二选一互动竞价 (模块B)"
            />
          </TabsContent>

          <TabsContent value="连续追剧">
            <ScenarioComparison
              scenario="连续追剧场景"
              desc="用户连续观看多集剧集，沉浸式追剧"
              LegacyDemo={LegacySeriesDemo}
              ATCADemo={ATCARecapDemo}
              legacyLabel="传统: 每集前60秒贴片"
              atcaLabel="ATCA: AI混剪回顾 (模块A)"
            />
          </TabsContent>

          <TabsContent value="客厅投屏">
            <ScenarioComparison
              scenario="客厅投屏场景"
              desc="家庭客厅投屏观影，多人共同观看"
              LegacyDemo={LegacyTVDemo}
              ATCADemo={ATCAVPPDemo}
              legacyLabel="传统: 大屏贴片尴尬"
              atcaLabel="ATCA: VPP静默植入 (模块C)"
            />
          </TabsContent>
        </Tabs>

        {/* 数据对比 */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">预期效果对比</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <MetricCard label="广告时段流失率" before="60%+" after="22%" improved />
            <MetricCard label="用户完播率" before="38%" after="75%" improved />
            <MetricCard label="广告互动率" before="<2%" after="42%" improved />
            <MetricCard label="ARPU月增长" before="¥8.2" after="¥11.8" improved />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 子组件 ========== */

function PainCard({
  icon: Icon,
  pain,
  before,
  after,
}: {
  icon: typeof ThumbsDown;
  pain: string;
  before: string;
  after: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">{pain}</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{before}</span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span className="text-foreground">{after}</span>
        </div>
      </div>
    </div>
  );
}

function ScenarioComparison({
  scenario,
  desc,
  LegacyDemo,
  ATCADemo,
  legacyLabel,
  atcaLabel,
}: {
  scenario: string;
  desc: string;
  LegacyDemo: React.FC;
  ATCADemo: React.FC;
  legacyLabel: string;
  atcaLabel: string;
}) {
  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold">{scenario}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Before */}
        <div className="rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 mb-4">
            <X className="h-5 w-5 text-destructive" />
            <span className="text-sm font-bold text-destructive">改造前</span>
            <span className="text-xs text-muted-foreground ml-auto">{legacyLabel}</span>
          </div>
          <LegacyDemo />
        </div>

        {/* After */}
        <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary">改造后</span>
            <span className="text-xs text-muted-foreground ml-auto">{atcaLabel}</span>
          </div>
          <ATCADemo />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  before,
  after,
  improved,
}: {
  label: string;
  before: string;
  after: string;
  improved?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-xs text-muted-foreground mb-2">{label}</p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-lg text-muted-foreground line-through">{before}</span>
        <ArrowRight className="h-4 w-4 text-primary" />
        <span className={`text-xl font-bold ${improved ? "text-primary" : "text-foreground"}`}>
          {after}
        </span>
      </div>
    </div>
  );
}

/* ========== Legacy 演示组件 ========== */

function LegacyPrerollDemo() {
  const [stage, setStage] = useState<LegacyStage>("idle");
  const [countdown, setCountdown] = useState(60);
  const [annoyed, setAnnoyed] = useState(false);

  const start = () => {
    setStage("preroll");
    setCountdown(60);
    setAnnoyed(false);
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          setStage("main");
          return 0;
        }
        if (c === 45) setAnnoyed(true);
        return c - 1;
      });
    }, 100); // 加速演示
  };

  const reset = () => {
    setStage("idle");
    setCountdown(60);
    setAnnoyed(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900"
            >
              <Play className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">点击播放体验传统广告</p>
              <Button size="sm" variant="outline" className="mt-4" onClick={start}>
                <Play className="h-3 w-3" /> 开始播放
              </Button>
            </motion.div>
          )}

          {stage === "preroll" && (
            <motion.div
              key="preroll"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-orange-900/50 flex flex-col items-center justify-center"
            >
              <p className="text-xs text-muted-foreground mb-2">广告 · 无法跳过</p>
              <div className="w-32 h-20 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <span className="text-xs text-muted-foreground">汽车广告</span>
              </div>
              <p className="text-lg font-bold">正在播放: 某品牌汽车</p>
              <p className="text-xs text-muted-foreground mt-1">与您观看的古装剧毫无关系</p>
              
              {/* 倒计时 */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-xs">
                广告剩余 {countdown}s
              </div>

              {/* 烦躁情绪 */}
              <AnimatePresence>
                {annoyed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-destructive/90 rounded-lg p-3 flex items-center gap-2"
                  >
                    <Angry className="h-5 w-5 text-destructive-foreground" />
                    <span className="text-sm text-destructive-foreground">用户情绪: 烦躁 / 想跳过</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center"
            >
              <CheckCircle2 className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm">终于开始播放正片...</p>
              <p className="text-xs text-muted-foreground mt-1">用户已流失 60%+</p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={reset}>
                <RotateCcw className="h-3 w-3" /> 重新演示
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ATCAChoiceDemo() {
  const [stage, setStage] = useState<ATCAStage>("idle");
  const [selected, setSelected] = useState<string | null>(null);

  const start = () => setStage("choice");

  const chooseAd = () => {
    // 模拟传统路径
    setStage("main");
  };

  const chooseQuiz = () => {
    setStage("question");
  };

  const answer = (opt: string) => {
    setSelected(opt);
    setTimeout(() => setStage("reward"), 500);
    setTimeout(() => setStage("main"), 2500);
  };

  const reset = () => {
    setStage("idle");
    setSelected(null);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-primary/30 bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"
            >
              <Sparkles className="h-12 w-12 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">点击播放体验 ATCA 广告</p>
              <Button size="sm" className="mt-4 bg-gradient-primary" onClick={start}>
                <Play className="h-3 w-3" /> 开始播放
              </Button>
            </motion.div>
          )}

          {stage === "choice" && (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex"
            >
              <button
                onClick={chooseAd}
                className="w-[35%] bg-slate-900 hover:bg-slate-800 transition flex flex-col items-center justify-center gap-2 border-r border-border/40"
              >
                <p className="text-xs text-muted-foreground">看 60s 广告</p>
                <p className="text-sm">传统路径</p>
              </button>
              <button
                onClick={chooseQuiz}
                className="flex-1 bg-gradient-to-br from-accent/30 to-primary/20 hover:from-accent/40 transition flex flex-col items-center justify-center gap-2"
              >
                <Gift className="h-8 w-8 text-accent" />
                <p className="text-lg font-bold">答题免广告</p>
                <p className="text-xs text-muted-foreground">回答品牌问题 + 获得卡券</p>
                <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] mt-1">
                  推荐
                </span>
              </button>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-background border-2 border-accent flex items-center justify-center text-lg font-bold text-accent">
                5
              </div>
            </motion.div>
          )}

          {stage === "question" && (
            <motion.div
              key="q"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center p-4"
            >
              <p className="text-xs text-accent mb-2">品牌互动 · Cartier</p>
              <h3 className="text-sm font-bold mb-4 text-center">剧中女主佩戴的项链是哪个品牌?</h3>
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                {["Tiffany", "Cartier", "Bvlgari", "Chanel"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => answer(opt)}
                    className={`p-2 rounded-lg border text-sm transition ${
                      selected === opt
                        ? opt === "Cartier"
                          ? "border-primary bg-primary/20"
                          : "border-destructive bg-destructive/20"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "reward" && (
            <motion.div
              key="reward"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex flex-col items-center justify-center"
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                <CheckCircle2 className="h-12 w-12 text-primary mb-2" />
              </motion.div>
              <p className="text-lg font-bold text-gradient-primary">免广告 + 卡券已到账!</p>
              <p className="text-xs text-muted-foreground mt-1">由 Cartier 赞助</p>
            </motion.div>
          )}

          {stage === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center"
            >
              <Heart className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm">正片秒播 · 体验流畅</p>
              <p className="text-xs text-muted-foreground mt-1">用户满意度 +86%</p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={reset}>
                <RotateCcw className="h-3 w-3" /> 重新演示
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ========== 场景2: 连续追剧 ========== */

function LegacySeriesDemo() {
  const [stage, setStage] = useState<"idle" | "playing" | "break" | "ad" | "main">("idle");

  const start = () => {
    setStage("playing");
    setTimeout(() => setStage("break"), 1500);
    setTimeout(() => setStage("ad"), 2500);
  };

  const skipAd = () => setStage("main");
  const reset = () => setStage("idle");

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
              <Play className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">EP05 播放完毕</p>
              <Button size="sm" variant="outline" className="mt-4" onClick={start}>
                <SkipForward className="h-3 w-3" /> 下一集
              </Button>
            </motion.div>
          )}

          {stage === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-amber-900/30 flex items-center justify-center">
              <p className="text-sm">EP05 精彩结局中...</p>
            </motion.div>
          )}

          {stage === "break" && (
            <motion.div key="break" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-muted-foreground border-t-transparent animate-spin" />
              <p className="absolute bottom-4 text-xs text-muted-foreground">黑屏加载中...</p>
            </motion.div>
          )}

          {stage === "ad" && (
            <motion.div key="ad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-orange-900/50 flex flex-col items-center justify-center">
              <p className="text-lg font-bold mb-2">60秒汽车广告</p>
              <p className="text-xs text-muted-foreground">剧情沉浸感被打断</p>
              <div className="absolute bottom-4 flex items-center gap-2">
                <Angry className="h-4 w-4 text-destructive" />
                <span className="text-xs text-destructive">追剧心流被破坏</span>
              </div>
              <Button size="sm" variant="ghost" className="mt-4" onClick={skipAd}>
                跳过 (演示)
              </Button>
            </motion.div>
          )}

          {stage === "main" && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center">
              <p className="text-sm">EP06 开始播放</p>
              <p className="text-xs text-muted-foreground mt-1">但用户已感到疲惫...</p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={reset}>
                <RotateCcw className="h-3 w-3" /> 重新演示
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ATCARecapDemo() {
  const [stage, setStage] = useState<"idle" | "recap" | "main">("idle");
  const [showCart, setShowCart] = useState(false);

  const start = () => {
    setStage("recap");
    setTimeout(() => setShowCart(true), 1500);
    setTimeout(() => setStage("main"), 4000);
  };

  const reset = () => {
    setStage("idle");
    setShowCart(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-primary/30 bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Sparkles className="h-12 w-12 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">EP05 播放完毕</p>
              <Button size="sm" className="mt-4 bg-gradient-primary" onClick={start}>
                <SkipForward className="h-3 w-3" /> 下一集
              </Button>
            </motion.div>
          )}

          {stage === "recap" && (
            <motion.div key="recap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-primary/20">
              {/* 顶部品牌浮层 */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-background/70 backdrop-blur text-xs flex items-center gap-2"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                上集回顾由 <span className="text-primary font-bold">元气森林</span> 护航
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-bold">AI 混剪上集高能片段 (18s)</p>
              </div>

              {/* 悬浮购物车 */}
              <AnimatePresence>
                {showCart && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute bottom-12 right-3 h-12 w-12 rounded-full bg-gradient-accent shadow-accent-glow flex items-center justify-center cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5 text-accent-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
                零黑屏 · 情绪不断
              </div>
            </motion.div>
          )}

          {stage === "main" && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center">
              <Heart className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm">EP06 无缝开播</p>
              <p className="text-xs text-muted-foreground mt-1">追剧心流完美保持</p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={reset}>
                <RotateCcw className="h-3 w-3" /> 重新演示
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ========== 场景3: 客厅投屏 ========== */

function LegacyTVDemo() {
  const [stage, setStage] = useState<"idle" | "ad" | "main">("idle");

  const start = () => {
    setStage("ad");
    setTimeout(() => setStage("main"), 3000);
  };

  const reset = () => setStage("idle");

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
              <Volume2 className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">客厅投屏准备就绪</p>
              <Button size="sm" variant="outline" className="mt-4" onClick={start}>
                <Play className="h-3 w-3" /> 开始投屏
              </Button>
            </motion.div>
          )}

          {stage === "ad" && (
            <motion.div key="ad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-orange-900/50 flex flex-col items-center justify-center">
              <p className="text-lg font-bold mb-2">大屏播放广告</p>
              <p className="text-xs text-muted-foreground text-center px-4">
                全家人一起尴尬地看60秒广告
                <br />
                社交场景下体验极差
              </p>
              <div className="absolute bottom-4 flex items-center gap-2">
                <Angry className="h-4 w-4 text-destructive" />
                <span className="text-xs text-destructive">家庭观影氛围被破坏</span>
              </div>
            </motion.div>
          )}

          {stage === "main" && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center">
              <p className="text-sm">正片终于开始...</p>
              <Button size="sm" variant="ghost" className="mt-4" onClick={reset}>
                <RotateCcw className="h-3 w-3" /> 重新演示
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ATCAVPPDemo() {
  const [stage, setStage] = useState<"idle" | "playing" | "vpp">("idle");
  const [showBanner, setShowBanner] = useState(false);

  const start = () => {
    setStage("playing");
    setTimeout(() => {
      setStage("vpp");
      setShowBanner(true);
    }, 1500);
  };

  const reset = () => {
    setStage("idle");
    setShowBanner(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-primary/30 bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
              <Sparkles className="h-12 w-12 text-primary mb-3" />
              <p className="text-sm text-muted-foreground">客厅投屏准备就绪</p>
              <Button size="sm" className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500" onClick={start}>
                <Play className="h-3 w-3" /> 开始投屏
              </Button>
            </motion.div>
          )}

          {stage === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-amber-900/30 flex items-center justify-center">
              <p className="text-sm font-bold">正片秒播 · 零贴片</p>
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-primary/80 text-[10px] text-primary-foreground">
                投屏中 · 免打扰模式
              </div>
            </motion.div>
          )}

          {stage === "vpp" && (
            <motion.div key="vpp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-purple-900/20">
              {/* VPP 虚拟物品 */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute bottom-[30%] right-[25%]"
              >
                <div className="relative">
                  <div className="h-10 w-6 rounded bg-gradient-to-b from-accent to-accent-glow shadow-accent-glow" />
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-accent text-[8px] text-accent-foreground whitespace-nowrap">
                    VPP 元气森林
                  </span>
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs text-muted-foreground">大屏正片播放中 · VPP自然植入</p>
              </div>

              {/* 小屏 Banner 提示 */}
              <AnimatePresence>
                {showBanner && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-accent to-pink-500 rounded-lg p-2 flex items-center gap-2"
                  >
                    <Gift className="h-4 w-4 text-white" />
                    <div className="flex-1 text-white text-[10px]">
                      <p className="font-bold">小屏同步收到代金券!</p>
                      <p className="opacity-80">元气森林 ¥50</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded bg-background/60 text-[10px]">
                <Heart className="h-3 w-3 text-primary" />
                家庭观影体验 +96%
              </div>

              <Button size="sm" variant="ghost" className="absolute bottom-3 right-3" onClick={reset}>
                <RotateCcw className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
