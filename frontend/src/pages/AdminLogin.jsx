import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Admin Login
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-gray-800 text-white rounded-xl outline-none border border-gray-700"
          />

          <button
            type="submit"
            className="w-full py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition"
          >
            Login
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