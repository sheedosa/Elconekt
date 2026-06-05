import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Elconekt from "./pages/Elconekt";
import About from "./pages/About";
import FullStackDev from "./pages/FullStackDev";
import AIIntelligentSystems from "./pages/AIIntelligentSystems";
import Cybersecurity from "./pages/Cybersecurity";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import SmoothScroll from "./motion/SmoothScroll";
import Cursor from "./motion/Cursor";
import "./pages/elconekt.css";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SmoothScroll>
          <Cursor />
          <Layout>
            <Routes>
              <Route path="/" element={<Elconekt />} />
              <Route path="/about" element={<About />} />
              <Route path="/services/full-stack-development" element={<FullStackDev />} />
              <Route path="/services/ai-intelligent-systems" element={<AIIntelligentSystems />} />
              <Route path="/services/cybersecurity" element={<Cybersecurity />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </SmoothScroll>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
