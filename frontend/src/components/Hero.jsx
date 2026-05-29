import profileImg from "../assets/profile.jpg";

const Hero = ({ refProp, scrollToProjects }) => {
  return (
    <section
      ref={refProp}
      className="min-h-screen flex items-center justify-between px-20 pt-6rem bg-[#050505]"
    >
      <div className="max-w-xl">
        <p className="text-green-400 text-lg mb-3">
          Full Stack Developer
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Hi, I'm <span className="text-green-400">Harshal Katkar</span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Architecting resilient digital systems with precision and intent —
            designing scalable applications, engineering dependable backend
            infrastructures, and continually advancing in backend security to
            build systems fortified against evolving threats.
        </p>

        <button
          onClick={scrollToProjects}
          className="px-8 py-3 bg-green-400 text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          View Projects
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-80 h-80 rounded-full border-4 border-green-400 shadow-[0_0_40px_rgba(74,222,128,0.6)] overflow-hidden">
          <img
            src={profileImg}
            alt="Harshal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;