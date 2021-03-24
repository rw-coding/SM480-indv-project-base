> ### Disclaimer
> **By viewing this project, we assume the following:**
> - You are enrolled in the SM480 class at Nossi College of Art in Nashville, Tennessee
> - You have prior knowledge of:
>   - Git, NPM/Yarn, JavaScript, React (Component, Hooks), etc.
> - You have all the necessary software to edit and run the project
>   - e.g. Code editor (VSCode, WebStorm, etc.), Node, NPM, etc.

# Nossi College of Art - Social Media 480
Professor: Grant Swertfeger \
Term: Spring 2021 \
Class: YOUR CLASS DAY & TIME \
Student Name: YOUR NAME 

> ### Instructions:
> 1. Create a fork of the repo to your own GitHub account
>   - [https://github.com/swertfeger/SM480-indv-project-base](https://github.com/swertfeger/SM480-indv-project-base)
> 2. Clone the forked repository to your computer then:
>   - Update README.md with your information
>   - Delete the **Disclaimer** section before submitting your assignment
>
> ###### _Failure to do step #2 will result in a reduced grade_

## Setup
To begin, install the Node pacakges for the project.

Navigate to the root folder of the project and run...
### `npm install`

## Run the server
### `npm run dev`

Starts the Node Server and the React application in development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser


## API Calls
This project has a Node server as a backend which is a proxy for the Twitter API. 

### Twitter Search
The Twitter API to search tweets for matching text, hashtags and users, etc.
### `GET - http://localhost:8080/api/v1/twitter-search?query=[SEARCH_QUERY]`
###### Parameters: query (String) - Text to search


#### Project React UI: `TwitterAPI.searchTweets(query)` from TwitterAPI.js

#### Example:
`http://localhost:8080/api/v1/twitter-search?query=suess`
#### Response:
```json
[
    {
        "public_metrics": {
            "retweet_count":0,
            "reply_count":0,
            "like_count":0,
            "quote_count":0
        },
        "created_at":"2021-03-24T16:48:06.000Z",
        "author_id":"159233006",
        "id":"1374764973327536130",
        "text":"@loonymoon Sehr süß. 🥰",
        "user":{
            "id":"159233006",
            "name":"Stephan 🇪🇺",
            "profile_image_url":"https://pbs.twimg.com/profile_images/1357615643462414336/R3oRdkRI_normal.jpg",
            "username":"zedbeeblebrox"
        }
    },
    ...
]
```

#### [Full Twitter API Documentation - Search Tweets](https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search)

## Tweet Lookup
The Twitter API call to get data for a specific Tweet
### `GET - http://localhost:8080/api/v1/twitter/:tweet_id`
###### URL parameters: tweet_id (String) - ID from Twitter Tweet


#### Project React UI: `TwitterAPI.loadTweet(tweetId)` from TwitterAPI.js 

#### Example:
`http://localhost:8080/api/v1/twitter/1374764973327536130`
##### Response:
```json
{
  "data":{
    "id":"1374764973327536130",
    "public_metrics":{
      "retweet_count":0,
      "reply_count":0,
      "like_count":1,
      "quote_count":0
    },
    "text":"@loonymoon Sehr süß. 🥰",
    "author_id":"159233006",
    "created_at":"2021-03-24T16:48:06.000Z"
  },
  "includes":{
    "users":[
      {
        "username":"zedbeeblebrox",
        "profile_image_url":"https://pbs.twimg.com/profile_images/1357615643462414336/R3oRdkRI_normal.jpg",
        "name":"Stephan 🇪🇺",
        "id":"159233006"
      }
    ]
  }
}
```

#### [Full Twitter API Documentation - Tweet lookup](https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference)
###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Additional Twitter APIs
#### [Twitter V2 API Documentation](https://developer.twitter.com/en/docs/twitter-api/early-access)
There are many other Twitter API calls available that are not currently implemented.

If you would like another API call to be implemented you can create an Issue for the repo with the details of what you would like.
[Request an API call](https://github.com/swertfeger/SM480-indv-project-base/issues/new) 

#### OR

You can implement the data call in `/server/api/twitter_api.js` \
then add a new path to `/server/routes/api_routes.js`

If you do this, please make a pull request back to the original repo. \
[GitHub: Creating a pull request from a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)

## Contact
Grant Swertfeger\
Email: [gswertfeger@nossi.edu](mailto:gswertfeger@nossi.edu)

