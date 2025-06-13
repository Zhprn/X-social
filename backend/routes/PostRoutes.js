const express = require ('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const AuthenticateRefreshtoken = require('../middlewares/authenticateRefreshtoken')

router.post("/", AuthenticateRefreshtoken,PostController.addPost);
router.delete("/:id", PostController.deletePost);
router.get("/", PostController.getAllPost)

module.exports = router;