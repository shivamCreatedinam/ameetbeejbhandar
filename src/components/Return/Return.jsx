import React, { useState } from 'react'
import '../Terms_Conditions/Terms_Conditions.css'
import { Footer } from '../Footer/Footer';
import { useAppSelector } from '../../Redux/hooks';
import { Cart } from '../Cart/Cart';
import { Link } from 'react-router-dom';
export const Return = () => {
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

            <div className='shop_page terms_condition'>
                {/* header */}
                <div className='shop_nav '>
                    <Link to='/' className='shop_brand'>Amit Beej Bhandar</Link>
                    <div className={`menu-btn ${isActive ? 'menu_active' : ''}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                    </div>

                    <div className={`navigation  ${isActive ? 'navigation_active' : ''}`}>
                        <div className='shop_navigation-items'>
                        <Link to='/'>Home</Link>
                            <Link to='/shop'>Explore</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/contact'>Contact</Link>
                            <Link to='/shop'>Products</Link>
                            <div className='search_container'>
                                <input type="search" className='search_bar' /><i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className='customer_section'>
                                <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
                                {cartItems.length > 0 && (
                                    <div className={`cart_count`} onClick={openCart}>
                                        {cartItems.length}
                                    </div>
                                )}
                                <i className="fa-regular fa-heart"></i>
                                {cartItems.length > 0 && (
                                    <div className={`wish_count`}>
                                       0
                                    </div>
                                )}
                                <i className="fa-regular fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}


            <div className='terms_condition_section'>
                <h1 className='terms_condition_heading'>Exchanges and Returns</h1>
                <p>Thank you for choosing Amit Beej Bhandar for your agriculture product needs. We strive to provide quality products and excellent customer service. Please read our return and refund policy carefully to understand your rights and obligations.</p>

 
                <h3>1. Returns:</h3>
                <p>We accept returns within 7 days of the delivery date. <br />
                To be eligible for a return, the product must be unused, in its original packaging, and in the same condition as received.</p>

                <h3>2. How to Initiate a Return:</h3>
                <p>To initiate a return, please contact our customer support at [support@amitbeejbhandar.com] with your order number, the item(s) you wish to return, and the reason for the return. <br />
                Our customer support team will provide you with instructions on how to return the item.</p>

                <h3>3. Refunds:</h3>
                <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund.<br />
                If approved, the refund will be processed to your original method of payment within 3 business days.</p>

                <h3>4. Return Shipping:</h3>
                <p>  Customers are responsible for the cost of return shipping, unless the return is due to a mistake on our part or a defective product.<br />
                We recommend using a trackable shipping service for your return.</p>

                <h3>5. Exchanges:</h3>
                <p>If you need to exchange a product for the same item due to a defect or damage, please contact our customer support.</p>

                <h3>6. Damaged or Defective Products:</h3>
                <p> In the rare event that you receive a damaged or defective product, please contact us immediately at [support@amitbeejbhandar.com]. We will arrange for a replacement or refund.</p>

                <h3>7. Non-Returnable Items:</h3>
                <p>Certain items, such as perishable goods, plants, and custom products, are non-returnable.</p>

                <h3>8. Cancellations:</h3>
                <p>You may cancel your order within 24 hours of purchase. Contact our customer support to request a cancellation.</p>

                <h3>9. Changes to Return & Refund Policy:</h3>
                <p> Amit Beej Bhandar reserves the right to update, modify, or replace any part of this Return & Refund Policy at its discretion. Changes will be effective immediately upon posting on the website.</p>

                <h3>10. Contact Information:</h3>
                <p>For any questions or concerns regarding returns and refunds, please contact us at [support@amitbeejbhandar.com].</p>

                <p>Thank you for choosing Amit Beej Bhandar. Happy farming!</p>
            </div>


            {/* footer */}
            <Footer />


            {/* cart */}
            {isCartOpen && <div className="overlay" onClick={openCart}>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    )
}
