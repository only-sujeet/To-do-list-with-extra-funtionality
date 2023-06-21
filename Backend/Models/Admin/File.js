const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  name: String,
  driveLink: String,
})





module.exports = mongoose.model("File", fileSchema)