import { useState } from "react";
import toast from "react-hot-toast";
import BASE_URL from "../config/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message
        );
      }

      toast.success(
        "Reset email sent successfully"
      );
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to send email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-4 bg-gray-800 text-white rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-500 text-black rounded-xl font-semibold"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;