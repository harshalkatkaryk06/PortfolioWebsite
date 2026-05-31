import { useEffect, useState } from "react";
import BASE_URL from "../config/api";

const Projects = ({ refProp }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/projects`);
        const data = await res.json();

        if (data.success) {
          setProjects(data.data || []);
        } else {
          console.error("Failed to load projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      ref={refProp}
      className="min-h-screen bg-gray-950 text-white px-8 py-25"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Featured Projects
        </h2>

        {loading ? (
          <div className="text-center text-gray-400">
            Loading projects...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-lg"
              >
                {/* TITLE + STATUS */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold">
                    {project.title}
                  </h3>

                  <span className="text-sm px-3 py-1 rounded-full bg-blue-600">
                    {project.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-400 mb-6">
                  {project.description}
                </p>

                {/* TECH STACK (IMPORTANT FIX) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {Array.isArray(project.tech) &&
                    project.tech.map((techItem, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {techItem}
                      </span>
                    ))}
                </div>

                {/* LINKS */}
                <div className="flex gap-4">
  <a
    href={project.liveLink ? project.liveLink : "/coming-soon"}
    target={project.liveLink ? "_blank" : "_self"}
    rel="noreferrer"
    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
  >
    View
  </a>

  <a
    href={project.codeLink ? project.codeLink : "/coming-soon"}
    target={project.codeLink ? "_blank" : "_self"}
    rel="noreferrer"
    className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
  >
    Code
  </a>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;