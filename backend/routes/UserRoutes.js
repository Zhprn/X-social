const express = require ('express')
const router = express.Router()
const UserController = require('../controllers/UserController');

router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);
router.delete("/auth/logout", UserController.logout)
router.get("/users", UserController.getAllUsers);
router.get("/user", UserController.getUser);
router.get("/users/:username", UserController.getOneUser);

module.exports = router;