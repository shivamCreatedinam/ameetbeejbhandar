import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../../Redux/hooks';
import '../AboutUS/AboutUS.css'
import { Cart } from '../Cart/Cart';
import contact from '../../images/contact_us_img.jpg'
import { Footer } from '../Footer/Footer';
import { Testimonials } from '../Testimonials/Testimonials';
import { Link } from 'react-router-dom';
import './Contact.css'
import MapComponent from '../Map';
import productsData from '../../Products.json';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Contact = () => {

    const position = [37.7749, -122.4194]; // Replace with your latitude and longitude

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

    // faqs
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces."
        },
        {
            question: "How do I use React?",
            answer: "You can use React by creating components and managing state."
        },
        {
            question: "What is JSX?",
            answer: "JSX is a syntax extension for JavaScript, used with React."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // initial products
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');
    //             const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
    //             setProducts(productArray);
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //     };

    //     fetchProducts();
    // }, []);

    const navigate = useNavigate();

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
                            <Link to='/'>Home</Link>
                            <Link to='/shop'>Explore</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/contact'>Contact</Link>
                            <div className='search_container'>
                            <Link to='/search'><input
                                    type='search'
                                    className='search_bar'
                                    placeholder='Search for products...'
                                />  </Link>
                                <i className="fa-solid fa-magnifying-glass"></i>

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
            <p className='contact_us_heading'>Contact Us</p>



            {/* Heor Section */}

            <div className='contact_us'>
                <div className='contact_us_top'>
                    <div className='top_left'>
                        <h3>Send a Message</h3>
                        <div className='top_left_form'>
                            <input type="text" placeholder='Your Name' className='form_input' />
                            <input type="text" placeholder='Email Address' className='form_input' />
                            <select name="" id="" className='form_input'>
                                <option value="" disabled selected>Interested in</option>
                                <option value="Bulk Orders">Bulk Orders</option>
                                <option value="Have some Questions">Have some Questions</option>
                                <option value="Other">Others</option>
                            </select>
                            <input type="text" placeholder='Mobile No.' className='form_input' />
                            <input type="text" placeholder='Message.' className='form_input message' />
                            <button className='send_msg'>Send </button>

                        </div>
                    </div>
                    <div className='top-right'>
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 88595 91451</p>
                        </div>
                        <div>
                            <h3>Visit Us</h3>
                            <p>Punjabi Pura, TP NAGAR, Meerut, UP India,  PIN - 250002</p>
                        </div>
                        <div>
                            <h3>Mail Us</h3>
                            <p>vibhorvashistha3@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className='map_section'>

                    <MapComponent />
                </div>

                <div className='faq_section'>
                    <div className='faq_left'>
                        <p>FAQ</p>
                        <h3>Frequently asked Questions.</h3>
                    </div>
                    <div className='faq_right'>
                        <h3>Questions we get asked.</h3>
                        <p>Here are some most asked questions from customers we get often.</p>
                        <div className=''>
                            <div className="faq-container">
                                {faqs.map((faq, index) => (
                                    <div className="faq-item" key={index}>
                                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                            {faq.question}
                                            <span className={`caret-icon ${openFAQ === index ? 'up' : 'down'}`}>
                                                {openFAQ === index ? '▲' : '▼'}
                                            </span>
                                        </div>
                                        <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                                            {faq.answer}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
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
