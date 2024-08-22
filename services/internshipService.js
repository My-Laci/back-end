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

// Read User Data
exports.getUserInternship = async (authorId) => {
  const userInternship = await Internship.find(authorId);
  return userInternship;
};

// Read User Data by ID
exports.getInternshipDetail = async (id) => {
  const data = await Internship.findById(id);
  console.log(data);
  return data;
};

// Update Data
exports.updateInternship = async (id, newData) => {
  const updatedInternship = await Internship.findOneAndUpdate(
    { _id: id },
    newData,
    { new: true }
  );
  return updatedInternship;
};

// Delete data
exports.deleteInternship = async (id) => {
  const deleteData = await Internship.findByIdAndDelete(id);
  return deleteData;
};
