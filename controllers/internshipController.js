const intershipService = require("../services/internshipService");

// Create Internship
exports.createIntership = async (req, res) => {
  const { fullname, positions, startDate, endDate, verified } = req.body;
  const authorId = req.currentUser.payload.id;

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
