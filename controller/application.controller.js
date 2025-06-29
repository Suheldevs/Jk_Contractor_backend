
import Application from '../model/application.model.js'

// ✅ Save a new application
const applyForJob = async (req, res) => {
  try {
    const { name, phone, email, position, qualification, experience, linkedin, resume, cover_letter } = req.body;
    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    const newApplication = new Application({
      name,
      phone,
      email,
      position,
      qualification,
      experience,
      linkedin,
      resume, // Cloudinary URL
      cover_letter,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!", application: newApplication });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ appliedAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete an application by ID
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    await Application.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted successfully!" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {applyForJob,getAllApplications,deleteApplication}
