const Internship = require("../models/Intership");

// Create Internship
exports.createInternship = async (data) => {
  const internData = data;
  console.log(internData);
  const saveData = new Internship(internData);
  return await saveData.save();
};

// Read All Data
exports.getAllInternship = async () => {
  const result = await Internship.find();
  return result;
};
