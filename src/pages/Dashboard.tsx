import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Activity, DollarSign, Target, Users } from "lucide-react";

const dropOffData = [
  { time: "0s", legacy: 100, atca: 100 },
  { time: "5s", legacy: 78, atca: 94 },
  { time: "10s", legacy: 62, atca: 89 },
  { time: "15s", legacy: 51, atca: 86 },
  { time: "30s", legacy: 38, atca: 81 },
  { time: "45s", legacy: 29, atca: 78 },
  { time: "60s", legacy: 22, atca: 75 },
];

const cpeData = [
  { day: "周一", cpe: 0.62 },
  { day: "周二", cpe: 0.71 },
  { day: "周三", cpe: 0.78 },
  { day: "周四", cpe: 0.83 },
  { day: "周五", cpe: 0.91 },
  { day: "周六", cpe: 1.05 },
  { day: "周日", cpe: 1.12 },
];

const cvrData = [
  { name: "模块A 加购率", value: 8.6 },
  { name: "模块B 答题转化", value: 42.3 },
  { name: "模块C 券核销", value: 17.2 },
];

const radarData = [
  { metric: "用户体验", A: 92, B: 78, C: 96 },
  { metric: "互动率", A: 65, B: 95, C: 32 },
  { metric: "ARPU", A: 88, B: 82, C: 76 },
  { metric: "完播率", A: 94, B: 71, C: 98 },
  { metric: "品牌曝光", A: 86, B: 76, C: 91 },
];

const arpuData = [
  { month: "1月", legacy: 8.2, atca: 8.2 },
  { month: "2月", legacy: 8.4, atca: 9.1 },
  { month: "3月", legacy: 8.5, atca: 10.3 },
  { month: "4月", legacy: 8.3, atca: 11.2 },
  { month: "5月", legacy: 8.6, atca: 11.8 },
];

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: "hsl(var(--muted-foreground))" },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs text-accent uppercase tracking-widest">KPI Dashboard</p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/40 text-[10px] font-mono text-accent uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Demo Data · 模拟数据
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">商业化数据看板</h1>
          <p className="text-muted-foreground mt-2">
            防御指标 · 进攻指标 · 模块对比 · 当前数据为产品评审用模拟样本，上线后将由真实埋点替换
          </p>
        </div>

        {/* KPI 卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard label="DAU" value="2.18亿" delta="+3.2%" icon={Users} positive />
          <KpiCard label="ARPU 月增" value="¥11.8" delta="+38.4%" icon={DollarSign} positive />
          <KpiCard label="平均 CPE" value="¥0.91" delta="+12%" icon={Activity} positive />
          <KpiCard label="广告时段流失" value="22.5%" delta="-41%" icon={Target} positive />
        </div>

        {/* 防御 + 进攻 */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <ChartCard title="广告时段用户流失率" subtitle="防御指标 · ATCA vs 传统贴片">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dropOffData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="legacy" stroke="hsl(var(--destructive))" name="传统贴片留存" strokeWidth={2} />
                <Line type="monotone" dataKey="atca" stroke="hsl(var(--primary))" name="ATCA 留存" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="CPE 单价趋势" subtitle="进攻指标 · 模块B 单次互动均价（元）">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={cpeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="cpe" stroke="hsl(var(--accent))" strokeWidth={2.5} name="CPE (¥)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <ChartCard title="转化率 CVR" subtitle="进攻指标 · 三大模块 % 对比">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cvrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="整体 ARPU 变动" subtitle="（交互广告 + 传统贴片）/ DAU · 元">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={arpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="legacy" fill="hsl(var(--muted-foreground))" name="传统" radius={[4, 4, 0, 0]} />
                <Bar dataKey="atca" fill="hsl(var(--accent))" name="ATCA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="三模块综合能力雷达" subtitle="A · B · C 在五个维度上的相对表现">
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }} />
              <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Radar name="模块A" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              <Radar name="模块B" dataKey="B" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
              <Radar name="模块C" dataKey="C" stroke="hsl(280 80% 65%)" fill="hsl(280 80% 65%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof Users;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <div className={`flex items-center gap-1 text-xs ${positive ? "text-primary" : "text-destructive"}`}>
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{delta} vs 上周期</span>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}