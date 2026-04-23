import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Users, Building2, Tv, Target, ArrowRight, CheckCircle2, AlertTriangle,
  Eye, Clock, Layers, Lightbulb, TrendingUp, Shield, Zap, Heart, DollarSign,
  Film, Gamepad2, Cast, FileText, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-accent uppercase tracking-widest mb-2">ATCA Documentation</p>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            方案说明文档
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            腾讯视频 ATCA (Adaptive Tencent Commercial Architecture) 智能广告系统
            <br />—— 用 AI 改造广告体验，让广告变得更有趣
          </p>
          <div className="flex gap-3 mt-6">
            <Button asChild className="bg-gradient-primary">
              <Link to="/comparison">
                <ExternalLink className="h-4 w-4" /> 查看对比演示
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/simulator">
                <Zap className="h-4 w-4" /> 场景模拟器
              </Link>
            </Button>
          </div>
        </div>

        {/* 文档内容 */}
        <div className="space-y-16">
          {/* 第一部分：核心问题 */}
          <Section
            id="problem"
            icon={AlertTriangle}
            label="Part 1"
            title="用户为什么讨厌广告?"
            desc="深入分析视频平台广告体验的三大核心痛点"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <PainPointCard
                icon={Eye}
                title="痛点一: 广告与内容无关"
                problem="用户正在看古装剧，却被迫观看汽车广告；看综艺时推送保险广告"
                analysis="传统投放基于用户画像的粗粒度匹配，忽视了"当前内容上下文"的关联性"
                data="调研显示 67% 用户认为广告与正在观看的内容毫无关系"
              />
              <PainPointCard
                icon={Clock}
                title="痛点二: 广告时机太差"
                problem="剧情最紧张时强制插入广告，高潮片段被生硬打断"
                analysis="传统贴片不考虑剧情节奏，在任意位置机械插入，破坏观看心流"
                data="用户在高情绪点被中断的流失率高达 72%"
              />
              <PainPointCard
                icon={Layers}
                title="痛点三: 形式单一硬塞"
                problem="60秒强制贴片，无法跳过，千篇一律的硬性推送"
                analysis="一刀切的广告形式忽视场景差异，无论追剧/短视频/投屏都是同样体验"
                data="调研显示 83% 用户希望有更多元的广告形式选择"
              />
            </div>

            <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                核心洞察
              </h4>
              <p className="text-sm text-muted-foreground">
                用户讨厌的不是"广告存在"本身，而是<strong className="text-foreground">广告与内容割裂、时机突兀、形式单一</strong>。
                解决这三个问题，广告体验将从"被迫忍受"变成"可接受甚至有趣"。
              </p>
            </div>
          </Section>

          {/* 第二部分：AI方案 */}
          <Section
            id="solution"
            icon={Brain}
            label="Part 2"
            title="AI 方案是什么?"
            desc="ATCA 智能广告系统的三层架构设计"
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">总体架构</TabsTrigger>
                <TabsTrigger value="ai-layer">AI内容层</TabsTrigger>
                <TabsTrigger value="scheduler">调度引擎</TabsTrigger>
                <TabsTrigger value="modules">三大模块</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="rounded-xl border border-border bg-gradient-card p-6">
                  <h4 className="font-bold mb-4">ATCA 三层架构</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <LayerCard
                      layer="1"
                      title="AI 内容理解层"
                      desc="多模态AI解析剧情、人物、道具、情绪，输出内容标签"
                      capabilities={["内容相关性匹配", "情节张力感知", "安全插入点识别"]}
                    />
                    <LayerCard
                      layer="2"
                      title="环境调度引擎"
                      desc="实时采集设备环境参数，智能判定最优广告策略"
                      capabilities={["投屏/外放检测", "播放模式识别", "用户行为分析"]}
                    />
                    <LayerCard
                      layer="3"
                      title="三大商业化模块"
                      desc="根据场景匹配最适合的广告形式，执行下发"
                      capabilities={["模块A: AI混剪", "模块B: 互动竞价", "模块C: VPP植入"]}
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-2 py-1 rounded bg-accent/15 text-accent font-semibold">AI 内容理解</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="px-2 py-1 rounded bg-primary/15 text-primary font-semibold">环境调度判定</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="px-2 py-1 rounded bg-accent/10 text-accent font-semibold">模块 A/B/C 编排</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="px-2 py-1 rounded bg-foreground/10 font-semibold">客户端下发</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-layer">
                <div className="space-y-4">
                  <AICapabilityCard
                    icon={Eye}
                    code="Content-Relevance"
                    title="内容相关性匹配"
                    desc="AI 实时解析当前剧集的类型、人物、道具、情绪标签，推荐与剧情同源的品牌/品类"
                    example="用户看《庆余年》悬疑剧情 → AI识别"悬疑+古装+权谋" → 推荐茶饮、传统品牌广告"
                    solves="解决痛点一：广告与内容无关"
                  />
                  <AICapabilityCard
                    icon={Clock}
                    code="Moment-Awareness"
                    title="情节张力感知"
                    desc="建模剧情情绪曲线，识别低张力安全插入点（过场/转场/片尾），避免高潮硬切"
                    example="张力值 >70 时禁止插入 → 等待情绪低谷期 → 在自然停顿点下发广告"
                    solves="解决痛点二：广告时机太差"
                  />
                  <AICapabilityCard
                    icon={Layers}
                    code="Format-Orchestration"
                    title="形式动态编排"
                    desc="根据场景+内容+用户特征，动态选择最适合的广告形式"
                    example="投屏场景 → VPP静默 | 追剧场景 → AI混剪 | 碎片点播 → 互动答题"
                    solves="解决痛点三：形式单一硬塞"
                  />
                </div>
              </TabsContent>

              <TabsContent value="scheduler">
                <div className="rounded-xl border border-border bg-gradient-card p-6">
                  <h4 className="font-bold mb-4">环境调度引擎 · 判定逻辑</h4>
                  <div className="space-y-4 font-mono text-sm">
                    <RuleBlock
                      condition="Casting == True OR (Audio_Output == Speaker AND Volume > 50%)"
                      result="→ Time-Invisible (C) · 跨端 VPP 静默"
                      scenario="公共社交场景"
                    />
                    <RuleBlock
                      condition="Playback_Type == Continuous AND Episode > 1"
                      result="→ Time-Convertible (A) · AIGC 动态回顾"
                      scenario="沉浸追剧场景"
                    />
                    <RuleBlock
                      condition="Video_Length < 45min (Fallback)"
                      result="→ Time-Choice (B) · 二选一互动竞价"
                      scenario="碎片点播场景"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    调度延迟 {"<"}50ms，客户端上报环境参数后实时返回策略
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="modules">
                <div className="grid md:grid-cols-3 gap-4">
                  <ModuleCard
                    icon={Film}
                    code="A"
                    title="AIGC 动态回顾"
                    strategy="Time-Convertible"
                    scene="连续追剧场景"
                    features={[
                      "AI 混剪上集高能片段",
                      "品牌护航浮层(不遮挡)",
                      "悬浮购物车加购",
                      "零黑屏无缝衔接下一集",
                    ]}
                    to="/module-a"
                  />
                  <ModuleCard
                    icon={Gamepad2}
                    code="B"
                    title="二选一互动竞价"
                    strategy="Time-Choice"
                    scene="碎片点播场景"
                    features={[
                      "5秒分屏: 贴片 vs 答题",
                      "答对免广告 + 卡券奖励",
                      "CPE 按互动计费",
                      "微信卡券即时核销",
                    ]}
                    to="/module-b"
                  />
                  <ModuleCard
                    icon={Cast}
                    code="C"
                    title="跨端 VPP 静默"
                    strategy="Time-Invisible"
                    scene="客厅投屏场景"
                    features={[
                      "大屏零贴片打扰",
                      "VPP 虚拟物品自然植入",
                      "小屏同步推送代金券",
                      "跨端状态实时同步",
                    ]}
                    to="/module-c"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Section>

          {/* 第三部分：为什么需要AI */}
          <Section
            id="why-ai"
            icon={Zap}
            label="Part 3"
            title="为什么需要 AI?"
            desc="只有AI才能实现的关键能力"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <WhyAICard
                title="实时内容理解"
                desc="传统方法无法实时理解视频内容的情绪、道具、剧情走向。AI 多模态模型可以秒级解析，输出内容标签用于广告匹配。"
              />
              <WhyAICard
                title="情节张力建模"
                desc="人工标注无法覆盖海量视频的每个帧。AI 可以自动建模情绪曲线，识别安全插入点，避免高潮硬切。"
              />
              <WhyAICard
                title="动态创意生成"
                desc="AIGC 可以根据上集内容实时生成混剪回顾，每个用户看到的都是个性化的内容，非人工可及。"
              />
              <WhyAICard
                title="实时决策调度"
                desc="毫秒级判定最优广告策略，考虑数十个维度的环境参数，只有 AI 规则引擎能做到实时响应。"
              />
            </div>
          </Section>

          {/* 第四部分：三方价值 */}
          <Section
            id="value"
            icon={Target}
            label="Part 4"
            title="三方共赢价值"
            desc="用户、平台、广告主各得到什么"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <StakeholderCard
                icon={Users}
                role="用户"
                color="primary"
                benefits={[
                  { label: "体验更好", desc: "广告与剧情相关，不再突兀" },
                  { label: "更少打扰", desc: "追剧/投屏场景零贴片" },
                  { label: "获得价值", desc: "答题赢卡券，广告变互动" },
                  { label: "选择权", desc: "可选择看广告或互动免广告" },
                ]}
              />
              <StakeholderCard
                icon={Building2}
                role="平台"
                color="accent"
                benefits={[
                  { label: "用户不流失", desc: "广告时段流失率 -41%" },
                  { label: "ARPU 增长", desc: "预期月增 +38%" },
                  { label: "新收入模式", desc: "CPE 竞价/VPP 植入费" },
                  { label: "品牌口碑", desc: "差异化体验提升用户忠诚度" },
                ]}
              />
              <StakeholderCard
                icon={Tv}
                role="广告主"
                color="purple"
                benefits={[
                  { label: "真正被看进去", desc: "互动率 42%+，非强制曝光" },
                  { label: "精准触达", desc: "内容相关性匹配，效果更好" },
                  { label: "转化闭环", desc: "微信卡券即时核销" },
                  { label: "品牌好感", desc: "不打扰用户，建立正面印象" },
                ]}
              />
            </div>

            <div className="mt-8 rounded-xl border border-accent/30 bg-gradient-card p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                冲突取舍原则
              </h4>
              <div className="space-y-3 text-sm">
                <TradeoffItem
                  conflict="用户想完全免广告 vs 平台需要收入"
                  resolution="提供"答题免广告"选项，用户主动参与换取权益，平台收取 CPE 费用"
                />
                <TradeoffItem
                  conflict="广告主想最大曝光 vs 用户讨厌打扰"
                  resolution="VPP 自然植入 + 小屏代金券，大屏不打扰但品牌曝光仍然完成"
                />
                <TradeoffItem
                  conflict="追剧用户不想中断 vs 广告需要展示"
                  resolution="AI 混剪回顾替代贴片，情绪连贯的同时完成品牌露出"
                />
              </div>
            </div>
          </Section>

          {/* 第五部分：风险与挑战 */}
          <Section
            id="risks"
            icon={AlertTriangle}
            label="Part 5"
            title="风险与挑战"
            desc="方案落地可能面临的问题及应对"
          >
            <div className="space-y-4">
              <RiskCard
                risk="AI 内容理解准确率"
                challenge="多模态模型在某些小众内容上可能识别不准，导致广告匹配失误"
                mitigation="设置置信度阈值，低于 0.7 时回退到传统匹配逻辑；持续迭代训练数据"
              />
              <RiskCard
                risk="VPP 合成成本"
                challenge="实时虚拟物品植入需要 GPU 算力，成本较高"
                mitigation="采用预合成 + 分片缓存策略，热门剧集提前处理；长尾内容按需生成"
              />
              <RiskCard
                risk="广告主接受度"
                challenge="新计费模式 (CPE/VPP) 需要广告主适应"
                mitigation="提供 A/B 测试数据证明效果；设计平滑过渡方案，保留传统投放选项"
              />
              <RiskCard
                risk="用户习惯培养"
                challenge="用户初期可能不理解互动规则"
                mitigation="新手引导 + 首次答题必中奖励；分阶段灰度上线"
              />
            </div>
          </Section>

          {/* User Flow 说明 */}
          <Section
            id="user-flow"
            icon={FileText}
            label="Part 6"
            title="User Flow 说明"
            desc="完整的用户体验流程图"
          >
            <div className="space-y-8">
              <UserFlowBlock
                title="场景A: 连续追剧 User Flow"
                steps={[
                  { step: "1", title: "上集播放完毕", desc: "系统检测到 Continuous Playback 模式" },
                  { step: "2", title: "AI 内容分析", desc: "提取上集关键帧，进行情绪打标，识别主要道具" },
                  { step: "3", title: "品牌匹配", desc: "根据情绪标签匹配广告主（如"悬疑"→元气森林）" },
                  { step: "4", title: "AI 混剪生成", desc: "生成 18 秒上集高能回顾视频" },
                  { step: "5", title: "品牌护航浮层", desc: "顶部展示"本集由 XX 护航"提示" },
                  { step: "6", title: "悬浮购物车", desc: "右下角加购入口，点击打开半屏小程序" },
                  { step: "7", title: "无缝进下一集", desc: "零黑屏切换，追剧心流不中断" },
                ]}
              />

              <UserFlowBlock
                title="场景B: 碎片点播 User Flow"
                steps={[
                  { step: "1", title: "用户点击视频", desc: "系统检测到单次点播，命中 Time-Choice 策略" },
                  { step: "2", title: "5秒分屏展示", desc: "左侧 30% 传统贴片入口，右侧 70% 答题互动入口" },
                  { step: "3", title: "用户选择", desc: "默认走贴片 / 主动选择答题" },
                  { step: "4", title: "弹出选择题", desc: "基于剧中道具的品牌识别问题" },
                  { step: "5", title: "答题结果", desc: "答对 → 免广告 + 卡券到账微信卡包" },
                  { step: "6", title: "正片秒播", desc: "跳过 60 秒贴片，直接进入正片" },
                ]}
              />

              <UserFlowBlock
                title="场景C: 客厅投屏 User Flow"
                steps={[
                  { step: "1", title: "发起投屏", desc: "系统检测到 Casting=True，命中 Time-Invisible 策略" },
                  { step: "2", title: "云端拉取 VPP 流", desc: "获取已合成虚拟物品的视频分片" },
                  { step: "3", title: "大屏秒播正片", desc: "无任何前贴片，直接播放正片" },
                  { step: "4", title: "VPP 虚拟物品曝光", desc: "剧中桌上自然出现品牌饮料" },
                  { step: "5", title: "小屏 In-App Banner", desc: "手机端同步弹出代金券推送" },
                  { step: "6", title: "领取核销", desc: "用户点击领取，完成商业闭环" },
                ]}
              />
            </div>
          </Section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">准备好体验了吗?</h2>
          <p className="text-muted-foreground mb-6">亲身感受改造前后的广告体验差异</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/comparison">
                <ExternalLink className="h-4 w-4" /> 改造前后对比
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/simulator">
                <Zap className="h-4 w-4" /> 场景模拟器
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">
                <TrendingUp className="h-4 w-4" /> KPI 看板
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== 子组件 ========== */

