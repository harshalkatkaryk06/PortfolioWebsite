import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAdmin } from "../api/auth";
import toast from "react-hot-toast";
import getErrorMessage from "../../utils/getErrorMessage.js";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await registerAdmin(form);

    toast.success(
      "Admin account created successfully."
    );

    navigate("/admin/login");
  } catch (error) {
    const status = error?.response?.status;

    if (status === 429) {
      toast.error(
        "Too many registration attempts. Please try again later."
      );
    } else if (
      error?.response?.data?.message ===
      "Admin already exists"
    ) {
      toast.error(
        "An admin account with this email already exists."
      );
    } else if (status === 400) {
      toast.error(
        "Please fill in all required fields."
      );
    } else {
      toast.error(
        getErrorMessage(
          error,
          "Registration failed. Please try again."
        )
      );
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Register Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-700"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-700"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-700"
          />

          <button
            disabled={loading}
            className="w-full py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already registered?{" "}
          <Link to="/admin/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;