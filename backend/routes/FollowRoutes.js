const express = require ('express')
const router = express.Router()
const followController = require('../controllers/FollowController.js')

router.post("/:username/follow", followController.follow)
router.delete("/:username/unfollow", followController.unfollow)
router.get("/", followController.getFollow)
router.post("/:username/accept", followController.accFollow)
router.get("/:username/followers", followController.getFollowers)

module.exports = router;