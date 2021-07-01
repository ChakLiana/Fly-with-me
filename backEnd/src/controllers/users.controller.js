const userModel = require("../models/user");
const chalk = require("chalk");

const editUser = async (req, res) => {
  console.log(chalk.yellow(" EDIT user working. Recieved: "), req.body);
  let filter = { id: req.body.id };
  let update = req.body;
  try {
    // const fid= (await userModel.findOneAndUpdate(filter, update,))._id
    // console.log(fid);
    const updatedUser = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    const userToSend = await userModel.findById(updatedUser._id)
    // userModel.findOneAndUpdate(filter, update).then( x => console.log(x))

    // await updatedUser.save();
    console.log("NEW PATCHED USER", userToSend);
    return res.json(userToSend);
  } catch (err) {
    console.err(err);
  }
  // let updatedFields = Object.entries(req.body).filter((el) => el[1].trim())
  // if (updatedFields.length) {
  //   updatedFields = Object.fromEntries(updatedFields)
  //   try {
  //     const updatedUser = await userModel.findByIdAndUpdate(req.session.user.id, updatedFields, { new: true })
  //     return res.json(updatedUser).sendStatus(200)
  //   } catch (error) {
  //     return res.sendStatus(500)
  //   }
  // }
  // return res.sendStatus(418)
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = await userModel.findById(id, { password: 0 });
  setTimeout(() => {
    res.json(currentUser);
  }, 2e3);
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  editUser,
  getUser,
  getAllUsers,
};
