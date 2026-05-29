const skillsData = [
  {
    id: 1,
    category: "Frontend",
    skills: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
  },
  {
    id: 2,
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    id: 3,
    category: "Database",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    id: 4,
    category: "AI / GenAI",
    skills: ["Prompt Engineering", "RAG", "Embeddings", "LLM Integration"],
  },
  {
    id: 5,
    category: "Tools",
    skills: ["Git", "GitHub", "Postman", "Deployment"],
  },
];

const Skills = ({ refProp }) => {
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
              key={category.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:scale-105 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-5 text-blue-400">
                {category.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
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