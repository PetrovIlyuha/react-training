import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import Hero from "./hero.jpg";

const UNSPLASH_TOKEN = "Jk531kHYaYxUyr6r1rjfPPGuT76tpguS6YyJarIXV2M";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getPhotos = useCallback(() => {
    let apiUrl = `https://api.unsplash.com/photos?`;
    if (searchTerm)
      apiUrl = `https://api.unsplash.com/search/photos?&query=${searchTerm}`;
    apiUrl += `&client_id=${UNSPLASH_TOKEN}`;
    apiUrl += `&page=${page}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromAPI = data.results ?? data;
        if (page === 1) setPhotos(imagesFromAPI);
        setPhotos((photos) => [...photos, ...imagesFromAPI]);
      });
  }, [page, searchTerm]);

  useEffect(() => {
    setLoading(true);
    getPhotos();
    setLoading(false);
  }, [page, getPhotos]);

  if (loading || !photos) {
    return <h2>Loading...</h2>;
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const searchPhotos = (e) => {
    e.preventDefault();
    setPage(1);
    getPhotos();
  };
  return (
    <div className="app">
      {!loading && photos.length > 0 && (
        <div
          className="hero_section"
          style={{
            background: `url(${
              photos[Math.floor(Math.random() * 10)].urls.regular || Hero
            })`,
          }}
        >
          <h1>Quick Perspective</h1>
          <form onSubmit={searchPhotos}>
            <input
              type="text"
              placeholder="Search Unsplash..."
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <button>Search</button>
          </form>
        </div>
      )}
      <InfiniteScroll
        dataLength={photos.length} //This is important field to render the next data
        next={() => {
          setPage((page) => page + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {
          <div className="image-grid">
            {photos &&
              photos.map((photo) => (
                <div className="image" key={Math.random() * 2000000}>
                  <a
                    href={photo.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={photo.urls.small} alt={photo.alt_description} />
                  </a>
                </div>
              ))}
          </div>
        }
      </InfiniteScroll>
    </div>
  );
}
