import React, { useState, useEffect } from "react";
import './SliderComponent.css';

function Slider() 
{
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = ["/images/03_main/main_01.jpg", "/images/03_main/main_02.jpg", "/images/03_main/main_03.jpg"];
    const totalSlides = slides.length;

    const moveToNextSlide = () => { setCurrentSlide((prev) => (prev + 1) % totalSlides);                };
    const moveToPrevSlide = () => { setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);  };

    useEffect(() => 
    {
        const autoSlide = setInterval(moveToNextSlide, 3000);
        return () => clearInterval(autoSlide);
    }, []);

    return (        
        <div className="box_container">
            <div className="box_item box_slider">
                <div className="slider_track">
                    <img
                        src={slides[currentSlide]}
                        alt={`슬라이드 ${currentSlide + 1}`}
                        style={{ display: "block" }}
                    />
                    <button onClick={moveToPrevSlide} className="slider_arrow left">
                        &#10094;
                    </button>
                    <button onClick={moveToNextSlide} className="slider_arrow right">
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Slider;
