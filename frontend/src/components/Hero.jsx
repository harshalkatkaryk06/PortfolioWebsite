import { useEffect, useState } from "react";
import BASE_URL from "../config/api";

const Hero = ({ refProp, scrollToProjects }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/profile`);
        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#050505] text-green-400">
        Loading...
      </section>
    );
  }

  const headingParts = profile?.heading?.split(" ") || [
    "Hi,",
    "I'm",
    "Harshal",
    "Katkar",
  ];

  return (
    <section
      ref={refProp}
      className="
        min-h-screen
        bg-[#050505]
        flex flex-col-reverse lg:flex-row
        items-center
        justify-center lg:justify-between
        px-6 sm:px-10 md:px-16 lg:px-20
        py-24
        gap-12 lg:gap-8
      "
    >
      {/* Left Content */}
      <div className="max-w-2xl text-center lg:text-left">
        <p className="text-green-400 text-base sm:text-lg mb-3">
          {profile?.role || "Full Stack Developer"}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
          {headingParts.slice(0, 2).join(" ")}{" "}
          <span className="text-green-400">
            {headingParts.slice(2).join(" ")}
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
          {profile?.description ||
            "Architecting resilient digital systems with precision and intent — designing scalable applications, engineering dependable backend infrastructures, and continually advancing in backend security."}
        </p>

        <button
          onClick={scrollToProjects}
          className="
            px-8 py-3
            bg-green-400
            text-black
            font-semibold
            rounded-lg
            hover:scale-105
            transition-all
            duration-300
          "
        >
          View Projects
        </button>
      </div>

      {/* Right Image */}
      <div className="flex justify-center items-center">
        <div
          className="
            w-[55vw]
            max-w-[380px]
            min-w-[220px]
            aspect-square
            rounded-full
            border-4
            border-green-400
            overflow-hidden
            shadow-[0_0_40px_rgba(74,222,128,0.6)]
          "
        >
          <img
            src={profile?.image || "/fallback.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;