import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Sparkles, X, Plus, Tag, Brain, PlayCircle, Film, Layers, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScenePositioning from "@/components/atca/ScenePositioning";
import AIInsightPanel from "@/components/atca/AIInsightPanel";
import yuanqiImg from "@/assets/a-yuanqi.png";
import aiRecapVideo from "@/assets/a-ai-recap.mp4";

const emotionTags = [
  { tag: "悬疑", weight: 0.82, color: "bg-purple-500" },
  { tag: "热血", weight: 0.74, color: "bg-accent" },
  { tag: "情感", weight: 0.61, color: "bg-pink-500" },
  { tag: "搞笑", weight: 0.43, color: "bg-yellow-500" },
];

const aigcLogs = [
  "[T+0.0s] 接收上一集 video stream...",
  "[T+0.2s] 关键帧提取完成 (45 frames)",
  "[T+0.4s] 情绪打标: 悬疑 0.82 / 热血 0.74",
  "[T+0.6s] 命中广告主『元气森林』(情绪定向: 悬疑)",
  "[T+0.8s] AI 混剪生成 18s 回顾视频",
  "[T+1.0s] 注入品牌护航浮层 + 购物车挂件",
  "[T+1.1s] ✓ 推流播放器，零黑屏切换",
];

export default function ModuleA() {
  const [showCart, setShowCart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLogIndex((i) => (i + 1) % (aigcLogs.length + 1));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        <div className="mb-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-primary uppercase tracking-widest mb-2">Module A · Time-Convertible</p>
            <h1 className="text-3xl lg:text-4xl font-bold">AIGC 动态回顾广告</h1>
            <p className="text-muted-foreground mt-2">连播衔接 → AI 混剪上集 → 品牌护航 → 悬浮购物车加购</p>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary">
            场景：沉浸追剧
          </span>
        </div>

        {/* 场景定位 + 流程图 */}
        <div className="mb-6">
          <ScenePositioning
            code="A"
            title="AIGC 动态回顾广告"
            strategy="Time-Convertible (A)"
            scene="用户连续追剧，上集播完即将进入下一集的衔接时刻"
            value={`把"广告等待时间"转化成"高情绪剧情回顾"，零黑屏切换 + 商品悬浮加购`}
            accent="from-primary to-primary-glow"
            flow={[
              { label: "上集播完", desc: "Continuous Playback 命中", icon: PlayCircle },
              { label: "AI 提取关键帧", desc: "情绪打标 / 品牌定向", icon: Brain },
              { label: "AI 混剪 18s", desc: "替代传统贴片", icon: Film },
              { label: "品牌护航浮层", desc: "顶部品牌名 + 角标", icon: Layers },
              { label: "悬浮购物车", desc: "点击 → 半屏加购", icon: MousePointerClick },
              { label: "无缝进下一集", desc: "零黑屏 / 零等待" },
            ]}
          />
        </div>

        {/* AI 内容理解层 · 模块 A 实时输出 */}
        <div className="mb-6">
          <AIInsightPanel
            relevance={{
              title: "上集内容识别 → 同源品牌",
              items: [
                { label: "剧集", value: "庆余年 EP05" },
                { label: "主导情绪", value: "悬疑 / 热血", confidence: 0.82 },
                { label: "高频道具", value: "茶具 · 长袍" },
                { label: "匹配品牌", value: "元气森林 (情绪定向)" },
              ],
            }}
            moment={{
              title: "连播衔接 = 安全插入点",
              tension: 12,
              verdict: "上集已落幕，张力归零 · 可下发 AI 混剪",
              safe: true,
            }}
            format={{
              title: "替代 60s 贴片",
              chosen: "AI 混剪回顾 18s + 品牌护航 + 悬浮购物车",
              reason: "用户处于高情绪连播态，混剪保留情绪 + 浮层不打断观剧",
              alternatives: ["60s 贴片", "中插广告", "暂停页广告"],
            }}
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* 播放器 */}
          <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-elegant">
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
              {/* 模块A：上集 AI 混剪回顾视频 */}
              <video
                src={aiRecapVideo}
                autoPlay
                loop
                playsInline
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 顶部品牌护航浮层 */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-4 left-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-background/70 backdrop-blur-md border border-primary/30 pointer-events-none z-10"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs">
                  上集高能回顾，本集由 <strong className="text-primary">元气森林</strong> 为您护航
                </span>
              </motion.div>

              {/* 右下悬浮购物车 */}
              <motion.button
                onClick={() => setShowCart(true)}
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-16 right-4 h-16 w-16 rounded-full bg-gradient-accent shadow-accent-glow flex items-center justify-center group"
              >
                <span className="absolute inset-0 rounded-full bg-accent animate-ripple" />
                <img src={yuanqiImg} alt="元气森林" className="h-10 w-10 object-contain relative" />
              </motion.button>
            </div>

            <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">AI 混剪回顾 + 品牌护航贴片 · 下一集无缝转场</span>
              <span className="text-primary font-mono">Time-Convertible Strategy</span>
            </div>
          </div>

          {/* AIGC 后台面板 */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-gradient-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">AIGC 打标过程</h3>
              </div>
              <div className="space-y-2">
                {emotionTags.map((t) => (
                  <div key={t.tag} className="flex items-center gap-2">
                    <span className="text-xs w-10">{t.tag}</span>
                    <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${t.weight * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${t.color}`}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-10 text-right">
                      {t.weight.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-1.5 text-xs">
                <Tag className="h-3 w-3 text-accent" />
                <span className="text-muted-foreground">广告主按情绪标签竞价：</span>
                <span className="text-accent">悬疑 ¥</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 font-mono text-xs">
              <p className="text-muted-foreground mb-2">// AIGC pipeline log</p>
              {aigcLogs.slice(0, logIndex).map((l, i) => (
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary/80 py-0.5">
                  {l}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 半屏小程序加购 */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary rounded-t-3xl p-6 max-h-[60vh]"
            >
              <div className="mx-auto max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">微信小程序 · 一键加购</p>
                    <h3 className="text-lg font-bold">元气森林 · 白桃味气泡水</h3>
                  </div>
                  <button onClick={() => setShowCart(false)} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="h-32 w-32 rounded-xl bg-gradient-to-br from-pink-500/20 to-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={yuanqiImg} alt="元气森林白桃味气泡水" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-accent mb-1">¥5.9</p>
                    <p className="text-xs text-muted-foreground line-through">¥7.9</p>
                    <div className="flex items-center gap-1 mt-2 text-xs">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-primary">追剧专享 · 满 3 件包邮</span>
                    </div>
                    <Button className="mt-3 w-full bg-gradient-accent">
                      <Plus className="h-4 w-4" /> 加入购物车
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}