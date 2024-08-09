const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Data akan terhapus otomatis setelah 1 jam
});

module.exports = mongoose.model('TempUser', tempUserSchema);
