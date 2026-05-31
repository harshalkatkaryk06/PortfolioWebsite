export const formConfigs = {
  profile: [
    { name: "image", label: "Profile Image", type: "file" },
    { name: "role", label: "Role", type: "text" },
    { name: "heading", label: "Heading", type: "text" },
    { name: "description", label: "Description", type: "textarea" }
  ],

  projects: [
    { name: "title", label: "Project Title", type: "text" },
    { name: "status", label: "Status", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "techStack", label: "Tech Stack", type: "text" },
    { name: "liveLink", label: "Live Link", type: "text" },
    { name: "codeLink", label: "GitHub Link", type: "text" }
  ],

  skills: [
  {
    name: "category",
    label: "Skill Category",
    type: "text"
  },
  {
    name: "coreCompetencies",
    label: "Core Competencies",
    type: "textarea"
  }
]
};