function Section({
  id,
  icon: Icon,
  label,
  title,
  desc,
  children,
}: {
  id: string;
  icon: typeof Brain;
  label: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <div className="flex items-start gap-4 mb-6">
        <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-xs text-accent uppercase tracking-widest mb-1">{label}</p>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function PainPointCard({
  icon: Icon,
  title,
  problem,
  analysis,
  data,
}: {
  icon: typeof Eye;
  title: string;
  problem: string;
  analysis: string;
  data: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-destructive/30 bg-destructive/5 p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-destructive" />
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs text-destructive mb-1">问题表现</p>
          <p className="text-muted-foreground">{problem}</p>
        </div>
        <div>
          <p className="text-xs text-accent mb-1">原因分析</p>
          <p className="text-muted-foreground">{analysis}</p>
        </div>
        <div className="pt-2 border-t border-border/40">
          <p className="text-xs text-primary">{data}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LayerCard({
  layer,
  title,
  desc,
  capabilities,
}: {
  layer: string;
  title: string;
  desc: string;
  capabilities: string[];
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {layer}
        </span>
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{desc}</p>
      <div className="space-y-1">
        {capabilities.map((c) => (
          <div key={c} className="flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AICapabilityCard({
  icon: Icon,
  code,
  title,
  desc,
  example,
  solves,
}: {
  icon: typeof Eye;
  code: string;
  title: string;
  desc: string;
  example: string;
  solves: string;
}) {
  return (
    <div className="rounded-xl border border-accent/30 bg-gradient-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <code className="text-[10px] text-accent font-mono">{code}</code>
          <h4 className="font-bold">{title}</h4>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{desc}</p>
      <div className="rounded-lg bg-background/50 p-3 text-xs">
        <p className="text-muted-foreground mb-1">示例:</p>
        <p className="text-foreground">{example}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-1.5 text-xs text-primary">
        <CheckCircle2 className="h-3.5 w-3.5" />
        {solves}
      </div>
    </div>
  );
}

function RuleBlock({
  condition,
  result,
  scenario,
}: {
  condition: string;
  result: string;
  scenario: string;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/50 p-3">
      <p className="text-muted-foreground text-xs mb-1">IF</p>
      <code className="text-primary text-xs">{condition}</code>
      <p className="text-accent mt-2">{result}</p>
      <p className="text-muted-foreground text-[10px] mt-1">场景: {scenario}</p>
    </div>
  );
}

function ModuleCard({
  icon: Icon,
  code,
  title,
  strategy,
  scene,
  features,
  to,
}: {
  icon: typeof Film;
  code: string;
  title: string;
  strategy: string;
  scene: string;
  features: string[];
  to: string;
}) {
  return (
    <Link
      to={to}
      className="block rounded-xl border border-border bg-gradient-card p-5 hover:border-primary/50 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-3xl font-black text-primary/20">{code}</span>
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-primary font-mono mb-2">{strategy}</p>
      <p className="text-xs text-muted-foreground mb-3">{scene}</p>
      <div className="space-y-1.5">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="h-3 w-3 text-primary" />
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs text-primary group-hover:gap-2 transition-all">
        查看 Demo <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

function WhyAICard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-4 w-4 text-primary" />
        <h4 className="font-bold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function StakeholderCard({
  icon: Icon,
  role,
  color,
  benefits,
}: {
  icon: typeof Users;
  role: string;
  color: "primary" | "accent" | "purple";
  benefits: { label: string; desc: string }[];
}) {
  const colorClass = {
    primary: "border-primary/30 bg-primary/5",
    accent: "border-accent/30 bg-accent/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  }[color];

  const iconColor = {
    primary: "text-primary",
    accent: "text-accent",
    purple: "text-purple-400",
  }[color];

  return (
    <div className={`rounded-xl border ${colorClass} p-5`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-5 w-5 ${iconColor}`} />
        <h4 className="font-bold">{role}</h4>
      </div>
      <div className="space-y-3">
        {benefits.map((b) => (
          <div key={b.label}>
            <div className="flex items-center gap-1.5 mb-0.5">
              <CheckCircle2 className={`h-3.5 w-3.5 ${iconColor}`} />
              <span className="text-sm font-semibold">{b.label}</span>
            </div>
            <p className="text-xs text-muted-foreground pl-5">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradeoffItem({ conflict, resolution }: { conflict: string; resolution: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/50 p-3">
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-foreground font-medium">{conflict}</p>
      </div>
      <div className="flex items-start gap-2 pl-6">
        <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">{resolution}</p>
      </div>
    </div>
  );
}

function RiskCard({
  risk,
  challenge,
  mitigation,
}: {
  risk: string;
  challenge: string;
  mitigation: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-5">
      <h4 className="font-bold mb-2 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-accent" />
        {risk}
      </h4>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs text-destructive mb-1">挑战</p>
          <p className="text-muted-foreground">{challenge}</p>
        </div>
        <div>
          <p className="text-xs text-primary mb-1">应对策略</p>
          <p className="text-muted-foreground">{mitigation}</p>
        </div>
      </div>
    </div>
  );
}

function UserFlowBlock({
  title,
  steps,
}: {
  title: string;
  steps: { step: string; title: string; desc: string }[];
}) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-6">
      <h4 className="font-bold mb-4">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <div key={s.step} className="flex items-center gap-2">
            <div className="rounded-lg border border-border/60 bg-background/50 px-3 py-2 min-w-[140px]">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  {s.step}
                </span>
                <span className="text-xs font-semibold">{s.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{s.desc}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-primary/50 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
