import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../config/api";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [activeCard, setActiveCard] = useState(null);
  const fetchSkills = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/skills`);
      const data = await res.json();

      if (data.success) {
        setSkills(data.data || []);
      } else {
        toast.error(data.message || "Failed to load skills");
      }
    } catch (err) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const deleteSkill = async (id) => {
    const confirmed = window.confirm("Delete this skill?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Skill deleted");
        fetchSkills();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-green-400">
          Skills Management
        </h1>

        <button
          onClick={fetchSkills}
          className="px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center text-gray-400 text-xl">
          Loading skills...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* SKILL CARDS */}
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
  key={skill._id}
  onClick={() =>
    window.innerWidth < 768 &&
    setActiveCard(
      activeCard === skill._id ? null : skill._id
    )
  }
  className="relative group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-400 transition overflow-hidden"
>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold text-green-400 mb-3">
                  {skill.title}
                </h2>

                {/* CORE COMPETENCIES */}
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(skill.coreCompetencies) &&
                    skill.coreCompetencies.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                </div>

                {/* HOVER OVERLAY */}
                <div className={`absolute inset-0 bg-black/85 flex items-center justify-center gap-4 transition
${
  activeCard === skill._id
    ? "opacity-100"
    : "opacity-0 md:group-hover:opacity-100"
}`}>

                  <button
                    onClick={() =>
                      navigate(`/admin/form/skills/${skill._id}`)
                    }
                    className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-xl col-span-full text-center">
              No skills added yet
            </div>
          )}

          {/* ADD SKILL */}
          <div
            onClick={() => navigate("/admin/form/skills")}
            className="border-2 border-dashed border-green-400 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-green-400 hover:text-black transition min-h-[200px]"
          >
            <h2 className="text-2xl font-bold">
              + Add Skill
            </h2>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminSkills;