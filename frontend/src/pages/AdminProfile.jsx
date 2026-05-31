import { useState } from "react";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    role: "Full Stack Developer",
    heading: "Hi, I'm Harshal Katkar",
    description:
      "Architecting resilient digital systems with precision and intent — designing scalable applications, engineering dependable backend infrastructures, and continually advancing in backend security to build systems fortified against evolving threats.",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfile({
      ...profile,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-10 py-16">
      <h1 className="text-4xl font-bold text-green-400 mb-10">
        Profile Customization
      </h1>

      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-8 border border-gray-800">
        {/* Profile Image */}
        <div className="mb-8">
          <label className="block mb-3 text-gray-300">
            Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-gray-400"
          />

          {profile.image && (
            <img
              src={profile.image}
              alt="Preview"
              className="w-32 h-32 rounded-full mt-4 object-cover border-2 border-green-400"
            />
          )}
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700"
          />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={profile.heading}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            rows="6"
            value={profile.description}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700"
          />
        </div>

        <button className="w-full py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;