const projectsData = [
  {
    id: 1,
    title: "Vocab Trainer",
    description:
      "AI-powered vocabulary learning platform with smart revision and interactive learning.",
    tech: ["React", "Node.js", "MongoDB", "AI"],
    status: "In Development",
    liveLink: "",
    codeLink: "",
  },
  {
    id: 2,
    title: "HackAssist AI",
    description:
      "Smart RAG-powered bug report classification system for vulnerability analysis.",
    tech: ["MERN", "MongoDB", "OpenAI", "RAG"],
    status: "In Development",
    liveLink: "",
    codeLink: "",
  },
  {
    id: 3,
    title: "Smart Log Analyzer",
    description:
      "AI-based system log classification and root cause detection platform.",
    tech: ["React", "Node.js", "MongoDB", "AI"],
    status: "Planned",
    liveLink: "",
    codeLink: "",
  },
  {
    id: 4,
    title: "GMS",
    description:
      "Gym Management System redesign with optimized workflows and improved UI/UX.",
    tech: ["React", "Express", "MongoDB"],
    status: "Completed",
    liveLink: "",
    codeLink: "",
  },
];

const Projects = ({ refProp }) => {
  return (
    <section
      ref={refProp}
      className="min-h-screen bg-gray-950 text-white px-8 py-25"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-14">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:scale-105 transition duration-300 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>

                <span className="text-sm px-3 py-1 rounded-full bg-blue-600">
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((techItem, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {techItem}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.liveLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  View
                </a>

                <a
                  href={project.codeLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;