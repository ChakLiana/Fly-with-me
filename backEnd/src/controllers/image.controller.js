// Controller for image upload
// path lib is used for saving incoming image
const path = require("path");
// model imported for putting the link to DB
const userModel = require("../models/user");

const imageController = (req, res) => {
  console.log("image controller HERE !!!");
  console.log("body recieved", req.body);
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;

  // uploadPath = path.join(__dirname + "/../public/images/" + sampleFile.name);
  uploadPath = path.join(
    __dirname + "/../../../frontend/public/images/" + sampleFile.name
  );
  console.log("upload PATH =>", uploadPath);
  let pathToLink = `http://localhost:3000/images/${sampleFile.name}`;

  async function putLink() {
    let filter = { _id: req.body.fileOwner };
    console.log(filter);
    const picturedUser = await userModel.findOneAndUpdate(
      filter,
      { photo: pathToLink },
      {
        new: true,
      }
    );
    const userToSend = await userModel.findById(req.body.fileOwner);
    console.log("user to Send", userToSend);

    return res.json(userToSend.photo);
  }

  // Use the mv() method to place the file somewhere on server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    putLink();
  });
};

module.exports = {
  imageController,
};
