import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { FilmGrain } from "./components/layout/FilmGrain";
import { CinematicOverlay } from "./components/layout/CinematicOverlay";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/utils/ScrollToTop";

import Home from "./pages/Home";
const Works = lazy(() => import("./pages/Works"));
const About = lazy(() => import("./pages/About"));
const Approach = lazy(() => import("./pages/Approach"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <div className="bg-black text-white font-sans min-h-screen relative overflow-x-hidden flex flex-col">
      <ScrollToTop />
      <FilmGrain />
      <CinematicOverlay />
      <Navbar />
      
      <main className="relative z-10 flex-grow">
        <Suspense fallback={<div className="min-h-screen" />}>
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
