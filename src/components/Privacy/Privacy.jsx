import React, { useState } from 'react'
import '../Terms_Conditions/Terms_Conditions.css'
import { Footer } from '../Footer/Footer';
import { useAppSelector } from '../../Redux/hooks';
import { Cart } from '../Cart/Cart';
import { Link } from 'react-router-dom';
import productsData from '../../Products.json';
import { useNavigate } from 'react-router-dom';

export const Privacy = () => {
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

       // search
       const [searchQuery, setSearchQuery] = useState('');
       const [filteredProducts, setFilteredProducts] = useState([]);
       const navigate = useNavigate();
   
       const handleSearch = (e) => {
           const query = e.target.value.toLowerCase();
           setSearchQuery(query);
           // Filter products based on the search query
           const filtered = productsData.filter((product) =>
               product.Category.toLowerCase().includes(query.toLowerCase())
           );
   
           setFilteredProducts(filtered);
           
   
       };
   
       const handleProductClick = (productId) => {
           navigate(`/products/${productId}`);
       };
   
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
                            import React, { useState } from 'react'

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
                <h1 className='terms_condition_heading'>Privacy Policy</h1>
                <p>Thank you for visiting Amit Beej Bhandar. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our website and purchase agriculture products from us.</p>

 
                <h3>1. Information We Collect:</h3>
                <p>We collect personal information, including but not limited to your name, contact information, shipping address, and payment details, when you place an order on our website.</p>

                <h3>2. Use of Information:</h3>
                <p>  The information we collect is used for order processing, shipping, and customer support. <br />
                We may use your email address to send you updates about your order, promotions, and newsletters. You can opt out of promotional emails at any time.</p>

                <h3>3. Data Security:</h3>
                <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. <br />
                 Payment information is encrypted using secure socket layer technology (SSL) during transmission.</p>

                <h3>4. Cookies and Tracking Technologies:</h3>
                <p>We use cookies and similar tracking technologies to enhance your experience on our website and gather information about how you use it. You can manage your cookie preferences through your browser settings.</p>

                <h3>5. Third-Party Services:</h3>
                <p>We may use third-party services, such as payment processors and shipping companies, to facilitate our services. These third parties have their own privacy policies, and we encourage you to review them.</p>

                <h3>6. Data Retention:</h3>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

                <h3>7. Your Rights:</h3>
                <p>You have the right to access, correct, or delete your personal information. Contact us at [customer-support@amitbeejbhandar.com] to exercise these rights. <br />
                You can opt-out of receiving promotional emails by following the unsubscribe instructions provided in the emails.</p>

                <h3>8. Children's Privacy:</h3>
                <p> Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.</p>

                <h3>9. Changes to Privacy Policy:</h3>
                <p>We reserve the right to update this Privacy Policy at our discretion. Changes will be effective immediately upon posting on the website.</p>

                <h3>10. Contact Information:</h3>
                <p>For any questions or concerns regarding this Privacy Policy, please contact us at [customer-support@amitbeejbhandar.com].</p>

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
