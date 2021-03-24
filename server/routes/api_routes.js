const {Router} = require("express");
const twitterApi = require('../api/twitter_api');
const router = Router();

router.get('/twitter-search', twitterApi.searchTweets);
router.get('/twitter/:tweetId', twitterApi.getTweetById);

module.exports = router;