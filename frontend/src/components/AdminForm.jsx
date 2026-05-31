import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const AdminForm = ({
  title,
  fields,
  data,
  handleChange,
  onSubmit,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropMode, setCropMode] = useState(false);

  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  // ---------------- IMAGE LOAD ----------------
  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
  };

  // ---------------- FILE SELECT ----------------
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setImageSrc({
      url,
      fieldName,
      file,
    });

    setCropMode(true);
  };

  // ---------------- CROP IMAGE ----------------
  const getCroppedImage = async () => {
    if (!imgRef.current || !completedCrop) return null;

    const canvas = document.createElement("canvas");

    const scaleX =
      imgRef.current.naturalWidth / imgRef.current.width;

    const scaleY =
      imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  // ---------------- APPLY CROP ----------------
  const handleCropApply = async () => {
    const croppedImage = await getCroppedImage();

    handleChange({
      target: {
        name: imageSrc.fieldName,
        value: croppedImage,
      },
    });

    setCropMode(false);
    setImageSrc(null);
  };

  // ---------------- CANCEL ----------------
  const handleCancel = () => {
    setCropMode(false);
    setImageSrc(null);
  };

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

          {/* FILE INPUT */}
          {field.type === "file" ? (
            <div className="flex flex-col items-center gap-4">
              {/* PREVIEW */}
              <div className="w-64 h-64 rounded-full border-4 border-green-400 overflow-hidden bg-gray-800 shadow-[0_0_40px_rgba(74,222,128,0.4)]">
                {data[field.name] ? (
                  <img
                    src={
                      typeof data[field.name] === "string"
                        ? data[field.name]
                        : URL.createObjectURL(
                            data[field.name]
                          )
                    }
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(e, field.name)
                }
                className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 text-white"
              />
            </div>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
              rows={5}
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 text-white"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 text-white"
            />
          )}
        </div>
      ))}

      {/* CROPPER MODAL */}
      {cropMode && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden">
            {/* HEADER */}
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-green-400 text-xl">
                Crop Image
              </h2>
            </div>

            {/* CROPPER */}
            <div className="flex-1 flex items-center justify-center bg-gray-800 overflow-hidden">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) =>
                  setCompletedCrop(c)
                }
                aspect={1}
              >
                <img
                  ref={imgRef}
                  src={imageSrc.url}
                  alt="crop"
                  onLoad={onImageLoad}
                  className="max-h-full max-w-full object-contain"
                />
              </ReactCrop>
            </div>

            {/* ACTIONS */}
            <div className="p-4 border-t border-gray-700 flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCropApply}
                className="px-4 py-2 bg-green-400 text-black rounded-lg font-semibold"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE BUTTON */}
      <button
        onClick={onSubmit}
        className="w-full mt-6 py-4 bg-green-400 text-black font-semibold rounded-xl hover:scale-105 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminForm;