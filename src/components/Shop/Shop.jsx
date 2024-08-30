import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import { useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import product_img from '../../images/product.png';
import { Footer } from '../Footer/Footer';
import productsData from '../../Products.json';
import { Cart } from '../Cart/Cart';
import { useAppSelector } from '../../Redux/hooks';

export const Shop = () => {
    // State for menu button
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const [isFilterSlider, setIsFilterSlider] = useState(false);

    const openFilters = () => {
        setIsFilterSlider(!isFilterSlider);
    };


    // State for selected category (set to "all" by default)
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Handle category change
    const handleCheckboxChange = (event) => {
        const { name } = event.target;
        setSelectedCategory(name); // Update selected category
        console.log('Selected:', name);
    };

    // Filter products based on the selected category
    const filteredProducts = selectedCategory === 'all'
        ? productsData
        : productsData.filter(product => product.Category.toLowerCase() === selectedCategory);




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

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
    };

    const cartItems = useAppSelector((state) => state.cart.items);

    return (
        <>
            <div className='shop_page'>
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
                            <div className='customer_section'>
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

            {/* shop */}
            <div className='products_container'>
                <div className={`products_left ${isFilterSlider ? 'mobile_filter_slider' : ''}`}>

                    <h2>Filters</h2>
                    <i className="fa-solid fa-xmark fa-lg" onClick={openFilters}></i>

                    <div className='select_categories'>
                        <label>
                            <input
                                type="radio"
                                name="all"
                                checked={selectedCategory === 'all'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '10px' }}
                            />
                            All Products
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="herbicides"
                                checked={selectedCategory === 'herbicides'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '10px' }}
                            />
                            Herbicides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="insecticides"
                                checked={selectedCategory === 'insecticides'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '10px' }}
                            />
                            Insecticides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="fungicides"
                                checked={selectedCategory === 'fungicides'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '10px' }}
                            />
                            Fungicides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="plant growth regulator"
                                checked={selectedCategory === 'plant growth regulator'}
                                onChange={handleCheckboxChange}
                                style={{ marginRight: '10px' }}
                            />
                            Plant Growth Regulator
                        </label>
                    </div>
                </div>

                {/* right side */}
                <div className='products_right'>
                    <div className='products_right_top'>
                        <p>Showing {filteredProducts.length} of {productsData.length} products</p>


                        <div className='display_style'>
                            <div className='filters' onClick={openFilters}><i class="fa-solid fa-filter"></i><p>Filters</p></div>
                            <select className='select_options'>
                                <option disabled selected value="Default Sorting">Default Sorting</option>
                                <option value="most_popular">Most Popular</option>
                                <option value="top_selling">Top Selling</option>
                                <option value="latest">Latest</option>
                                <option value="low_to_high">Price Low to High</option>
                                <option value="high_to_low">Price High to Low</option>
                            </select>
                            <div>
                                <i className="fa-solid fa-table-cells "></i>
                                <i className="fa-solid fa-list-ul"></i>
                            </div>
                        </div>
                    </div>

                    {/* filters */}
                    {/* <div className='products_right_middle'>
                        <p>Your Filters : </p>
                        <div className='filter_type'>
                        
                                        IF NEEDED

                        </div>
                </div> */}


                    {/* all products */}
                    {/* all products */}
                    <div className='products_right_container'>
                        {filteredProducts.map((product) => (

                            <div className='single_product' key={product.id}>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <img src={product_img} className='product_image' alt={product['Product Name']} />

                                    <h1>{product['Product Name']}</h1>
                                    <p>By: {product.Brand}</p>
                                    <p>Price: ₹XXX</p>
                                </Link>
                                <div className='product_options'>
                                    <button
                                        className='cart_btn'
                                        onClick={() => handleAddToCart(product)}
                                    >Add to Cart</button>
                                    <button className='buy'>Buy Now</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <Footer />


            {isCartOpen && <div className="overlay" onClick={openCart}>
                <div>jhbk</div>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>

        </>
    );
};
