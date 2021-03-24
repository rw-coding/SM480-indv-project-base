import React from 'react';
import PropTypes from "prop-types";
import "./ConnectPopUp.scss";

function InfoPopUp(props) {

    console.log(props.tweet);
    // Decides if the popup should show or not
    if(!props.show) {
        return null;
    }

    return (
        <div className="pop-up">
            <button className="no-button" onClick={props.hidePopUp}> X </button>

            {/* Popup header */}
            <h1 className="pop-up-header"> Tweet Details</h1>

            {/* Tweet ID */}
            <div> Tweet ID: 
                <span>{props.tweet.id}</span>
            </div>

            {/* Date */}
            <div> Date Tweeted:
                <span>{props.tweet.created_at}</span>
            </div>

            {/* Name */}
            <div> Name:
                <span>{props.tweet.user.name}</span>
            </div>

            {/* Username */}
            <div> Username:
                <span>{props.tweet.user.username}</span>
            </div>

            {/* Likes */}
            <div> Number of Likes:
                <span>{props.tweet.public_metrics.like_count}</span>
            </div>

            {/* Retweets */}
            <div> Number of Retweets:
                <span>{props.tweet.public_metrics.retweet_count}</span>
            </div>

            {/* Replys */}
            <div> Number of Replys:
                <span>{props.tweet.public_metrics.reply_count}</span>
            </div>

            {/* Retweets */}
            <div> Number of Quotes:
                <span>{props.tweet.public_metrics.quote_count}</span>
            </div>

            {/* text */}
            <div> Text:
                <span>{props.tweet.text}</span>
            </div>
            
            {/* Media URL */}
            <div> Media URL:
                <span>{props.tweet.url}</span>
            </div>
        </div>
    
    )
}

InfoPopUp.propTypes = {
    // twitter ID
    tweet: PropTypes.object.isRequired,
    // twitterID: PropTypes.string.isRequired,
    // date: PropTypes.string,
    // twitterName: PropTypes.string,
    // username: PropTypes.string,
    // retweets: PropTypes.string,
    // replys: PropTypes.string,
    // quotes: PropTypes.string,
    // text: PropTypes.string,
    // url: PropTypes.string,
    show: PropTypes.bool,
    // for hiding pop up
    hidePopUp: PropTypes.func,
}

export default InfoPopUp;