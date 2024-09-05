import { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

interface ImageSliderProps {
  url: string;
  page?: number;
  limit?: number;
}

interface ImageObject {
    id: number;
    download_url: string;
    author: string;
}

function ImageSlider({ url, page = 1, limit = 5 }: ImageSliderProps) {
  const [images, setImages] = useState<ImageObject[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl: string) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();
      setLoading(false);

      if (data) {
        setErrorMsg("");
        setImages(data);
      } else throw new Error("No data");

    } catch (error) {
      setLoading(false);
      if (typeof error === "string") {
        setErrorMsg(error.toUpperCase()); // works, `e` narrowed to string
      } else if (error instanceof Error) {
        setErrorMsg(error.message); // works, `e` narrowed to Error
      }
    }
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length-1 : currentSlide-1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length-1 ? 0 : currentSlide+1);
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (errorMsg !== "") {
    return <span color="red">{errorMsg}</span>;
  }

  if (!images || images.length == 0) {
    return <div>No images to show</div>
  }

  return <div className="slider-container">
    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handlePrevious}/>
    {
        images.map((imageItem, index) => 
            <img 
            key={imageItem.id}
            alt={imageItem.download_url}
            src={imageItem.download_url}
            className={currentSlide === index ? "image" : "image image-hidden"}
            />
        )
    }
    <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleNext}/>
    <span className="container-indicators">
      {
        images.map((_,index) => 
          <button 
            key={index} 
            className={currentSlide === index ? "indicator" : "indicator inactive-indicator"}
            onClick={() => setCurrentSlide(index)}>
          </button>
      )
      }
    </span>
  </div>;
}

export default ImageSlider;
