const _ = require("lodash");
const TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAALJJLQEAAAAAMM88hKMMvNEShgxOIHEH8dIra%2BA%3DwwpyafVEeYGDtJMDNjQF0eNDLXWv8QMXblkrzBcfjNDQsZZtLv";
const TWITTER_API_BASE = "https://api.twitter.com/2";
const searchEndpointUrl = `${TWITTER_API_BASE}/tweets/search/recent`;
const tweetEndpointUrl = `${TWITTER_API_BASE}/tweets/`;

const needle = require('needle');

async function searchTweets (req, res) {
    console.log(req.query);

    // These are the parameters for the API request
    // specify Tweet IDs to fetch, and any additional fields that are required
    // by default, only the Tweet ID and text are returned
    const params = {
        "query": req.query.query,
        "tweet.fields": "author_id,text,created_at,public_metrics,attachments", // Edit optional query parameters here
        "expansions": "author_id",
        "user.fields": "profile_image_url",
        "max_results": 100
    };

    try {
        // Make request
        const response = await getRequest(searchEndpointUrl, params);
        console.log(response);
        if(response.data) {
            res.status(200).json(mapTweetsToUsers(response));
        } else {
            res.status(200).json({ data: [] });
        }
    } catch (err) {
        res.status(500);
        res.render('error', { error: err });
    }
}

async function getTweetById (req, res) {
    const { tweetId } = req.params;

    const params = {
        "tweet.fields": "author_id,text,created_at,public_metrics,attachments", // Edit optional query parameters here
        "expansions": "author_id,attachments.media_keys",
        "user.fields": "profile_image_url",
        "media.fields": "media_key,preview_image_url,type,url,width,height,public_metrics"
    };

    try {
        // Make request
        const response = await getRequest(`${tweetEndpointUrl}${tweetId}`, params);
        if(response) {
            // return all the data, not just the data
             res.status(200).json(mapTweetUser(response));
        } else {
            res.status(200).json({ data: []});
        }
    } catch (err) {
        res.status(500);
        res.render('error', { error: err });
    }
}

function mapTweetUser(tweet, users) {
    return {
    ...tweet,
        user: _.find(users, user => user.id === tweet.author_id),
    }
}

function mapTweetsToUsers(results) {
    const { data, includes:{ users }} = results;
    return _.map(data, tweet => mapTweetUser(tweet, users));
}

async function getRequest(endpointURL, params) {

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${TWITTER_BEARER_TOKEN}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

exports.searchTweets = searchTweets;
exports.getTweetById = getTweetById;
