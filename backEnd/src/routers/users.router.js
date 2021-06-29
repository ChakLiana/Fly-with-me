const { Router } = require("express");
const usersController = require("../controllers/users.controller");
const {checkAuth} = require("../controllers/auth.controller");
const checkJwt = require ( '../middlewares/checkJwt.js')

const usersRouter = Router();

usersRouter.get("/", checkAuth, usersController.getAllUsers);
usersRouter
  .route("/")
  .patch(checkAuth, usersController.editUser)
  .get(usersController.getUser);

module.exports = usersRouter;
