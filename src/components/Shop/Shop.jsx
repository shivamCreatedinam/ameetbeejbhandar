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
import { useParams } from 'react-router-dom';

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

    const [price, setPrice] = useState(2000);

    // State for selected category (set to "all" by default)
    const [selectedCategory, setSelectedCategory] = useState('allCategories');
    const [selectedBrand, setSelectedBrand] = useState('allBrands');

    // Get category from URL params
    const { category } = useParams(); // Destructure category from useParams()

    // Update selectedCategory when the category changes in the URL
    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        } else {
            setSelectedCategory('allCategories');
        }
    }, [category]); // This will run when the category changes


    // Handle category change
    const handleCategoryChange = (event) => {
        const { name } = event.target;
        setSelectedCategory(name); // Update selected category
    };

    // Handle brand change
    const handleBrandChange = (event) => {
        const { name } = event.target;
        setSelectedBrand(name);
    };

    // initial products
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');
                const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProducts(productArray);
                // console.log(productArray)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    //intial categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://aamitbeejbhandar.createdinam.com/admin/api/v1/category-list');
                setCategories(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
    }, []);


    //intial brands
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://aamitbeejbhandar.createdinam.com/admin/api/v1/brand-list');
                setBrands(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
    }, []);


    // Filter products based on the selected category and brand
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filterProducts = () => {
            const filtered = products.filter(product => {
                const categoryMatch = selectedCategory === 'allCategories' || product.category?.category_name === selectedCategory;
                const brandMatch = selectedBrand === 'allBrands' || product.brand?.brand_name === selectedBrand;
                const priceMatch = product?.variants[0]?.selling_price >= 0 && product?.variants[0]?.selling_price <= price;
                return categoryMatch && brandMatch && priceMatch;

            });

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [selectedCategory, selectedBrand, products, price]);


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
        const defaultVariant = product.variants[0];

        const payload = {
            id: product.id,
            variantId: defaultVariant.id,
            variantName: defaultVariant.variant_name + defaultVariant.unit,
            product_name: product.product_name,
            image: product.image,
            brand: product.brand,
            category: product.category.category_name,
            price: defaultVariant.selling_price,
            stock: defaultVariant.total_stock
        };

        dispatch(addItemToCart(payload));
        setIsCartOpen(!isCartOpen);
    };
    const cartItems = useAppSelector((state) => state.cart.items);

    const navigate = useNavigate();

    // // search
    // const [searchQuery, setSearchQuery] = useState('');
    // const [filteredSearchProducts, setFilteredSearchProducts] = useState([]);

    // const handleSearch = (e) => {
    //     const query = e.target.value.toLowerCase();
    //     setSearchQuery(query);

    //     // console.log(products)
    //     const filtered = products.filter((product, index) =>
    //         // key={index}
    //         (product?.brand?.brand_name && product?.brand?.brand_name.toLowerCase().includes(query)) ||
    //         (product?.category?.category_name && product?.category?.category_name.toLowerCase().includes(query)) ||
    //         (product?.product_name && product?.product_name.toLowerCase().includes(query))
    //         // || (product["Technical Content"] && product["Technical Content"].toLowerCase().includes(query))
    //     );
    //     setFilteredSearchProducts(filtered);
    // };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const BaseURL = 'https://aamitbeejbhandar.createdinam.com/admin/public/storage/'

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
                            <div className='search_container'>
                                <Link to='/search'><input
                                    type='search'
                                    className='search_bar'
                                    // value={searchQuery}
                                    // onChange={handleSearch}
                                    placeholder='Search for products...'
                                />  </Link>


                                <i className="fa-solid fa-magnifying-glass"></i>

                                {/* Display suggestions if there is a search query */}
                                {/* {searchQuery && (
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
                                )} */}
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
                    <p className='filter_type'>By Price</p>
                    <p className='above_price'>Show Below : ₹ {price}.00</p>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        value={price}
                        o onChange={(e) => setPrice(Number(e.target.value))}
                        style={{ width: '300px' }}
                    />
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




                        {
                            categories.map((item, index) => {
                                return (
                                    <label>
                                        <input
                                            type="radio"
                                            name={item.category_name}
                                            checked={selectedCategory === item.category_name}
                                            onChange={handleCategoryChange}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {item.category_name}
                                    </label>
                                )
                            })
                        }
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

                        {
                            brands.map((item, index) => {
                                return (
                                    <label>
                                        <input
                                            type="radio"
                                            name={item.brand_name}
                                            checked={selectedBrand === item.brand_name}
                                            onChange={handleBrandChange}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {item.brand_name}
                                    </label>
                                )
                            })
                        }
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
                                    <img src={`${BaseURL}${product.image}`} className='product_image' alt={product['Product Name']} />

                                    <h1 style={{ wordWrap: 'break-word', maxWidth: '200px' }} >{product?.product_name}</h1>
                                    <p>By: {product?.brand?.brand_name}</p>
                                    <p>Category: {product?.category?.category_name}</p>
                                    <p>Price: ₹ {product?.variants[0]?.selling_price}</p>
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
