import { Routes, Route } from "react-router-dom";
import { FilmGrain } from "./components/layout/FilmGrain";
import { CinematicOverlay } from "./components/layout/CinematicOverlay";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Works from "./pages/Works";
import About from "./pages/About";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="bg-black text-white font-sans min-h-screen relative overflow-x-hidden flex flex-col">
      <FilmGrain />
      <Navbar />
      
      <main className="relative z-10 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
