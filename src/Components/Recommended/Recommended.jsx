import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY, valueConverter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  console.log("categoryID::::",categoryId);
  const fetchData = async () => {
    const related_videos_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;
    await fetch(related_videos_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));

      console.log(apiData);
  };
  useEffect(()=>{
    fetchData()
  }, []);
  return (
    <div className="recommended">
      {apiData.map((video, index) => {
        return (
          <Link to={`/video/${video.snippet.categoryId}/${video.id}`}>
          <div className="side-video-list" key={index}>
            <img src={video.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{video.snippet.title}</h4>
              <p>{video.snippet.channelTitle}</p>
              <p>{valueConverter(video.statistics.viewCount)}</p>
            </div>
          </div>
          </Link>
        );
      })} 
    </div>
  );
};

export default Recommended;
