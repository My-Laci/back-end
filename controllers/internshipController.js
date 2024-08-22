const intershipService = require("../services/internshipService");
const userService = require("../services/userService");

// Create Internship
exports.createIntership = async (req, res) => {
  const { positions, startDate, endDate, verified } = req.body;
  const authorId = req.currentUser.payload.id;
  const userData = await userService.getUserById(authorId);
  const fullname = userData.name;

  if (!fullname) {
    return res.status(400).json({ message: "Fullname is required" });
  }

  if (!positions) {
    return res.status(400).json({ message: "Positions is required" });
  }

  if (!startDate) {
    return res.status(400).json({ message: "Start date is required" });
  }

  const data = {
    fullname,
    positions,
    startDate,
    endDate,
    verified,
    authorId,
  };

  try {
    const saveData = intershipService.createInternship(data);
    return res
      .status(200)
      .json({ messege: "Internship data succesfully created" });
  } catch (error) {
    return res.status(500).json({ messege: error });
  }
};

// Get All
exports.getAllInternship = async (req, res) => {
  try {
    const getAllData = await intershipService.getAllInternship();
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
    const { authorId } = req.params;
    const getData = await intershipService.getUserInternship(authorId);
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
    const getData = await intershipService.getInternshipDetail(id);
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
  const { positions, startDate, endDate } = req.body;
  console.log(positions);

  const id = req.params.id;

  const newData = {
    positions,
    startDate,
    endDate,
  };

  console.log(newData);

  const updateData = await intershipService.updateInternship(id, newData);
  console.log(updateData);
};

// Delete Data
exports.deleteInternship = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteIntern = await intershipService.deleteInternship(id);
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
