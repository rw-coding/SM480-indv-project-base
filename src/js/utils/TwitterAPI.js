import request from "../utils/request";

export function searchTweets(searchQuery) {
    return request()
        .get(`/api/v1/twitter-search?query=${searchQuery}`)
        .send()
        .then((res) => {
            if (res.body) {
               return res.body;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function loadTweet(tweetId) {
    return request()
        .get(`/api/v1/twitter/${searchQuery}`)
        .send()
        .then((res) => {
            if (res.body) {
                return res.body;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}