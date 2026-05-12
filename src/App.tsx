import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Elconekt from "./pages/Elconekt";
import FullStackDev from "./pages/FullStackDev";
import "./pages/elconekt.css";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Elconekt />} />
          <Route path="/services/full-stack-development" element={<FullStackDev />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
