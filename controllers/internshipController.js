const Internship = require("../models/Intership");
const internshipService = require("../services/internshipService");
const userService = require("../services/userService");

// Create Internship
exports.createIntership = async (req, res) => {
  const { positions, startDate, endDate, verified, jobdesk } = req.body;
  const authorId = req.currentUser.payload.id;

  if (!authorId) {
    return res.status(400).json({ message: "Author ID is required" });
  }

  if (!positions) {
    return res.status(400).json({ message: "Positions is required" });
  }

  if (!startDate) {
    return res.status(400).json({ message: "Start date is required" });
  }

  const userData = await userService.getUserById(authorId);
  const fullname = userData.name;
  const email = userData.email

  if (!fullname) {
    return res.status(400).json({ message: "Fullname is required" });
  }

  const jobdeskList = jobdesk.split(",").map((item) => item.trim());

  const data = {
    fullname,
    email,
    positions,
    startDate,
    endDate,
    verified,
    authorId,
    jobdesk: jobdeskList,
  };

  try {
    const saveData = await internshipService.createInternship(data);
    return res
      .status(200)
      .json({ message: "Internship data successfully created", saveData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All
exports.getAllInternship = async (req, res) => {
  try {
    const getAllData = await internshipService.getAllInternship();
    return res
      .status(200)
      .json({ messege: "Internship data succesfully retreive", getAllData });
  } catch (error) {
    return res.status(500).json({ messege: error });
  }
};

// Get User Internship
exports.getUserInternship = async (req, res) => {
  try {
    const getData = await internshipService.getUserInternship(req.params.id);
    return res
      .status(200)
      .json({ messege: "Internship data succesfully retreive", getData });
  } catch (error) {
    return res.status(500).json({ messege: error });
  }
};

// Get Detail Internship
exports.getInternshipDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const getData = await internshipService.getInternshipDetail(id);
    console.log(getData);
    return res
      .status(200)
      .json({ messege: "Internship data succesfully retreive", getData });
  } catch (error) {
    return res.status(500).json({ messege: error });
  }
};

// Update Internship
exports.updateInternship = async (req, res) => {
  const { positions, startDate, endDate, jobdesk, verified } = req.body;
  const id = req.params.id;

  const newData = {
    positions,
    startDate,
    endDate,
    verified,
  };

  if (jobdesk) {
    const jobdeskList = jobdesk.split(",").map((item) => item.trim());
    newData.jobdesk = jobdeskList;
  }

  try {
    const updateData = await internshipService.updateInternship(id, newData);

    if (!updateData) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.status(200).json({
      message: "Internship successfully updated",
      updatedInternship: updateData,
    });
  } catch (error) {
    console.error("Error updating internship:", error);
    return res
      .status(500)
      .json({ message: "Failed to update internship", error: error.message });
  }
};

// Delete Data
exports.deleteInternship = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteIntern = await internshipService.deleteInternship(id);
    return res.status(200).json({
      message: "Internship data successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete post and images",
      error: error.message,
    });
  }
};
