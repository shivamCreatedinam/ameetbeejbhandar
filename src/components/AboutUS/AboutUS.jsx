import React, { useState } from 'react'
import { useAppSelector } from '../../Redux/hooks';
import './AboutUS.css'
import { Cart } from '../Cart/Cart';
import member from '../../images/member.png';
import tick from '../../images/tick.png';
import award from '../../images/award.png';
import rating from '../../images/rating.png';
import contact from '../../images/contact_us_img.jpg'
import { Footer } from '../Footer/Footer';
import { Testimonials } from '../Testimonials/Testimonials';
import { Link } from 'react-router-dom';

export const AboutUS = () => {

    // State for menu button
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const [isFilterSlider, setIsFilterSlider] = useState(false);

    const openFilters = () => {
        setIsFilterSlider(!isFilterSlider);
    };

    // cart and wish list sections

    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const cartItems = useAppSelector((state) => state.cart.items);


    return (
        <>
              <div className='shop_page about_us'>
                {/* header */}
                <div className='shop_nav '>
                    <Link to='/' className='shop_brand'>Amit Beej Bhandar</Link>
                    <div className={`menu-btn ${isActive ? 'menu_active' : ''}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                    </div>

                    <div className={`navigation  ${isActive ? 'navigation_active' : ''}`}>
                        <div className='shop_navigation-items '>
                            <a href='/'>Home</a>
                            <a href='/about'>About</a>
                            <a href='/shop'>Explore</a>
                            <a href='#'>Gallery</a>
                            <a href='#'>Contact</a>
                            <div className='search_container'>
                                <input type="search" className='search_bar' /><i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='customer_section'>
                                <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
                                <div className='cart_count' onClick={openCart}>{cartItems.length}</div>
                                <i className="fa-regular fa-heart" ></i>
                                <div className='wish_count' >{cartItems.length}</div>
                                <i className="fa-regular fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Heor Section */}
            <div className='about_us_section'>
                <h3 className='about_us_heading'>About Us</h3>
                <p>Welcome to Amit Beej Bhandar, your trusted partner in sourcing high-quality agricultural seeds and related products. At Amit Beej Bhandar, we are dedicated to providing farmers, gardeners, and agricultural enthusiasts with a comprehensive range of seeds and agricultural products to enhance crop yield and nurture thriving harvests.</p>



            </div>

            <div className='cutomer_counts'>
                <div className='customer_counts_container'><img src={member} /><h2>100+</h2><p>Team Member</p></div>
                <div className='customer_counts_container'><img src={member} /><h2>960+</h2><p>Complete Works</p></div>
                <div className='customer_counts_container'><img src={member} /><h2>38</h2><p>Award Winning</p></div>
                <div className='customer_counts_container'><img src={member} /><h2>4.7</h2><p>Avg Rating</p></div>
            </div>

            <div className='about_contact'>
                <div className='about_contact_left'><img src={contact} alt=""  className='contact_img'/></div>
                <div className='about_contact_right'>
                <div className='skills_heading'><i className="fa-solid fa-seedling"></i><p>OUR MISSION</p></div>
                <p className='about_heading'>Fresh Environmental <br />  Plant & Safe Trees</p>
                <p className='about_mission_para'>At Amit Beej Bhandar, our mission is to empower farmers and agricultural professionals with premium-quality seeds and agricultural products that drive success and prosperity in farming endeavors. We aim to be the go-to destination for all your seed and agricultural needs, offering a diverse selection of products tailored to meet your specific requirements.</p>
              <div className='about_right'>  <button><p>Contact Us</p>  <i className="fa-solid fa-leaf"></i></button>
              </div>
                </div>
                
            </div>
           <Testimonials/>
            <Footer/>

            {/* cart */}
            {isCartOpen && <div className="overlay" onClick={openCart}>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    )
}
