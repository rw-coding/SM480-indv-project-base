import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { map, orderBy } from "lodash";
import * as TwitterAPI from "./js/utils/TwitterAPI";
import LoginForm from "./js/components/LoginForm";
import Input from "./js/components/Input";
import VerticalChart from "./js/components/VerticalChart";
import PieChart from "./js/components/PieChart";
import LineChart from "./js/components/LineChart";
import AreaChart from "./js/components/AreaChart";

function App(props) {
    const [twitterData, setTwitterData] = useState([]);
    const [searchData, setSearchData] = useState("Bob Ross");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShowing, setIsShowing] = useState(false);
    const [tweetData, setTweetData] = useState(null);
    const [showGraph, setShowGraph] = useState(false);
    const [showBar, setShowBar] = useState(true);
    const [showPie, setShowPie] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [showArea, setShowArea] = useState(false);
    const [sortShowing, setSortShowing] = useState(false);
    const [sortOrder, setSortOrder] = useState("public_metrics.like_count")

    useEffect(() => {
        if(!props.tweets) {
            searchTwitter(searchData);
        }
    }, []);

    const searchTwitter = async (query) => {
      const results = await TwitterAPI.searchTweets(query);
      setTwitterData(results);
    };
    
    const likeCount = "public_metrics.like_count";
    const replyCount = "public_metrics.reply_count";
    const quoteCount = "public_metrics.quote_count";
    const shareCount = "public_metrics.share_count";
    let sorter = sortOrder;

    console.log("TWITTER: ", twitterData);
    const tweeted = twitterData
      ? orderBy(twitterData, [sorter], ["desc"])
      : [];

    let tweetList = 10;

    const changeTerm = (e) => {
        setSearchData(e.target.value);
        console.log(searchData);
        if(!props.tweets) {
            searchTwitter(searchData);
        }
    }
    
    if (!twitterData.length) {
        return <div>LOADING</div>;
    }

    const fullTweet = (tweet) => {
        setIsShowing(true);
        setTweetData(tweet);
    };
    const graph = () => {
        setShowGraph(true);
    };
    const hideGraph = () => {
        setShowGraph(false);
    }
    const bar = () => {
        setShowBar(true);
        setShowPie(false);
        setShowLine(false);
        setShowArea(false);
    }
    const pie = () => {
        setShowBar(false);
        setShowPie(true);
        setShowLine(false);
        setShowArea(false);
    }
    const line = () => {
        setShowBar(false);
        setShowPie(false);
        setShowLine(true);
        setShowArea(false);
    }
    const area = () => {
        setShowBar(false);
        setShowPie(false);
        setShowLine(false);
        setShowArea(true);
    }
    const showSort = () => {
        setSortShowing(true)
    }
    const hideSort = () => {
        setSortShowing(false)
    }
    const likeChange = () => {
        setSortOrder(likeCount)
    }
    const replyChange = () => {
        setSortOrder(replyCount)
    }
    const quoteChange = () => {
        setSortOrder(quoteCount)
    }
    const shareChange = () => {
        setSortOrder(shareCount)
    }

    const metrics = map(tweeted.slice(0, tweetList), (tweet) => ({
        name: tweet.user.username,
        likes: tweet.public_metrics.like_count,
        retweets: tweet.public_metrics.retweet_count,
        replies: tweet.public_metrics.reply_count,
        quotes: tweet.public_metrics.quote_count
    }));
    const data = {
        labels: [metrics[0].name, metrics[1].name, metrics[2].name, metrics[3].name, metrics[4].name, metrics[5].name, metrics[6].name, metrics[7].name, metrics[8].name, metrics[9].name],
        scales: {
            yAxes: {
                ticks: {
                    min: 0
                }
            }
        },
        datasets: [
            {
                label: 'Likes',
                backgroundColor: 'rgba(2,20,200,0.4)',
                borderColor: 'rgba(2,20,200,1)',
                data: [metrics[0].likes, metrics[1].likes, metrics[2].likes, metrics[3].likes, metrics[4].likes, metrics[5].likes, metrics[6].likes, metrics[7].likes, metrics[8].likes, metrics[9].likes]
            },
            {
                label: 'Retweets',
                backgroundColor: 'rgba(75,2,2,0.4)',
                borderColor: 'rgba(75,2,2,1)',
                data: [metrics[0].retweets, metrics[1].retweets, metrics[2].retweets, metrics[3].retweets, metrics[4].retweets, metrics[5].retweets, metrics[6].retweets, metrics[7].retweets, metrics[8].retweets, metrics[9].retweets]
            },
            {
                label: 'Replies',
                backgroundColor: 'rgba(50,200,2,0.4)',
                borderColor: 'rgba(50,200,2,1)',
                data: [metrics[0].replies, metrics[1].replies, metrics[2].replies, metrics[3].replies, metrics[4].replies, metrics[5].replies, metrics[6].replies, metrics[7].replies, metrics[8].replies, metrics[9].replies]
            },
            {
                label: 'Quotes',
                backgroundColor: 'rgba(80,100,200,0.4)',
                borderColor: 'rgba(80,100,200,1)',
                data: [metrics[0].quotes, metrics[1].quotes, metrics[2].quotes, metrics[3].quotes, metrics[4].quotes, metrics[5].quotes, metrics[6].quotes, metrics[7].quotes, metrics[8].quotes, metrics[9].quotes]
            }
        ]
    };

    return (
        <div className='App'>
            {isLoggedIn ?
                <BrowserRouter basename={""}>
                    <Switch>
                        <Route path="/">
                            <div className="tweet--bar tweet--row">
                                <div class="tweet--search">
                                    <input onChange={changeTerm} placeholder="Search by tweet content" className="tweet--update" />
                                </div>
                                <button className="sort--button" onClick={() => showSort()}><b>|</b></button>
                            </div>
                            <div className="tweet--container">
                                {!showGraph && (
                                    <div className="tweet--container tweet--column">  
                                        <button className="graph--button tweet" onClick={() => graph()}>Show graph</button>
                                        <div className="tweet tweet--expanded">
                                            {isShowing && (
                                                <div>
                                                    <div className="tweet--user">
                                                        <img src={tweetData.user.profile_image_url} className="user--image" alt={tweetData.user.username} />
                                                        <div className="tweet--names">
                                                            <div className="tweet--text--bold">
                                                                {tweetData.user.name}
                                                            </div>
                                                            <div>
                                                                @{tweetData.user.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tweet--text">
                                                        {tweetData.text}
                                                    </div>
                                                    <a class="twitter-follow-button" href={"https://twitter.com/" + tweetData.user.username} data-show-count="true">
                                                        Follow @{tweetData.user.username}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {showGraph && (
                                    <div className="tweet--container tweet--column"> 
                                        <button className="graph--button tweet" onClick={() => hideGraph()}>Show tweet</button>
                                        
                                        {showBar && (
                                            <div className="tweet tweet--expanded">
                                                <div className="graph--buttons">
                                                    <button>Bar</button>
                                                    <button onClick={() => pie()}>Pie</button>
                                                    <button onClick={() => line()}>Line</button>
                                                    <button onClick={() => area()}>Area</button>
                                                </div>
                                                <VerticalChart data={data} />
                                            </div>
                                        )}
                                        {showPie && (
                                            <div className="tweet tweet--expanded">
                                                <div className="graph--buttons">
                                                    <button onClick={() => bar()}>Bar</button>
                                                    <button>Pie</button>
                                                    <button onClick={() => line()}>Line</button>
                                                    <button onClick={() => area()}>Area</button>
                                                </div>
                                                <PieChart data={data} />
                                            </div>
                                        )}
                                        {showLine && (
                                            <div className="tweet tweet--expanded">
                                                <div className="graph--buttons">
                                                    <button onClick={() => bar()}>Bar</button>
                                                    <button onClick={() => pie()}>Pie</button>
                                                    <button>Line</button>
                                                    <button onClick={() => area()}>Area</button>
                                                </div>
                                                <LineChart data={data} />
                                            </div>
                                        )}
                                        {showArea && (
                                            <div className="tweet tweet--expanded">
                                                <div className="graph--buttons">
                                                    <button onClick={() => bar()}>Bar</button>
                                                    <button onClick={() => pie()}>Pie</button>
                                                    <button onClick={() => line()}>Line</button>
                                                    <button>Area</button>
                                                </div>
                                                <AreaChart data={data} />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="tweet--listing">
                                    {map(tweeted.slice(0, tweetList), (tweet) => (
                                        <div className="tweet--preview" onClick={() => fullTweet(tweet)}>
                                            <div className="tweet--user">
                                                <img src={tweet.user.profile_image_url} className="user--image" />
                                                <div className="tweet--names">
                                                    <div className="tweet--text--bold">
                                                        {tweet.user.name}
                                                    </div>
                                                    <div>
                                                        @{tweet.user.username}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {tweet.text.substring(0,50)}...
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {sortShowing && (
                                    <div className="tweet--sort" onMouseLeave={() => hideSort()}>
                                        <button onClick={() => likeChange()}>Sort by likes</button>
                                        <button onClick={() => replyChange()}>Sort by replies</button>
                                        <button onClick={() => quoteChange()}>Sort by quotes</button>
                                        <button onClick={() => shareChange()}>Sort by shares</button>
                                    </div>
                                )}
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
