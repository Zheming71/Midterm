let mongoose = require("mongoose");

// create a model class
let Faculty = mongoose.Schema(
  {
    Facultyid: String,  
    Facultyname: String,
    Department: String,
    Subject: String,
   },
  {
    collection: "faculties",
  }
);

module.exports = mongoose.model("Faculty", Faculty);
