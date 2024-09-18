import React, { useState, useEffect } from 'react'
import './Terms_Conditions.css'
import { Footer } from '../Footer/Footer';
import { useAppSelector } from '../../Redux/hooks';
import { Cart } from '../Cart/Cart';
import { Link } from 'react-router-dom';
import productsData from '../../Products.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Terms_Conditions = () => {
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
                            {/* <Link to='/shop'>Products</Link> */}
                            <div className='search_container'>
                                <input
                                    type='search'
                                    className='search_bar'
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder='Search for products...'
                                />
                                <i className="fa-solid fa-magnifying-glass"></i>

                                {/* Display suggestions if there is a search query */}
                                {searchQuery && (
                                    <ul className='suggestions'>
                                        {filteredSearchProducts.length ? (
                                            filteredSearchProducts.map((product) => (
                                                <li
                                                    key={product.index}
                                                    onClick={() => handleProductClick(product.id)}
                                                    className='suggestion_item'
                                                >
                                                    <span style={{fontWeight: 'bolder'}}>{product?.product_name} </span>by <span>
                                                    {product.brand.brand_name}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className='no_results'>No products found</li>
                                        )}
                                    </ul>
                                )}
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
                <h1 className='terms_condition_heading'> Terms and Conditions</h1>
                <p>Welcome to Amit Beej Bhandar! These Terms and Conditions outline the rules and regulations for the use of our website and the purchase of agriculture products. <br />
                    By accessing this website and/or making a purchase, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our website.</p>

                <h3>1. Products and Services:</h3>
                <p>Amit Beej Bhandar specializes in the sale of agriculture products. We make every effort to provide accurate product information, including descriptions, prices, and availability.</p>

                <h3>2. Ordering and Payment:</h3>
                <p> When placing an order, you agree that all information provided is accurate and complete. <br />
                    Payment is required at the time of order placement. We accept list of accepted payment methods.</p>

                <h3>3. Shipping:</h3>
                <p>Our Shipping Policy, available here, is an integral part of these Terms and Conditions. Please review it for information on order processing, shipping methods, and delivery.</p>

                <h3>4. Returns and Refunds:</h3>
                <p>Our Return Policy, available here, outlines the process for returns and refunds. By making a purchase, you agree to abide by these terms.</p>

                <h3>5. User Accounts:</h3>
                <p>To access certain features of our website, you may need to create a user account. You are responsible for maintaining the confidentiality of your account information.</p>

                <h3>6. Prohibited Activities:</h3>
                <p>You agree not to engage in any unlawful or prohibited activities, including but not limited to the unauthorized use of our website, interference with its operation, or any form of harassment.</p>

                <h3>7. Intellectual Property:</h3>
                <p>All content on Amit Beej Bhandar's website, including logos, images, text, and graphics, is the property of Amit Beej Bhandar and is protected by applicable intellectual property laws.</p>

                <h3>8. Limitation of Liability:</h3>
                <p>Amit Beej Bhandar shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our website or products.</p>

                <h3>9. Governing Law:</h3>
                <p>These Terms and Conditions are governed by and construed in accordance with the laws of Your Country/Region.</p>

                <h3>10. Changes to Terms and Conditions:</h3>
                <p>Amit Beej Bhandar reserves the right to update, modify, or replace any part of these Terms and Conditions at its discretion. Changes will be effective immediately upon posting on the website.</p>

                <h3>11. Contact Information:</h3>
                <p>For any questions or concerns regarding these Terms and Conditions, please contact us at customer-support@amitbeejbhandar.com.</p>

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
