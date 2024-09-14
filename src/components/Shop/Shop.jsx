import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import { useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import product_img from '../../images/product.png';
import { Footer } from '../Footer/Footer';
// import productsData from '../../Products.json';
import { Cart } from '../Cart/Cart';
import { useAppSelector } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [selectedCategory, setSelectedCategory] = useState('allCategories');
    const [selectedBrand, setSelectedBrand] = useState('allBrands');

    // Handle category change
    const handleCategoryChange = (event) => {
        const { name } = event.target;
        setSelectedCategory(name); // Update selected category
    };

    // Handle brand change
    const handleBrandChange = (event) => {
        const { name } = event.target;
        setSelectedBrand(name); // Update selected brand
    };

    // initial products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');
                setProducts(response.data.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the selected category and brand
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filterProducts = () => {
            const filtered = products.filter(product => {
                const categoryMatch = selectedCategory === 'allCategories' || product.category?.category_name === selectedCategory;
                const brandMatch = selectedBrand === 'allBrands' || product.brand?.brand_name === selectedBrand;
                return categoryMatch && brandMatch;
            });

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [selectedCategory, selectedBrand, products]);


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
        setIsCartOpen(!isCartOpen)

    };

    const cartItems = useAppSelector((state) => state.cart.items);


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
            (product?.brand?.brand_name &&product?.brand?.brand_name.toLowerCase().includes(query)) ||
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
            <div className='shop_page'>
                {/* header */}
                <div className='shop_nav'>
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
                                                    &emsp; {product?.product_name}  &emsp; by &emsp;
                                                    {product.Brand}
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

            {/* shop */}
            <div className='products_container'>
                <div className={`products_left ${isFilterSlider ? 'mobile_filter_slider' : ''}`}>

                    <h2 >Filters</h2>
                    <i className="fa-solid fa-xmark fa-lg" onClick={openFilters}></i>
                    <p className='filter_type'>By Categories</p>
                    <div className='select_categories'>
                        <label>
                            <input
                                type="radio"
                                name="allCategories"
                                checked={selectedCategory === 'allCategories'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            All Categories
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Pesticides"
                                checked={selectedCategory === 'Pesticides'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            Pesticides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Herbicides"
                                checked={selectedCategory === 'Herbicides'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            Herbicides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Insecticides"
                                checked={selectedCategory === 'Insecticides'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            Insecticides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Fungicides"
                                checked={selectedCategory === 'Fungicides'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            Fungicides
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Plant Growth Regulator"
                                checked={selectedCategory === 'Plant Growth Regulator'}
                                onChange={handleCategoryChange}
                                style={{ marginRight: '10px' }}
                            />
                            Plant Growth Regulator
                        </label>
                    </div>

                    <p className='filter_type'>By Brands</p>
                    <div className='select_categories'>
                        <label>
                            <input
                                type="radio"
                                name="allBrands"
                                checked={selectedBrand === 'allBrands'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            All Brands
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Atul"
                                checked={selectedBrand === 'Atul'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Atul
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Bharat Agrovet"
                                checked={selectedBrand === 'Bharat Agrovet'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Bharat Agrovet
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Bharat Chemicals"
                                checked={selectedBrand === 'Bharat Chemicals'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Bharat Chemicals
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Bhoomi Phosphate"
                                checked={selectedBrand === 'Bhoomi Phosphate'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Bhoomi Phosphate
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="CFCL"
                                checked={selectedBrand === 'CFCL'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            CFCL
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Chand Chap"
                                checked={selectedBrand === 'Chand Chap'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Chand Chap
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Cheminova"
                                checked={selectedBrand === 'Cheminova'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Cheminova
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Coramandal"
                                checked={selectedBrand === 'Coramandal'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Coramandal
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="GSP"
                                checked={selectedBrand === 'GSP'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            GSP
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="HURL"
                                checked={selectedBrand === 'HURL'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            HURL
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Jaishil"
                                checked={selectedBrand === 'Jaishil'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Jaishil
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Mono Magic"
                                checked={selectedBrand === 'Mono Magic'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Mono Magic
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="Hok Agrichem Pvt. Ltd."
                                checked={selectedBrand === 'Hok Agrichem Pvt. Ltd.'}
                                onChange={handleBrandChange}
                                style={{ marginRight: '10px' }}
                            />
                            Hok Agrichem Pvt. Ltd.
                        </label>

                    </div>
                </div>

                {/* right side */}
                <div className='products_right'>
                    <div className='products_right_top'>
                        <p>Showing {filteredProducts.length} of {products.length} products</p>


                        <div className='display_style'>
                            <div className='filters' onClick={openFilters}><i className="fa-solid fa-filter"></i><p>Filters</p></div>

                            <select className='select_options'>
                                <option disabled value="Default Sorting">Default Sorting</option>
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


                    {/* all products */}
                    <div className='products_right_container'>

                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (

                            <div className='single_product' key={product.id}>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <img src={product_img} className='product_image' alt={product['Product Name']} />

                                    <h1 style={{ wordWrap: 'break-word', maxWidth: '200px' }} >{product?.product_name}</h1>
                                    <p>By: {product?.brand?.brand_name}</p>
                                    <p>Price: ₹ {product?.selling_price}</p>
                                </Link>
                                <div className='product_options'>
                                    <button
                                        className='cart_btn'
                                        onClick={() => handleAddToCart(product)}
                                    >Add to Cart</button>
                                    <Link to="/checkout">
                                        <button className='buy' onClick={() => handleAddToCart(product)}>Buy Now</button>
                                    </Link>
                                </div>
                            </div>

                        )) : (
                            <h3>No Products Found in this filter...</h3>
                        )
                        }
                    </div>
                </div>
            </div>
            <Footer />


            {isCartOpen && <div className="overlay" onClick={openCart}>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>

        </>
    );
};
