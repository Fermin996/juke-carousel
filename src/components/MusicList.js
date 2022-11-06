import React, { useEffect, useState } from "react";
import Song from "./Song";

const MusicList = ({
  albumIndex,
  selectedSong,
  setSelectedSong,
  listStyle,
  setListStyle,
  favorites,
  setFavorites,
}) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSongs();

    // use setTimeOut to reset the song list class, resulting in the collapse animation expanding again
    setTimeout(handleStyle, 500);
  }, [albumIndex]);

  function handleStyle() {
    setListStyle("");
  }

  const getSongs = async () => {
    setLoading(true);
    let response = await fetch(process.env.REACT_APP_BACKEND_URL+`/songs/${albumIndex + 1}`);
    let songs = await response.json();
    setSongs(songs);
    setLoading(false);
  };

  function songClickedHandler(index) {
    if (index === selectedSong) {
      setSelectedSong(null);
    } else {
      setSelectedSong(index);
    }
  }

  return (
    <div className={"music-list-div " + listStyle}>
      {songs.length > 0
        ? songs.map((song, index) => {
            return (
              <Song
                favorites={favorites}
                setFavorites={setFavorites}
                song={song}
                key={index}
                selectedSong={selectedSong}
                songIndex={songs.indexOf(song)}
                loading={loading}
                onClick={() => songClickedHandler(songs.indexOf(song))}
              />
            );
          })
        : null}
    </div>
  );
};

export default MusicList;
