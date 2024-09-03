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

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(images);

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
    <BsArrowLeftCircleFill className="arrow arrow-left" />
    {
        images.map((imageItem) => {
            return <img 
            key={imageItem.id}
            alt={imageItem.download_url}
            src={imageItem.download_url}
            className="current-image"
            />
        })
    }
    <BsArrowRightCircleFill className="arrow arrow-right" />
  </div>;
}

export default ImageSlider;
