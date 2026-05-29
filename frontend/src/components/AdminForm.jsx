const AdminForm = ({ title, fields, data, handleChange }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 border border-gray-800">
      <h1 className="text-4xl font-bold text-green-400 mb-10">
        {title}
      </h1>

      {fields.map((field) => (
        <div key={field.name} className="mb-6">
          <label className="block mb-2 text-gray-300">
            {field.label}
          </label>

          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
              rows="5"
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 text-white"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={field.type !== "file" ? data[field.name] || "" : undefined}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 text-white"
            />
          )}
        </div>
      ))}

      <button className="w-full py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition">
        Save Changes
      </button>
    </div>
  );
};

export default AdminForm;