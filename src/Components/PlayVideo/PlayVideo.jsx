import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState();
  const [commentData, setCommentData] = useState();
  const fetchVideoData = async () => {
    const video_details_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
    await fetch(video_details_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };
  const fetchChannelData = async () => {
    const channelData = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData ? apiData.snippet.channelId : ""}&key=${API_KEY}`;
    await fetch(channelData)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
      const comments = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comments)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };
  
  useEffect(() => {
    fetchVideoData();
  }, []);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here!"}</h3>
      <div className="play-video-info">
        <p>
          {apiData?.statistics?.viewCount
            ? valueConverter(apiData.statistics.viewCount)
            : "No Views!"}{" "}
          Views •{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {valueConverter(apiData ? apiData.statistics.likeCount : "")}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? valueConverter(channelData.statistics.subscriberCount)
              : ""}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 200) : ""}</p>
        <p>Subscribe to learn!</p>
        <hr />
        <h4>{apiData ? apiData.statistics.commentCount : ""} Comments</h4>
        {commentData && commentData.map((comment, index) => {
          return (
            <div className="comment">
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName} <span> {moment(comment.snippet.topLevelComment.publishedAt).fromNow()}</span>
                </h3>
                <p> {comment.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default PlayVideo;
