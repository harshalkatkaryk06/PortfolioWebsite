import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BASE_URL from "../config/api";

const ProtectedRoute = ({
  children,
}) => {
  const [loading, setLoading] =
    useState(true);

  const [
    authenticated,
    setAuthenticated,
  ] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/auth/me`,
          {
            credentials: "include",
          }
        );

        const data =
          await res.json();

        if (mounted) {
          setAuthenticated(
            res.ok &&
              data.authenticated ===
                true
          );
        }
      } catch {
        if (mounted) {
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-green-400">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;