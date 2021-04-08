import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { map, orderBy } from "lodash";
import * as TwitterAPI from "./js/utils/TwitterAPI";
import LoginForm from "./js/components/LoginForm";
import Card from "./js/components/Card";
import Input from "./js/components/Input";

function App(props) {
    const [twitterData, setTwitterData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShowing, setIsShowing] = useState(false);
    const [tweetData, setTweetData] = useState(null);

    useEffect(() => {
        if(!props.tweets) {
            TwitterAPI.searchTweets("");
        }
    }, []);

    console.log("TWITTER: ", twitterData);
    const mostRetweeted = twitterData
      ? orderBy(twitterData, ["public_metrics.retweet_count"], ["desc"])
      : [];

    const fullTweet = (tweet) => {
        setIsShowing(true);
        setTweetData(tweet);
    };

    return (
        <div className='App'>
            {isLoggedIn ?
                <BrowserRouter basename={""}>
                    <Switch>
                        <Route path="/">
                            <div className="tweet--bar tweet--container">
                                <div className="tweet--search">
                                    <Input placeholder="Search by tweet content" />
                                </div>
                                <button className="sort--button">|</button>
                            </div>
                            <div className="tweet--container">
                                <div className="tweet tweet--expanded">
                                    {isShowing && (
                                        <div>
                                            {tweetData.user.name}
                                        </div>
                                    )}
                                </div>
                                <div className="tweet--listing">
                                    {map(mostRetweeted.slice(0, 10), (tweet) => (
                                        <div onClick={() => fullTweet(tweet)}>
                                            <img src={tweet.user.profile_image_url} className="user--image" />
                                            <div>
                                                <div className="tweet--text--bold">
                                                    {tweet.user.name}
                                                </div>
                                                <div>
                                                    {tweet.user.username}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </BrowserRouter>
            :
                // Route to Login first
                <LoginForm onLogin={() => setIsLoggedIn(true)}/>
            }
        </div>
    );
}

export default App;
