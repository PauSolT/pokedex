import React, { useState } from 'react';

function Carousel ({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide}>Previous</button>
      <div className="slide-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            {item}
            {console.log(item)}
          </div>
        ))}
      </div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;