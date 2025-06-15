const express = require ('express')
const router = express.Router()
const FollowController = require('../controllers/FollowController.js')


router.post("/:username/follow", FollowController.follow);
router.delete("/:username/unfollow", FollowController.unfollow);
router.put("/follow/accept/:username", FollowController.acceptFollow);
router.get("/:username/follow-count", FollowController.getFollow);
router.get("/:username/follow-status", FollowController.getFollowStatus);

module.exports = router;