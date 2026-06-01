import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminForm from "../components/AdminForm";
import { formConfigs } from "../config/adminForms";
import toast from "react-hot-toast";
import BASE_URL from "../config/api";

const AdminFormPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH EXISTING DATA
  // =========================
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        let endpoint = "";

        if (type === "profile") {
          endpoint = `${BASE_URL}/api/profile`;
        }

        if (type === "projects" && id) {
          endpoint = `${BASE_URL}/api/projects/${id}`;
        }

        if (type === "skills" && id) {
          endpoint = `${BASE_URL}/api/skills/${id}`;
        }

        if (!endpoint) {
          setFormData({});
          setLoading(false);
          return;
        }

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!data.success) {
          toast.error("Failed to load data");
          setLoading(false);
          return;
        }

        const raw = data.data;

        // =========================
        // SKILLS PREFILL
        // =========================
        if (type === "skills" && id) {
          setFormData({
            category: raw.title || "",
            coreCompetencies: Array.isArray(raw.coreCompetencies)
              ? raw.coreCompetencies.join(", ")
              : "",
          });
        }

        // =========================
        // PROJECTS PREFILL
        // =========================
        else if (type === "projects" && id) {
          setFormData({
            ...raw,
            techStack: Array.isArray(raw.tech)
              ? raw.tech.join(", ")
              : "",
          });
        }

        // =========================
        // PROFILE + DEFAULT
        // =========================
        else {
          setFormData(raw);
        }
      } catch (err) {
        toast.error(`Failed to load ${type}`);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingData();
  }, [type, id]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT HANDLER
  // =========================
  const handleSubmit = async () => {
    try {

      let endpoint = "";
      let method = "POST";

      // =========================
      // SET ENDPOINTS
      // =========================
      if (type === "profile") {
        endpoint = `${BASE_URL}/api/profile`;
        method = "POST"; // upsert
      }

      if (type === "skills") {
        endpoint = id
          ? `${BASE_URL}/api/skills/${id}`
          : `${BASE_URL}/api/skills`;
        method = id ? "PUT" : "POST";
      }

      if (type === "projects") {
        endpoint = id
          ? `${BASE_URL}/api/projects/${id}`
          : `${BASE_URL}/api/projects`;
        method = id ? "PUT" : "POST";
      }

      // =========================
      // BUILD PAYLOAD
      // =========================
      let payload = { ...formData };

      // =========================
      // SKILLS TRANSFORM
      // =========================
      if (type === "skills") {
        payload.title = formData.category;

        payload.coreCompetencies =
          typeof formData.coreCompetencies === "string"
            ? formData.coreCompetencies
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean)
            : [];
      }

      // =========================
      // PROJECTS TRANSFORM
      // =========================
      if (type === "projects") {
        payload.tech =
          typeof formData.techStack === "string"
            ? formData.techStack
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean)
            : [];

        delete payload.techStack;
      }

      // =========================
      // API CALL
      // =========================
      const res = await fetch(endpoint, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save");
        return;
      }

      toast.success(
        id ? "Updated successfully" : `${type} created successfully`
      );

      navigate(`/admin/${type}`);
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-green-400">
        Loading...
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">
      <AdminForm
        title={id ? `EDIT ${type.toUpperCase()}` : type.toUpperCase()}
        fields={formConfigs[type]}
        data={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminFormPage;