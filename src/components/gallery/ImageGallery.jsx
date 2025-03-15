import React, { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import { Button } from "../ui/button";
import axios from "axios";
import Search from "../search/Search";

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

let API_KEY = "VP29sp0n1JS84DgIhIwO35HLaMjxqWN9KAbNK8ByhU1hZOzgcIkD9ux3";
  const perPage = 15;

  const fetchImages = async (page) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`, {
        headers: { Authorization:  API_KEY },
      });

      setImages((prevImages) => [...prevImages, ...response.data.photos]);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };


   // Fetch search results
   const searchImage = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`,
        {
          headers: { Authorization: API_KEY },
        }
      );
      setImages(response.data.photos);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  // Function to download image directly
  const downloadImage = async (url, filename) => {
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
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} search={searchImage} />
      <div className="p-4 md:p-5 lg:p-20 xl:p-44">
        <Filter />
        <div className="columns-1 md:columns-2 xl:columns-3 gap-7">
          {images.map((image, index) => (
            <div key={index} className="relative group break-inside-avoid mb-8">
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer"
                src={image?.src.large2x}
                alt={image.photographer}
                onClick={() => setSelectedImage(image)}
              />

              <div className="absolute bottom-3 left-3 right-3 bg-black/60 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full" src={image.src.tiny} alt={image.photographer} />
                  <div className="text-sm">
                    <div className="font-medium">{image.photographer}</div>
                    <div className="text-xs text-gray-300">Pexels Contributor</div>
                  </div>
                </div>
                <div className="mt-2">
                  <Button
                    className="w-full bg-blue-600"
                    onClick={() => downloadImage(image.src.original, `pexels_${image.id}.jpg`)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5 cursor-pointer">
        <Button className="bg-blue-600" onClick={() => setCurrentPage((prev) => prev + 1)}>More</Button>
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative p-4">
            <img className="max-w-[90vw] max-h-[90vh] rounded-lg" src={selectedImage.src.large2x} alt="Preview" />
            <button
              className="absolute top-5 right-5 cursor-pointer text-white text-2xl bg-gray-800 px-3 py-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            
            <div className="mt-4 flex justify-center">
              <Button className="bg-blue-600 cursor-pointer" onClick={() => downloadImage(selectedImage.src.original, `pexels_${selectedImage.id}.jpg`)}>
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
