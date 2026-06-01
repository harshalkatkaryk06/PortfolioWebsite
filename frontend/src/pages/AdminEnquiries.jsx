import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_BACKEND_URI
    : import.meta.env.VITE_DEV_BACKEND_URI;

const ENQUIRY_API = `${backendUrl}/api/enquiries`;

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
  try {
    const { data } = await axios.get(
      ENQUIRY_API,
      {
        withCredentials: true,
      }
    );

    setEnquiries(data.enquiries || []);
  } catch (error) {
    console.error(
      "Fetch Enquiries Error:",
      error.response?.data || error.message
    );

    toast.error("Failed to load enquiries");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await axios.patch(
        `${ENQUIRY_API}/${id}/read`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Marked as read");

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Mark Read Error:",
        error.response?.data || error.message
      );

      toast.error("Failed to update");
    }
  };

  const handleMarkUnread = async (id) => {
    try {
      await axios.patch(
        `${ENQUIRY_API}/${id}/unread`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Marked as unread");

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: false }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Mark Unread Error:",
        error.response?.data || error.message
      );

      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${ENQUIRY_API}/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Enquiry deleted");

      setEnquiries((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete Error:",
        error.response?.data || error.message
      );

      toast.error("Delete failed");
    }
  };

  const newMails = enquiries.filter(
    (item) => !item.isRead
  );

  const seenMails = enquiries.filter(
    (item) => item.isRead
  );

  const currentData =
    activeTab === "new"
      ? newMails
      : seenMails;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center text-xl">
        Loading enquiries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white px-10 py-12">
      <h1 className="text-4xl font-bold text-green-400 mb-10">
        Enquiries Inbox
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() =>
            setActiveTab("new")
          }
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            activeTab === "new"
              ? "bg-green-500 text-black"
              : "bg-gray-900 border border-gray-800"
          }`}
        >
          New Mail ({newMails.length})
        </button>

        <button
          onClick={() =>
            setActiveTab("seen")
          }
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            activeTab === "seen"
              ? "bg-green-500 text-black"
              : "bg-gray-900 border border-gray-800"
          }`}
        >
          Seen Mails ({seenMails.length})
        </button>
      </div>

      {/* Mail Cards */}
      <div className="grid gap-6">
        {currentData.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center text-gray-400">
            No enquiries found
          </div>
        ) : (
          currentData.map((mail) => (
            <div
              key={mail._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-green-400 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-green-400">
                    {mail.name}
                  </h2>

                  <p className="text-gray-400">
                    {mail.email}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      mail.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                {!mail.isRead && (
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    NEW
                  </span>
                )}
              </div>

              <div className="bg-black/30 rounded-xl p-4 mb-5">
                <p className="text-gray-300 whitespace-pre-wrap">
                  {mail.message}
                </p>
              </div>

              <div className="flex gap-4">
                {mail.isRead ? (
                  <button
                    onClick={() =>
                      handleMarkUnread(
                        mail._id
                      )
                    }
                    className="px-5 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:scale-105 transition"
                  >
                    Mark as Unread
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleMarkRead(
                        mail._id
                      )
                    }
                    className="px-5 py-2 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDelete(
                      mail._id
                    )
                  }
                  className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;