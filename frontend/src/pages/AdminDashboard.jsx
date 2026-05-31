import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const dashboardCards = [
  {
    title: "Profile Customization",
    desc: "Refine your hero section, update descriptions, and change cover imagery.",
    route: "/admin/form/profile"
  },
  {
    title: "Project Management",
    desc: "Add, edit, organize, and showcase your portfolio projects.",
    route: "/admin/projects"
  },
  {
    title: "Skills & Expertise",
    desc: "Manage technical competencies, categories, and displayed proficiency.",
    route: "/admin/skills"
  },
  {
    title: "Enquiries Inbox",
    desc: "Review and manage incoming messages from your contact portal.",
    route: "/admin/enquiries"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-10 py-16">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-green-400">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-lg mt-2">
            Centralized control over your digital portfolio ecosystem.
          </p>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:scale-105 transition"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-400 transition duration-300 cursor-pointer hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-green-400 mb-4">
              {card.title}
            </h2>

            <p className="text-gray-400 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;