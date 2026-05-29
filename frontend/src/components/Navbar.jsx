const Navbar = ({
  scrollToSection,
  heroRef,
  projectsRef,
  skillsRef,
  contactRef,
}) => {
  return (
    <nav className="fixed top-0 w-full px-16 py-5 pt-8 flex justify-between items-center bg-black/80 backdrop-blur-md z-50">
      
      <h1
        onClick={() => scrollToSection(heroRef)}
        className="text-2xl font-bold text-green-400 cursor-pointer"
      >
        Harshal Katkar
      </h1>

      <ul className="flex gap-10 text-white font-medium">
        <li
          onClick={() => scrollToSection(heroRef)}
          className="cursor-pointer hover:text-green-400 transition duration-300"
        >
          Home
        </li>

        <li
          onClick={() => scrollToSection(projectsRef)}
          className="cursor-pointer hover:text-green-400 transition duration-300"
        >
          Projects
        </li>

        <li
          onClick={() => scrollToSection(skillsRef)}
          className="cursor-pointer hover:text-green-400 transition duration-300"
        >
          Skills
        </li>

        <li
          onClick={() => scrollToSection(contactRef)}
          className="cursor-pointer hover:text-green-400 transition duration-300"
        >
          Connect
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;