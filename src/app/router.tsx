import { Outlet, createBrowserRouter } from "react-router-dom";
import { SmoothScroll } from "@/app/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/Home";
import { MetodoPage, ClubPage, ProgramasPage, EquipoPage, GaleriaPage } from "@/pages/Secciones";
import Inscripcion from "@/pages/Inscripcion";
import PortalFamilias from "@/pages/PortalFamilias";
import AdminLayout from "@/pages/admin/AdminLayout";
import Carriles from "@/pages/admin/Carriles";
import Analitica from "@/pages/admin/Analitica";
import Ventas from "@/pages/admin/Ventas";
import Campanas from "@/pages/admin/Campanas";

/** Public layout: Navbar + page + Footer */
function PublicLayout() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/metodo", element: <MetodoPage /> },
      { path: "/club", element: <ClubPage /> },
      { path: "/programas", element: <ProgramasPage /> },
      { path: "/equipo", element: <EquipoPage /> },
      { path: "/galeria", element: <GaleriaPage /> },
      { path: "/inscripcion", element: <Inscripcion /> },
      { path: "/portal", element: <PortalFamilias /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Analitica /> },
      { path: "carriles", element: <Carriles /> },
      { path: "analitica", element: <Analitica /> },
      { path: "ventas", element: <Ventas /> },
      { path: "campanas", element: <Campanas /> },
    ],
  },
]);
