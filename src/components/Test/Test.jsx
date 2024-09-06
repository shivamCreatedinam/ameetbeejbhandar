import React, { useState } from 'react'
import './Test.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../Redux/hooks';
import { Footer } from '../Footer/Footer';
import { Testimonials } from '../Testimonials/Testimonials';

export const Test = () => {

    // menu button
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };


    // cart
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)


    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const openWishlist = () => {
        setIsWishlistOpen(!isWishlistOpen)
    }

    const cartItems = useAppSelector((state) => state.cart.items);




    return (
        <>
            <div className='test_container'>
                <nav>
                    <div className='brand'>
                        <h1>Amit Beej Bhandar</h1>
                    </div>

                    <div className={`menu-btn ${isActive ? "menu_active" : ""}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                    </div>

                    <div className={`menu_items ${isActive && 'menu_items_active'} `}>
                        <div className='menu_items_inner'> 
                        <ul>
                        <Link to='/'>Home</Link>
                            <Link to='/shop'>Explore</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/contact'>Contact</Link>
                            <Link to='/shop'>Products</Link>
                        </ul>
                        <div className='search_container search_test'>
                            <input type="search" className='search_bar' /><i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className='cusotmer_section'>
                            <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
                            <div className='cart_count' onClick={openCart}>{cartItems.length}</div>
                            <i className="fa-regular fa-heart" onClick={openWishlist}></i>
                            <div className='wish_count' onClick={openWishlist}>0</div>
                            <i className="fa-regular fa-user"></i>
                        </div>
                        </div>
                    </div>
                </nav>
            </div>



            {/* other */}
            <Testimonials/>
            <Footer/>
        </>
    )
}
