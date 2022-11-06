import React, { useState, useEffect } from "react";
import "../App.css";

const Song = ({
  song,
  selectedSong,
  songIndex,
  onClick,
  favorites,
  setFavorites,
  loading,
}) => {
  let { id, album_id, song_name, song_order, song_label, song_duration } = song;

  useEffect(() => {}, [favorites]);

  if (loading) {
    return <div></div>;
  }

  let isFavorite = !!favorites.find((favorite) => {
    return favorite[0] === album_id && favorite[1] === song_name;
  });

  function favoriteHandler() {
    //if not a favorite, selects as favorite, if favorited then unfavorites.
    //localStorage is updated in both cases
    if(isFavorite){
        let foundIndex = favorites.findIndex((favorite) => {
            return favorite[0] === album_id && favorite[1] === song_name;
        });

        favorites.splice(foundIndex, 1)

        localStorage.setItem(
            "favorites",
            JSON.stringify({ favorites: [...favorites] })
        );
        setFavorites([...favorites])
    }else{
        localStorage.setItem(
            "favorites",
            JSON.stringify({ favorites: [...favorites, [album_id, song_name]] })
        );
        setFavorites([...favorites, [album_id, song_name]]);  
    }

  }

  let starStyle = isFavorite ? "selected-star" : "star-color";
  return (
    <div
      onClick={onClick}
      className={songIndex === selectedSong ? "selected-song-div" : "song-div"}
    >
      <div className="left-song-itms">
        <div className="song-id">{songIndex + 1}</div>
        <div className="star-container" onClick={favoriteHandler}>
          <i className={`fa-solid fa-star ${starStyle}`}></i>
        </div>
        <div
          className={
            songIndex === selectedSong ? "selected-song-name" : "song-name"
          }
        >
          {song_name.toUpperCase()}
        </div>
        {song_label
          ? song_label.map((label, index) => {
              return (
                <div
                  key={index}
                  className={
                    songIndex === selectedSong ? "selected-label" : "label"
                  }
                >
                  {label.toUpperCase()}
                </div>
              );
            })
          : null}
      </div>
      <div className="song-duration-div">{song_duration}</div>
    </div>
  );
};

export default Song;
