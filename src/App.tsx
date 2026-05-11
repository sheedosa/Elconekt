import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { FilmGrain } from "./components/layout/FilmGrain";
import { CinematicOverlay } from "./components/layout/CinematicOverlay";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/utils/ScrollToTop";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Works = lazy(() => import("./pages/Works"));
const About = lazy(() => import("./pages/About"));
const Approach = lazy(() => import("./pages/Approach"));
const Contact = lazy(() => import("./pages/Contact"));

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="bg-black text-white font-sans min-h-screen relative overflow-x-hidden flex flex-col">
      <ScrollToTop />
      <FilmGrain />
      <CinematicOverlay />
      <Navbar />
      
      <main className="relative z-10 flex-grow">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
