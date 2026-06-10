import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../config/api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [activeCard, setActiveCard] = useState(null);
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();

      if (data.success) {
        setProjects(data.data || []);
      } else {
        toast.error(data.message || "Failed to load projects");
      }
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Project deleted successfully");
        fetchProjects();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const openLink = (link, type) => {
    if (!link || link.trim() === "") {
      toast.error(`${type} link not available`);
      return;
    }

    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-green-400">
          Project Management
        </h1>

        <button
          onClick={fetchProjects}
          className="px-5 py-2 bg-green-500 rounded-lg hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-400">
          Loading projects...
        </div>
      ) : (
        <div className="max-h-[80vh] overflow-y-auto pr-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
  key={project._id}
  onClick={() =>
    window.innerWidth < 768 &&
    setActiveCard(
      activeCard === project._id ? null : project._id
    )
  }
  className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 relative hover:border-green-400 transition"
>
  <h2 className="text-2xl font-semibold text-green-400 mb-3">
    {project.title}
  </h2>

  <p className="text-gray-400 mb-4 line-clamp-4">
    {project.description}
  </p>

  <p className="text-sm text-yellow-400 mb-2">
    Status: {project.status}
  </p>

 <p className="text-sm text-cyan-400 mb-4">
  Tech Stack: {Array.isArray(project.tech)
    ? project.tech.join(", ")
    : "Not specified"}
</p>

  <div className={`absolute inset-0 bg-black/85 flex items-center justify-center gap-3 transition rounded-2xl flex-wrap
  ${
    activeCard === project._id
      ? "opacity-100"
      : "opacity-0 md:group-hover:opacity-100"
  }`}>

                  <button
                    onClick={() =>
                      navigate(`/admin/form/projects/${project._id}`)
                    }
                    className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      openLink(project.liveLink, "Live")
                    }
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Live
                  </button>

                  <button
                    onClick={() =>
                      openLink(project.codeLink, "Code")
                    }
                    className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600"
                  >
                    Code
                  </button>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-xl">
              No projects added yet
            </div>
          )}

          {/* ADD PROJECT CARD */}
          <div
            onClick={() => navigate("/admin/form/projects")}
            className="border-2 border-dashed border-green-400 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-green-400 hover:text-black transition min-h-[250px]"
          >
            <h2 className="text-2xl font-bold">
              + Add Project
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;