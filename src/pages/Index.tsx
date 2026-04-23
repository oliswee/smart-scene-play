import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Film, Gamepad2, Tv, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RuleEngineFlow from "@/components/atca/RuleEngineFlow";
import AIContentLayer from "@/components/atca/AIContentLayer";

const modules = [
  {
    id: "A",
    to: "/module-a",
    name: "AIGC 动态回顾",
    code: "Time-Convertible",
    desc: "连播无缝衔接 · AI 混剪上集 · 品牌护航浮层 · 悬浮购物车加购",
    icon: Film,
    gradient: "from-primary/20 to-primary/5",
    accent: "text-primary",
    border: "border-primary/30 hover:border-primary",
  },
  {
    id: "B",
    to: "/module-b",
    name: "二选一互动竞价",
    code: "Time-Choice · MVP",
    desc: "5秒分屏倒计时 · 答题免广告 · CPE 计费模型 · 微信卡券即时核销",
    icon: Gamepad2,
    gradient: "from-accent/20 to-accent/5",
    accent: "text-accent",
    border: "border-accent/30 hover:border-accent",
  },
  {
    id: "C",
    to: "/module-c",
    name: "跨端 VPP 静默植入",
    code: "Time-Invisible",
    desc: "投屏免打扰 · 大屏 VPP 虚拟物品 · 小屏代金券 Banner · 跨端状态同步",
    icon: Tv,
    gradient: "from-purple-500/20 to-pink-500/5",
    accent: "text-purple-400",
    border: "border-purple-500/30 hover:border-purple-500",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-20 right-10 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[100px]" />

        <div className="relative mx-auto max-w-[1600px] px-4 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">ATCA · Adaptive Tencent Commercial Architecture V1.0</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              让广告 <span className="text-gradient-primary">读懂场景</span>
              <br />
              让用户 <span className="text-gradient-accent">爱上互动</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed">
              腾讯视频 ATCA 智能广告调度中台，基于<strong className="text-foreground">实时环境参数</strong>动态匹配三大商业化模块，
              将传统贴片转化为<strong className="text-foreground">可互动 / 可转化 / 不打扰</strong>的下一代视频广告体验。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
                <Link to="/simulator">
                  <Zap className="h-4 w-4" />
                  体验场景模拟器
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">
                  <BarChart3 className="h-4 w-4" />
                  查看 KPI 看板
                </Link>
              </Button>
            </div>

            {/* 数据指标 */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
              {[
                { v: "3", l: "商业化模块" },
                { v: "<50ms", l: "调度判定延迟" },
                { v: "+38%", l: "ARPU 增益预期" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary/40 pl-4">
                  <p className="text-2xl lg:text-3xl font-bold text-gradient-primary">{s.v}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI 内容理解层 (V1.1 新增 - 解决相关性/时机/形式三大痛点) */}
      <section className="mx-auto max-w-[1600px] px-4 lg:px-8 pt-16">
        <div className="mb-8">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">AI Intelligence Layer</p>
          <h2 className="text-3xl lg:text-4xl font-bold">AI 控制广告"内容 · 时机 · 形式"</h2>
          <p className="text-muted-foreground mt-2">在调度引擎之上叠加内容感知能力，从根本上解决广告"无关 / 突兀 / 单一"的体验问题</p>
        </div>
        <AIContentLayer />
      </section>

      {/* 三大模块卡片 */}
      <section className="mx-auto max-w-[1600px] px-4 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs text-accent uppercase tracking-widest mb-2">Three Core Modules</p>
            <h2 className="text-3xl lg:text-4xl font-bold">三大商业化模块</h2>
          </div>
          <Link to="/simulator" className="text-sm text-primary hover:text-primary-glow flex items-center gap-1">
            查看调度逻辑 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={m.to}
                  className={`group block rounded-2xl border-2 ${m.border} bg-gradient-to-br ${m.gradient} p-6 h-full transition-all hover:scale-[1.02] hover:shadow-elegant`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`h-12 w-12 rounded-xl bg-card/80 border border-border flex items-center justify-center ${m.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-5xl font-black opacity-20 ${m.accent}`}>{m.id}</span>
                  </div>
                  <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${m.accent}`}>{m.code}</p>
                  <h3 className="text-xl font-bold mb-3">{m.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.desc}</p>
                  <div className={`flex items-center gap-1 text-sm ${m.accent} group-hover:gap-2 transition-all`}>
                    进入 Demo <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 调度引擎流程 */}
      <section className="mx-auto max-w-[1600px] px-4 lg:px-8 py-16">
        <div className="mb-8">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">Scheduling Engine</p>
          <h2 className="text-3xl lg:text-4xl font-bold">调度规则引擎</h2>
          <p className="text-muted-foreground mt-2">客户端初始化 → 参数上报 → 命中场景 → 下发策略，全链路 &lt;50ms</p>
        </div>
        <RuleEngineFlow />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-8 text-center text-xs text-muted-foreground">
          ATCA Demo · 商业化产品部 × 视频播放产品部 · V1.0 PRD Showcase
        </div>
      </footer>
    </div>
  );
}