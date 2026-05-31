import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import { Toaster } from "react-hot-toast";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminProjects from "./pages/AdminProjects";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import AdminFormPage from "./components/AdminFormPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ComingSoon from "./pages/ComingSoon";
import AdminSkills from "./pages/AdminSkills";
import AdminEnquiries from "./pages/AdminEnquiries";

function Portfolio() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar
        scrollToSection={scrollToSection}
        heroRef={heroRef}
        projectsRef={projectsRef}
        skillsRef={skillsRef}
        contactRef={contactRef}
      />

      <Hero
        refProp={heroRef}
        scrollToProjects={() => scrollToSection(projectsRef)}
      />

      <Projects refProp={projectsRef} />
      <Skills refProp={skillsRef} />
      <Contact refProp={contactRef} />
       
    </>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>
          {/* Portfolio */}
          <Route path="/" element={<Portfolio />} />

          {/* Auth */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminProfile />
              </ProtectedRoute>
            }
          />

          {/* Add Form */}
          <Route
            path="/admin/form/:type"
            element={
              <ProtectedRoute>
                <AdminFormPage />
              </ProtectedRoute>
            }
          />

          {/* Edit Form */}
          <Route
            path="/admin/form/:type/:id"
            element={
              <ProtectedRoute>
                <AdminFormPage />
              </ProtectedRoute>
            }
          />

          {/* Projects Management */}
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <AdminSkills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/enquiries"
            element={<AdminEnquiries />}
          />
          <Route path="/coming-soon" element={<ComingSoon />} />  

        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;