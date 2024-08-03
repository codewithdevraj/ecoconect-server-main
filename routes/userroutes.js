const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/usercontrollers");
const {
  validateRegistration,
  validateLogin,
} = require("../middlewares/validation");

router.route("/").get((req, res) => {
  res.send("Hello from server");
});
router
  .route("/register")
  .get((req, res) => {
    res.send("Register");
  })
  .post(validateRegistration, registerUser);
router
  .route('/login')
  .get((req, res) => {
    res.send("Login");
  })
  .post(validateLogin, loginUser);

module.exports = router;
