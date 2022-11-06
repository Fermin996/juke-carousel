import React, { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel";
import MusicList from "./components/MusicList";

function App() {
  const [albumIndex, setAlbumIndex] = useState(2);
  const [selectedSong, setSelectedSong] = useState(null);
  const [listStyle, setListStyle] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      // gets favorites from local storage on app start up
      getFavorites();
      setIsMounted(true);
    }
  }, [isMounted]);

  function getFavorites() {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    setFavorites([...storedFavorites.favorites]);
  }

  return (
    <div className="App">
      <Carousel
        albumIndex={albumIndex}
        setAlbumIndex={setAlbumIndex}
        setSelectedSong={setSelectedSong}
        listStyle={listStyle}
        setListStyle={setListStyle}
      />
      <MusicList
        favorites={favorites}
        setFavorites={setFavorites}
        albumIndex={albumIndex}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        listStyle={listStyle}
        setListStyle={setListStyle}
      />
    </div>
  );
}

export default App;
