import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";

const Hero = ({ refProp, scrollToProjects }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Track how many times the profile photo has been tapped in a row.
  const [tapCount, setTapCount] = useState(0);

  // 2. Holds the timer that resets the tap count if the user pauses too long
  //    between taps, so this only triggers on 5 taps in quick succession.
  const tapResetTimer = useRef(null);

  const navigate = useNavigate();

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

  // 3. Called every time the profile photo is clicked or tapped.
  const handlePhotoTap = () => {
    const newTapCount = tapCount + 1;

    // 4. On the 5th tap in a row, send the user to the admin dashboard route.
    if (newTapCount >= 5) {
      setTapCount(0);
      navigate("/admin/dashboard");
      return;
    }

    setTapCount(newTapCount);

    // 5. Restart the "give up" timer on every tap, so the 2 second window
    //    is measured from the most recent tap, not the first one.
    if (tapResetTimer.current) {
      clearTimeout(tapResetTimer.current);
    }

    tapResetTimer.current = setTimeout(() => {
      setTapCount(0);
    }, 2000);
  };

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
          onClick={handlePhotoTap}
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
            cursor-pointer
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