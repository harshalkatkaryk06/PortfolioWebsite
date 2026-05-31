import Enquiry from "../models/enquiryModel.js";

// GET ALL ENQUIRIES
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error("Get Enquiries Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};

// MARK AS READ
export const markEnquiryRead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    enquiry.isRead = true;

    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: "Enquiry marked as read",
      enquiry,
    });
  } catch (error) {
    console.error("Mark Read Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry",
    });
  }
};
// MARK AS UNREAD
export const markEnquiryUnread = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    enquiry.isRead = false;

    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: "Enquiry marked as unread",
      enquiry,
    });
  } catch (error) {
    console.error("Mark Unread Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry",
    });
  }
};

// DELETE ENQUIRY
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
    });
  }
};