// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

//-----------------------------  ggg adds: for gmongoDB 
const url = 'mongodb://localhost:27017/faculty_info';
const dbName = 'faculty_info'; 
  var ContactSchema = new mongoose.Schema(
    {
      Facultyid: String,
      Facultyname: String,
      Department: String,
      subject: String,
    });

 //mongoose.connect(url).then(() =>{   //-----  can not link twice
   //  console.log('ok--------------link--------- ：ggg123');
   //}).catch(err =>{
   //  console.log('xxx--------------link--------- ：ggg123'+ err);
   //  console.log(err);
   //});    

  //only one time 

  var Contacts = mongoose.model("Faculties",ContactSchema);
//-----------------------------

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {

    //Contacts.find((err, faculties) => {
    //  if (err) {
    //    console.log('xxx--------------find0000 ：ggg123'+ err);
    //    return console.error(err);
    //  } else {
    //    console.log('ok--------------find0000 ：ggg123'+ faculties.length);
    //  }
    //})
    
    // find all faculties in the faculties collection
    //faculty.find((err, faculties) => {      Contacts:ok

    faculty.find((err, faculties) => {
    if (err) {
      console.log('xxx--------------find ：ggg123'+ err);
      return console.error(err);
    } else {
      console.log('ok-------------- to be display  faculties list ----  ：ggg123===' + faculties.length );
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

router.post("/add", (req, res, next) => {
  let falculty = faculties({
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,

  });
  faculties.create(falculty, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book-list
      res.redirect("/faculties");
    }
  });
});


router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  faculties.findById(id, (err, facultiestoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("faculties/edit.ejs", { title: "Edit faculties", faculties: facultiestoedit });
    }
  });
});

/*POST Route for processing Edit page - UPDATE OPeration */
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatefaculties = faculties({
    _id: id,
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject,
  });
  faculties.updateOne({ _id: id }, updatefaculties, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the book list
      res.redirect("/faculties");
    }
  });
});

router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  faculties.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
     
      res.redirect("/faculties");
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  console.log('ok---before of add!!!---enter: router file( faculties.js）===get(/add,...===------  ：ggg123===');
  res.render("faculties/add.ejs", {
    title: "Faculties",
  });
});

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   console.log('ok00 --click submit after of add!!!----enter: router file( faculties.js）===post(/add,...===------  ：ggg123===');
   faculty.insertOne({Facultyid: "1002", Facultyname: "name01", Department: "dep01", Subject: "sub01"});
   
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   console.log('ok01 --click submit after of add!!!----enter: router file( faculties.js）===post(/:id,...===------  ：ggg123===');

});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
