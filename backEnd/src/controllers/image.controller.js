// Controller for image upload

// const fileUpload = require("express-fileupload");
// const express = require( ' express')
// express().use(fileUpload())

const imageController = (req, res) => {
  console.log("image controller HERE !!!");
  let sampleFile;
  let uploadPath;
  let photoLink = req.body.fileOwner;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;

  // uploadPath = __dirname + "../public/images//Fly-with-me/backEnd/src/public/images/" + sampleFile.name;
  uploadPath ="/home/sek/projects/" + sampleFile.name;

  console.log("upload PATH =>", uploadPath);
  // subName(photoLink);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
};

module.exports = {
  imageController,
};
