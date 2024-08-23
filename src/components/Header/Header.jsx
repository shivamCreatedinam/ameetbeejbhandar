import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import bg1 from '../../images/bg1.jpg';
import bg2 from '../../images/bg2.jpg';

export const Header = () => {
    // menu button
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    // Slider state
    const [activeIndex, setActiveIndex] = useState(0);
    const slides = [bg1, bg2, bg1, bg2, bg1];
    const slideInterval = useRef(null);

    // Auto-slide functionality
    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [activeIndex]);

    const startAutoSlide = () => {
        slideInterval.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Auto slide every 3 seconds
    };

    const stopAutoSlide = () => {
        if (slideInterval.current) clearInterval(slideInterval.current);
    };

    // Swipe functionality
    const sliderRef = useRef(null);
    let startX = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide(); // Stop auto slide while swiping
        isSwiping = true;
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (diff > 50) {
            handleNext();
            isSwiping = false;
        } else if (diff < -50) {
            handlePrev();
            isSwiping = false;
        }
    };

    const handleTouchEnd = () => {
        isSwiping = false;
        startAutoSlide(); // Resume auto slide after swipe
    };

    // Next and Previous functions for swipe control
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <>
            <header>
            <div className='address'>
                    <div className='mail_phone'>
                        <div className='mail_phone_containers'><i class="fa-solid fa-location-dot"></i><p>Punjabi Pura, TP Nagar, Meerut, UP India</p></div>
                        <div className='mail_phone_containers'><i class="fa-solid fa-envelope"></i><p>vibhorvashistha3@gmail.com</p></div>
                    </div>
                    <div className='contact'>
                        <div className='contact_no'><i class="fa-solid fa-phone"></i><p>+91 88595 91451</p></div>
                        <div className='social'>
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-x-twitter"></i>
                        </div>
                    </div>
                    
                </div>
                {/* <hr  style={ {backgroundr: 'black'}}/> */}
                <div className='second_nav'>
                <a href='#' className='brand'>Travel</a>
                <div className={`menu-btn ${isActive ? "menu_active" : ""}`} onClick={handleClick}>
                    {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                </div>
                
                <div className={`navigation ${isActive ? "navigation_active" : ""}`}>
                    <div className='navigation-items'>
                        <a href='#'>Home</a>
                        <a href='#'>About</a>
                        <a href='#'>Explore</a>
                        <a href='#'>Gallery</a>
                        <a href='#'>Contact</a>
                        <div className='search_container'>
                            <input type="search" className='search_bar' /><i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                </div>
            </header>
           
            <section className='home'>
                <div
                    className="image-slides"
                    ref={sliderRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            className={`image_slide ${activeIndex === index ? 'active' : ''}`}
                            src={slide}
                            alt={`slide-${index}`}
                            style={{ display: activeIndex === index ? 'block' : 'none' }} // Only display the active slide
                        />
                    ))}
                </div>
                <div className='content'>
                    <h1>Wonderful. <br /><span>Island</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <a href='#'>Read More</a>
                </div>
                <div className='media-icons'>
                    <a href='#'><i className="fa-brands fa-facebook-f"></i></a>
                    <a href='#'><i className="fa-brands fa-instagram"></i></a>
                    <a href='#'><i className="fa-brands fa-x-twitter"></i></a>
                </div>
                <div className="slider-navigation">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`nav-btn ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        ></div>
                    ))}
                </div>
            </section>
        </>
    );
};
