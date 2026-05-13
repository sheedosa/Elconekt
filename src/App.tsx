import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Elconekt from "./pages/Elconekt";
import FullStackDev from "./pages/FullStackDev";
import SmoothScroll from "./motion/SmoothScroll";
import Cursor from "./motion/Cursor";
import "./pages/elconekt.css";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Cursor />
        <Layout>
          <Routes>
            <Route path="/" element={<Elconekt />} />
            <Route path="/services/full-stack-development" element={<FullStackDev />} />
          </Routes>
        </Layout>
      </SmoothScroll>
    </BrowserRouter>
  );
}
