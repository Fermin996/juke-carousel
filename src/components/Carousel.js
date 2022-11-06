import React, { useEffect, useState } from "react";
import Album from "./Album";

const Carousel = ({
  albumIndex,
  setAlbumIndex,
  setSelectedSong,
  setListStyle,
  listStyle,
}) => {
  const [albums, setAlbums] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      getAlbums();
      setIsMounted(true);
    }
  }, [isMounted]);

  const getAlbums = async () => {
    let response = await fetch(process.env.REACT_APP_BACKEND_URL+"/albums");
    let albums = await response.json();

    albums.forEach((album, index) => {
      album.style = `album${index + 1}`;
    });

    setAlbums(albums);
  };

  function updateStyles(isLeft) {
    // changes each album style to the next style based on direction
    for (let x = 0; x < albums.length; x++) {
      let currStyle = albums[x].style;
      let albumStyleNum = parseInt(currStyle[currStyle.length - 1]);

      if (albums[x].style === (isLeft ? "album5" : "album1")) {
        currStyle = `album${isLeft ? 1 : 5}`;
        albums[x].style = currStyle;
      } else {
        currStyle = `album${albumStyleNum + (isLeft ? 1 : -1)}`;
        albums[x].style = currStyle;
      }
    }

    console.log(albums)
  }

  function updateIndex(isLeft) {
    //this updates the index corresponding to the songs of the centermost album 
    if (isLeft && albumIndex === 0) {
      setAlbumIndex(albums.length - 1);
    } else if (!isLeft && albumIndex === albums.length - 1) {
      setAlbumIndex(0);
    } else if (isLeft) {
      setAlbumIndex((albumIndex) => albumIndex - 1);
    } else if (!isLeft) {
      setAlbumIndex((albumIndex) => albumIndex + 1);
    }
  }

  const carouselButtonHandler = (direction) => {
    setSelectedSong(null);
    setListStyle("collapse-style");

    let isLeft = direction === "left";

    updateStyles(isLeft);
    updateIndex(isLeft);
    setAlbums(albums);
  };

  if (!albums) {
    return <div></div>;
  }

  return (
    <div className="carousel-div">
      <div
        onClick={() => carouselButtonHandler("left")}
        className="arrow-container-left"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      {albums.map((album, index) => {
        return <Album album={album} index={index} key={album.id} />;
      })}
      <div
        onClick={() => carouselButtonHandler("right")}
        className="arrow-container-right"
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
