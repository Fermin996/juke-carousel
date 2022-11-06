import React from "react";

const Album = ({ album }) => {
  return (
    <div className={`album-div ${album.style}`}>
      <img className="image-div" src={album.cover_photo_url} />
      <div className="album-name">{album.name.toUpperCase()}</div>
      <div>{album.artist_name.toUpperCase()}</div>
    </div>
  );
};

export default Album;
