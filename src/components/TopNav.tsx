import { NavLink, useLocation } from "react-router-dom";
import { Activity, Cpu, Film, Gamepad2, Tv, BarChart3, Sparkles, GitCompare, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "调度总览", icon: Cpu },
  { to: "/comparison", label: "对比体验", icon: GitCompare, highlight: true },
  { to: "/documentation", label: "方案说明", icon: FileText },
  { to: "/simulator", label: "场景模拟器", icon: Activity },
  { to: "/module-a", label: "模块A", icon: Film },
  { to: "/module-b", label: "模块B", icon: Gamepad2 },
  { to: "/module-c", label: "模块C", icon: Tv },
  { to: "/dashboard", label: "数据看板", icon: BarChart3 },
];

export default function TopNav() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 mr-4 shrink-0">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wider text-gradient-primary">ATCA</span>
            <span className="text-[10px] text-muted-foreground">腾讯视频 · 智能调度中台</span>
          </div>
        </NavLink>
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all",
                  active
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border/50">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs text-muted-foreground">Engine Online</span>
        </div>
      </div>
    </header>
  );
}
