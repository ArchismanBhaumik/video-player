import React, { useState,useEffect } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";


const Feed = ({ category,search }) => {
const [data, setData] = useState([]);
  const fetchData = async () => {
    const video_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(video_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);
  const filteredData = search
  ? data.filter((item) =>
      item.snippet.title.toLowerCase().includes(search.toLowerCase())
    )
  : data;
  return (
    <div className="feed">
      {filteredData &&
        filteredData.map((item, index) => {
          return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default Feed;
