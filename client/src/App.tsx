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
import AuthPage from "@/pages/auth-page";
import GenericPage from "@/pages/generic-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <LayoutWrapper>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/courses/:slug" component={CourseLanding} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/learn/:slug" component={CoursePlayer} />
        <Route path="/admin" component={AdminDashboard} />
        
        {/* Faith Activities */}
        <Route path="/worship"><GenericPage title="Worship" /></Route>
        <Route path="/reading"><GenericPage title="Reading" /></Route>
        <Route path="/meditation"><GenericPage title="Meditation" /></Route>
        <Route path="/games"><GenericPage title="Games" /></Route>
        <Route path="/testimonies"><GenericPage title="Testimonies" /></Route>
        <Route path="/prayers"><GenericPage title="Prayers" /></Route>

        {/* Along Activities */}
        <Route path="/testimony-along"><GenericPage title="Testimony Along" /></Route>
        <Route path="/pray-along"><GenericPage title="Pray Along" /></Route>
        <Route path="/sing-along"><GenericPage title="Sing Along" /></Route>
        <Route path="/read-along"><GenericPage title="Read Along" /></Route>
        <Route path="/meditate-along"><GenericPage title="Meditate Along" /></Route>
        <Route path="/game-along"><GenericPage title="Game Along" /></Route>

        {/* Other */}
        <Route path="/donate"><GenericPage title="Donate" /></Route>

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
