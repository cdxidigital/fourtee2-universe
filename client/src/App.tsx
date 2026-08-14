import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./platform.css";
import ArchiveCommand from "./pages/ArchiveCommand";
import Home from "./pages/Home";
import { PortalPage } from "./pages/PortalPage";
import SignalBoard from "./pages/SignalBoard";
import TravelArchive from "./pages/TravelArchive";

/**
 * fourtee2 Astral Editorial System: Event Horizon Black, cosmic photography,
 * Righteous brand wordmarks, and restrained monospaced interface language.
 */
function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location} className="route-shell" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/travel"}>{() => <PortalPage portal="travel" />}</Route>
          <Route path={"/music"}>{() => <PortalPage portal="music" />}</Route>
          <Route path={"/you"}>{() => <PortalPage portal="you" />}</Route>
          <Route path={"/board"} component={SignalBoard} />
          <Route path={"/archive/command"} component={ArchiveCommand} />
          <Route path={"/archive"} component={TravelArchive} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
