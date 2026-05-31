import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAdmin } from "../api/auth";
import toast from "react-hot-toast";
import getErrorMessage from "../../utils/getErrorMessage.js"; 

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = await loginAdmin(form);

    localStorage.setItem("token", data.token);

    toast.success("Welcome back! Login successful.");

    navigate("/admin/dashboard");
  } catch (error) {
    const status = error?.response?.status;

    if (status === 429) {
      toast.error(
        "Too many login attempts. Please try again in 15 minutes."
      );
    } else if (status === 404) {
      toast.error("Admin account not found.");
    } else if (status === 400) {
      toast.error("Invalid email or password.");
    } else {
      toast.error(
        getErrorMessage(
          error,
          "Unable to login. Please try again."
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
          Admin Login
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-gray-700"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/admin/register"
            className="text-green-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;