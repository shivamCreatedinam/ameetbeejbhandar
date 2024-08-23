import React, { useState } from 'react';
import './Hero.css';
import fertilizers from '../../images/fertilizers.png';
import pesticides from '../../images/PESTICIDES.png';
import fungicides from '../../images/fungicides.png';
import herbicides from '../../images/HERBICIDES.png';
import plant from '../../images/PLANT.png';
import insecticides from '../../images/INSECTICIDES.png';
import Solutions from '../../images/solution.jpg';
import Trusted from '../../images/trusted.jpg';
import Production from '../../images/production.jpeg';

export const Hero = () => {
    const items = [
        { image: fertilizers, name: 'FERTILIZERS' },
        { image: fungicides, name: 'FUNGICIDE' },
        { image: herbicides, name: 'HERBICIDES' },
        { image: plant, name: 'PLANT GROWTH REGULATOR' },
        { image: insecticides, name: 'INSECTICIDES' },
        { image: pesticides, name: 'PESTICIDES' },
    ];

    // Duplicate items to create an infinite loop effect
    const extendedItems = [...items, ...items];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % extendedItems.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + extendedItems.length) % extendedItems.length
        );
    };

    return (
        <>
            <div className='categories'>
                <h1>Categories</h1>
            </div>
            <div className="carousel-container">
                <button className="nav_btn prev" onClick={prevSlide}>
                    &#8249;
                </button>
                <div
                    className="carousel-slide"
                    style={{ transform: `translateX(-${(currentIndex % items.length) * 25}%)` }}
                >
                    {extendedItems.map((item, index) => (
                        <div
                            key={index}
                            className="carousel-item"
                        >
                            <img src={item.image} alt={item.name} className="carousel-image" />
                            <h2>{item.name}</h2>
                        </div>
                    ))}
                </div>
                <button className="nav_btn next" onClick={nextSlide}>
                    &#8250;
                </button>
            </div>

            <div className='services_section'>
                <div className='services'><i class="fa-solid fa-seedling"></i><p>OUR SERVICES</p></div>
                <h1>Echofy Provide Environment
                    Best Leading Services</h1>

                <div className='cards_container'>
                    <div className='card_items'>
                        <div className='icon_container'><i class="fa-solid fa-lightbulb"></i></div>
                        <h3>Solutions</h3>
                        <p>Offering Innovative and Eco-friendly Solutions</p>
                        <img src={Solutions}></img>
                    </div>
                    <div className='card_items'>
                        <div className='icon_container'><i class="fa-solid fa-handshake-simple"></i></div>
                        <h3>Trusted</h3>
                        <p>Trusted by Thousands of Customers </p>
                        <img src={Trusted}></img>
                    </div>
                    <div className='card_items'>
                        <div className='icon_container'><i class="fa-solid fa-bolt-lightning"></i></div>
                        <h3>Production</h3>
                        <p>Increasing Production without compromising Quality</p>
                        <img src={Production}></img>
                    </div>
                   
                </div>
            </div>
        </>
    );
};
