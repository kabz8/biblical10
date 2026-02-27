import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { LayoutWrapper } from "@/components/layout-wrapper";
import "./i18n"; // Import i18n initialization

// Pages
import Home from "@/pages/home";
import CourseLanding from "@/pages/course-landing";
import Dashboard from "@/pages/dashboard";
import CoursePlayer from "@/pages/course-player";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <LayoutWrapper>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/courses/:slug" component={CourseLanding} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/learn/:slug" component={CoursePlayer} />
        <Route path="/admin" component={AdminDashboard} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </LayoutWrapper>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="coursehub-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
