import React, { useState, useEffect } from 'react'
import { useAppDispatch } from '../../Redux/hooks';
import { useAppSelector } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import { useParams } from 'react-router-dom';
import productsData from '../../Products.json';
import { Suggest_Products } from '../Suggest_Products/Suggest_Products';
import { Footer } from '../Footer/Footer';
import './Product_details.css'
import '../Shop/Shop.css';
import { Cart } from '../Cart/Cart';

import product_img from '../../images/product.png'
export const Product_details = () => {

    const { productId } = useParams()

    const findProduct = productsData.find((prod) => prod.id == productId);
    const product = findProduct;

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
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


    // adding items to cart
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart(product));
    };

    const cartItems = useAppSelector((state) => state.cart.items);


    //   take to the top
    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);


    return (
        <>
            <div className='products_page'>
                {/* header */}
                <div className='shop_nav'>
                    <a href='#' className='shop_brand'>Amit Beej Bhandar</a>
                    <div className={`menu-btn ${isActive ? 'menu_active' : ''}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                    </div>

                    <div className={`navigation ${isActive ? 'navigation_active' : ''}`}>
                        <div className='shop_navigation-items'>
                            <a href='#'>Home</a>
                            <a href='#'>About</a>
                            <a href='#'>Explore</a>
                            <a href='#'>Gallery</a>
                            <a href='#'>Contact</a>
                            <div className='search_container'>
                                <input type="search" className='search_bar' /><i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='customer_section products_customer_section'>
                                <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
                                <div className='cart_count' onClick={openCart}>{cartItems.length}</div>
                                <i className="fa-regular fa-heart" onClick={openWishlist}></i>
                                <div className='wish_count' onClick={openWishlist}>{cartItems.length}</div>
                                <i className="fa-regular fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='products_details'>
                <div className='products_details_left'>
                    <img src={product_img}></img>
                    <div> images collections goes here</div>
                </div>
                <div className='products_details_right'>
                    <h1>{findProduct['Product Name']}</h1>
                    <p>By: {findProduct.Brand} </p>
                    <p>{findProduct['Technical Content']} </p>
                    <div>
                        <p className='product_price'>₹ XXX.XX</p>
                        ⭐⭐⭐⭐⭐ <p className='ratings'>550 Ratings</p>
                    </div>
                    <select className='select_options product_shop_options'>
                        {/* <option disabled selected value="Default Sorting">Default Sorting</option> */}
                        <option value={findProduct.Size}>{findProduct.Size}</option>
                    </select>
                    <div className='products_choice'>
                    <button className='products_choice_cart' onClick={handleAddToCart}>Add to Cart</button>
                    <button className='products_choice_buy'>Buy Now</button>
                    </div>
                </div>
            </div>


            {/* other components */}
            <Suggest_Products category={findProduct.Category} />
            <Footer />

            {isCartOpen && <div className="overlay" onClick={openCart}>
                <div>jhbk</div>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    )
}
