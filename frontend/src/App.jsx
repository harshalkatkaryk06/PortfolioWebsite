import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminFormPage from "./components/AdminFormPage";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/form/:type" element={<AdminFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;