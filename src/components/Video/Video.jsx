import { Height } from "@mui/icons-material";
import { height } from "@mui/system";
import React from "react";
import YouTube from "react-youtube";
// import "./MovieVideo.style.css"

const Video = ({strVideo}) => {
    const regex = /[?&]v=([^&]+)/;
    const match = strVideo?.match(regex);
    const videoId = match && match[1];
    console.log('videoId',videoId)
  
  const opts = {
    height:"100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return  <YouTube videoId={videoId} opts={opts}  className="youtube"/>;
};

export default Video;
