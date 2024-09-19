import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import bg1 from '../../images/bg1.jpg';
import bg2 from '../../images/bg2.jpg';
import { Cart } from '../Cart/Cart';
import { useAppSelector } from '../../Redux/hooks';
import { Link } from 'react-router-dom';
import productsData from '../../Products.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        stopAutoSlide();
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
        startAutoSlide()
    };

    // Next and Previous functions for swipe control
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };


    // cart and wish list sections

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)


    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const openWishlist = () => {
        setIsWishlistOpen(!isWishlistOpen)
    }

    const cartItems = useAppSelector((state) => state.cart.items);

    // initial products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');
                const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProducts(productArray);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    // search
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSearchProducts, setFilteredSearchProducts] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // console.log(products)
        const filtered = products.filter((product, index) =>
            // key={index}
            (product?.brand?.brand_name && product?.brand?.brand_name.toLowerCase().includes(query)) ||
            (product?.category?.category_name && product?.category?.category_name.toLowerCase().includes(query)) ||
            (product?.product_name && product?.product_name.toLowerCase().includes(query))
            // || (product["Technical Content"] && product["Technical Content"].toLowerCase().includes(query))
        );
        setFilteredSearchProducts(filtered);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };



    return (
        <>
            <header>
                <div className='second_nav'>
                    <Link to='/' className='brand'>Amit Beej Bhandar</Link>


                    <div className={`navigation ${isActive ? "navigation_active" : ""}`}>
                        <div className='navigation-items'>
                            <Link to='/'>Home</Link>
                            <Link to='/shop'>Explore</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/contact'>Contact</Link>
                            <div className='search_container header_bar'>
                            <Link to='/search'><input
                                    type='search'
                                    className='search_bar '
                                    placeholder='Search for products...'
                                />  </Link>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            
                            <div className='cusotmer_section'>
                                <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
                                {cartItems.length > 0 && (
                                    <div className={`cart_count`} onClick={openCart}>
                                        {cartItems.length}
                                    </div>
                                )}
                                <i className="fa-regular fa-heart" onClick={openWishlist}></i>
                                {cartItems.length > 0 && (
                                    <div className={`wish_count`} onClick={openWishlist}>
                                        0
                                    </div>
                                )}
                                <i className="fa-regular fa-user"></i>
                            </div>
                        </div>
                    </div>

                    <div className={`menu-btn ${isActive ? "menu_active" : ""}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
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
                            style={{ display: activeIndex === index ? 'block' : 'none' }}
                        />
                    ))}
                </div>
                <div className='content'>
                    <h1>Amit  <br /><span>Beej Bhandar</span></h1>
                    <p>Transforming Indian Agriculture with Innovative AgriTech Solutions!</p>
                    <Link to='/about'>Read More</Link>
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

            {isCartOpen && <div className="overlay" onClick={openCart}></div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>



        </>
    );
};
