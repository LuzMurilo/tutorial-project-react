import { useState } from "react";
import "./styles.css";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  noOfStars?: number;
}

const StarRating = ({ noOfStars = 5 }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleMouseHouver = (index: number) => {
    setHover(index);
  };

  return (
    <div className="star-rating-container">
      <h3>Star Rating</h3>
      {[...Array(noOfStars)].map((_, index) => {
        index ++;

        return (
          <FaStar
            key={index}
            size={30}
            className={index <= (hover || rating) ? "star-active" : "star-inactive"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseHouver(index)}
            onMouseLeave={() => handleMouseHouver(0)}
          />
        );
      })}
      <h3>Hover: {hover}</h3>
      <h3>Rating: {rating}</h3>
    </div>
  );
};

export default StarRating;
