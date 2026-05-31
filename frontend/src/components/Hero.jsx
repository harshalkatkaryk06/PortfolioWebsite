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

  return (
    <section
      ref={refProp}
      className="min-h-screen flex items-center justify-between px-20 pt-24 bg-[#050505]"
    >
      <div className="max-w-xl">
        <p className="text-green-400 text-lg mb-3">
          {profile?.role || "Full Stack Developer"}
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          {profile?.heading?.split(" ").slice(0, 2).join(" ") || "Hi, I'm"}{" "}
          <span className="text-green-400">
            {profile?.heading?.split(" ").slice(2).join(" ") ||
              "Harshal Katkar"}
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          {profile?.description ||
            "Architecting resilient digital systems with precision and intent — designing scalable applications, engineering dependable backend infrastructures, and continually advancing in backend security."}
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