import Profile from "../models/Profile.js";

// CREATE or UPDATE profile (we keep only ONE profile for admin)
export const upsertProfile = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "No data received",
      });
    }

    const { role, heading, description, image } = req.body;

    let profile = await Profile.findOne();

    if (profile) {
      profile.role = role ?? profile.role;
      profile.heading = heading ?? profile.heading;
      profile.description = description ?? profile.description;
      profile.image = image ?? profile.image;

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      });
    }

    profile = await Profile.create({
      role,
      heading,
      description,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error); // 👈 IMPORTANT
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET profile (for Hero page)
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE profile (remove the single admin profile)
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await Profile.deleteOne({ _id: profile._id });

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};