import React, { useState } from 'react'
import '../Terms_Conditions/Terms_Conditions.css'
import { Footer } from '../Footer/Footer';
import { useAppSelector } from '../../Redux/hooks';
import { Cart } from '../Cart/Cart';
import { Link } from 'react-router-dom';
export const Shipping = () => {
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
                <h1 className='terms_condition_heading'>Shipping</h1>
                <p>Thank you for choosing Amit Beej Bhandar for your agriculture product needs. Please review our shipping policy to understand how we handle the shipment of your orders.</p>

 
                <h3>1. Processing Time:</h3>
                <p>All orders are processed within 1-2 business days after payment confirmation. <br />
                Orders placed on weekends or public holidays will be processed on the next business day.</p>

                <h3>2. Shipping Methods:</h3>
                <p>  We offer standard and expedited shipping options for our customers. <br />
                Shipping costs and estimated delivery times will be calculated at checkout based on your location and chosen shipping method.</p>

                <h3>3. Shipping Destinations:</h3>
                <p>We currently ship within [List of countries or regions where you ship]. <br />
                For international orders, customers are responsible for any customs duties or taxes imposed by their respective countries.</p>

                <h3>4. Order Tracking:</h3>
                <p>Once your order is shipped, you will receive a confirmation email with a tracking number. <br />
                Use the provided tracking number to monitor the status and location of your shipment.</p>

                <h3>5. Delayed Shipments:</h3>
                <p>In the event of unexpected delays due to factors beyond our control, we will notify you promptly. <br />
                We are not liable for delays caused by natural disasters, customs processes, or other unforeseen circumstances.</p>

                <h3>6. Shipping Rates:</h3>
                <p>Shipping rates are based on the weight of the products, the shipping method chosen, and the destination. <br />
                Free shipping may be available for orders exceeding a certain amount. Check our website for current promotions.</p>

                <h3>7. Address Accuracy:</h3>
                <p>Customers are responsible for providing accurate shipping information. Ensure your shipping address is complete and correct to avoid delivery issues.<br />
                We are not responsible for lost or delayed shipments due to incorrect addresses provided by customers.</p>

                <h3>8. Returns and Refunds:</h3>
                <p>Refer to our Return Policy for information on returning products and requesting refunds.</p>

                <h3>9. Contact Information:</h3>
                <p>If you have any questions or concerns regarding your shipment, please contact our customer support at [customer-support@amitbeejbhandar.com].</p>

                <h3>10. Contact Information:</h3>
                <p>For any questions or concerns regarding this Privacy Policy, please contact us at [customer-support@amitbeejbhandar.com].</p>

                <p>We appreciate your trust in Amit Beej Bhandar. Happy farming!</p>
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
