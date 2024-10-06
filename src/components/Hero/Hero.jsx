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
import { Link } from 'react-router-dom';

export const Hero = () => {
    const items = [
        { image: fertilizers, name: 'FERTILIZERS', id: 8 },
        { image: fungicides, name: 'FUNGICIDE', id: 6 },
        { image: herbicides, name: 'HERBICIDES', id: 3 },
        { image: plant, name: 'PLANT GROWTH REGULATOR', id: 7 },
        { image: insecticides, name: 'INSECTICIDES', id: 1 },
        { image: pesticides, name: 'PESTICIDES', id: 2 },
    ];

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
                            <Link to={`/shop/${item.id}`} style={{textDecoration: 'none' }}>
                            <img src={item.image} alt={item.name} className="carousel-image" />
                            </Link>
                            <h2>{item.name}</h2>
                        </div>
                      
                    ))}
                </div>
                <button className="nav_btn next" onClick={nextSlide}>
                    &#8250;
                </button>
            </div>

            <div className='services_section'>
                <div className='services'><i className="fa-solid fa-seedling"></i><p>OUR SERVICES</p></div>
                <h1>Echofy Provide Environment
                    Best Leading Services</h1>

                <div className='cards_container'>
                    <div className='card_items'>
                        <div className='icon_container'><i className="fa-solid fa-lightbulb"></i></div>
                        <h3>Solutions</h3>
                        <p>Offering Innovative & Eco-friendly Solutions</p>
                        <img src={Solutions}></img>
                    </div>
                    <div className='card_items'>
                        <div className='icon_container'><i className="fa-solid fa-lightbulb"></i></div>
                        <h3>Trusted</h3>
                        <p>Trusted by Thousands of Customers </p>
                        <img src={Trusted}></img>
                    </div>
                    <div className='card_items'>
                        <div className='icon_container'><i className="fa-solid fa-bolt-lightning"></i></div>
                        <h3>Production</h3>
                        <p>Increased Production, No Compromisation</p>
                        <img src={Production}></img>
                    </div>
                   
                </div>
            </div>
        </>
    );
};
