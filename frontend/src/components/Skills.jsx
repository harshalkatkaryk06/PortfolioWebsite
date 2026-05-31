import { useEffect, useState } from "react";
import BASE_URL from "../config/api";

const Skills = ({ refProp }) => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH SKILLS FROM BACKEND
  // =========================
  const fetchSkills = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/skills`);
      const data = await res.json();

      if (data.success) {
        setSkillsData(data.data);
      } else {
        console.error("Failed to fetch skills");
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <section
        ref={refProp}
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        Loading Skills...
      </section>
    );
  }

  return (
    <section
      ref={refProp}
      className="min-h-screen bg-black text-white px-8 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => (
            <div
              key={category._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:scale-105 transition duration-300"
            >
              {/* CATEGORY (MongoDB: title) */}
              <h3 className="text-2xl font-semibold mb-5 text-blue-400">
                {category.title}
              </h3>

              {/* SKILLS LIST */}
              <div className="flex flex-wrap gap-3">
                {Array.isArray(category.coreCompetencies) &&
                  category.coreCompetencies.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-800 rounded-full text-sm hover:bg-blue-600 transition"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;