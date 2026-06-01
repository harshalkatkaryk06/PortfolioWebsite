import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({
  scrollToSection,
  heroRef,
  projectsRef,
  skillsRef,
  contactRef,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="flex justify-between items-center px-6 md:px-16 py-5">
        {/* Logo */}
        <h1
          onClick={() => handleNavigation(heroRef)}
          className="text-xl md:text-2xl font-bold text-green-400 cursor-pointer"
        >
          Harshal Katkar
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-white font-medium">
          <li
            onClick={() => handleNavigation(heroRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Home
          </li>

          <li
            onClick={() => handleNavigation(projectsRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Projects
          </li>

          <li
            onClick={() => handleNavigation(skillsRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Skills
          </li>

          <li
            onClick={() => handleNavigation(contactRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Connect
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-white font-medium">
          <li
            onClick={() => handleNavigation(heroRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Home
          </li>

          <li
            onClick={() => handleNavigation(projectsRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Projects
          </li>

          <li
            onClick={() => handleNavigation(skillsRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Skills
          </li>

          <li
            onClick={() => handleNavigation(contactRef)}
            className="cursor-pointer hover:text-green-400 transition"
          >
            Connect
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;