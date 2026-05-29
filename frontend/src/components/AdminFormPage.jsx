import { useParams } from "react-router-dom";
import { useState } from "react";
import AdminForm from "../components/AdminForm";
import { formConfigs } from "../config/adminForms";

const AdminFormPage = () => {
  const { type } = useParams();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">
      <AdminForm
        title={type.toUpperCase()}
        fields={formConfigs[type]}
        data={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AdminFormPage;