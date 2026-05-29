import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    role: "Full Stack Developer",
    heading: "Hi, I'm Harshal Katkar",
    description:
      "Architecting resilient digital systems with precision and intent — designing scalable applications, engineering dependable backend infrastructures, and continually advancing in backend security to build systems fortified against evolving threats.",
    image: null,
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);

      setProfile({
        ...profile,
        image: imageUrl,
      });
    }
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

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
            className="text-gray-400 mb-6"
          />

          {imageSrc && (
            <>
              {/* Cropper */}
              <div className="relative w-full h-80 bg-gray-800 rounded-xl overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={true}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* Zoom Slider */}
              <div className="mt-6">
                <label className="block mb-2 text-gray-300">
                  Zoom
                </label>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) =>
                    setZoom(Number(e.target.value))
                  }
                  className="w-full accent-green-400"
                />
              </div>

              {/* Preview */}
              <div className="mt-8 flex justify-center">
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-400"
                />
              </div>
            </>
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