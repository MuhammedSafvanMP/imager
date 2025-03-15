import React, { useEffect, useState, useRef } from "react";
import Filter from "../filter/Filter";
import { Button } from "../ui/button";
import axios from "axios";
import Search from "../search/Search";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const videoRefs = useRef({});

  const perPage = 15;
let API_KEY = "VP29sp0n1JS84DgIhIwO35HLaMjxqWN9KAbNK8ByhU1hZOzgcIkD9ux3";

  // Fetch popular videos
  const fetchVideos = async (page) => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/videos/popular?page=${page}&per_page=${perPage}`,
        {
          headers: { Authorization: API_KEY },
        }
      );
      setVideos((prevVideos) =>
        page === 1 ? response?.data.videos : [...prevVideos, ...response.data.videos]
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Fetch search results
  const searchVideos = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await axios.get(
        `https://api.pexels.com/videos/search?query=${searchTerm}&page=1&per_page=${perPage}`,
        {
          headers: { Authorization:  API_KEY },
        }
      );
      setVideos(response.data.videos); 
      setCurrentPage(1); 
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  useEffect(() => {
    return () => {
      videoRefs.current = {};
    };
  }, []);

  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].play();
    }
  };

  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0; 
    }
  };

  const downloadVideo = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
     
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={searchVideos} />

      <div className="p-4 md:p-5 lg:p-20 xl:p-44">
       
        <Filter />

      
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => handleMouseEnter(vid.id)}
              onMouseLeave={() => handleMouseLeave(vid.id)}
            >
          
              <video
                ref={(el) => (videoRefs.current[vid.id] = el)}
                className="w-full h-full object-cover rounded-lg"
                src={vid.video_files[0].link}
                muted
                playsInline
                controls={selectedVideo === vid.id}
                onClick={() => setSelectedVideo(vid.id)}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-center gap-3 mb-3">
                  {vid.user?.image && (
                    <img className="w-10 h-10 rounded-full border border-white" src={vid.user?.image} alt={vid.user.name} />
                  )}
                  <div className="text-sm text-white">
                    <div className="font-semibold">{vid.user?.name || "Unknown Creator"}</div>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => downloadVideo(vid.video_files[0].link, `pexels_${vid.id}.mp4`)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrentPage((prev) => prev + 1)}>
          Load More
        </Button>
      </div>
    </>
  );
}
