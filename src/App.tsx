import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Simulator from "./pages/Simulator.tsx";
import ModuleA from "./pages/ModuleA.tsx";
import ModuleB from "./pages/ModuleB.tsx";
import ModuleC from "./pages/ModuleC.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Comparison from "./pages/Comparison.tsx";
import Documentation from "./pages/Documentation.tsx";
import TopNav from "./components/TopNav.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/module-a" element={<ModuleA />} />
          <Route path="/module-b" element={<ModuleB />} />
          <Route path="/module-c" element={<ModuleC />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
