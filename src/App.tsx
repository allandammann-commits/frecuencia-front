import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Frequencies from "./pages/Frequencies";
import Guides from "./pages/Guides";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import GuideSanando from "./pages/GuideSanando";
import GuideValor from "./pages/GuideValor";
import GuideConexion from "./pages/GuideConexion";
import GuideManifestacion from "./pages/GuideManifestacion";
import Welcome from "./pages/Welcome";
import Bonus from "./pages/Bonus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/frequencies" element={<Frequencies />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/sanando-heridas" element={<GuideSanando />} />
            <Route path="/guides/reconociendo-valor" element={<GuideValor />} />
            <Route path="/guides/conexion-energetica" element={<GuideConexion />} />
            <Route path="/guides/manifestacion-consciente" element={<GuideManifestacion />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
