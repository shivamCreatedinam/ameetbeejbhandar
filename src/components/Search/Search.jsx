import React, { useState, useEffect } from 'react';
import './Search.css';
import { Cart } from '../Cart/Cart';
import { Footer } from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';


import axios from 'axios';
export const Search = () => {

    // State for menu button
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };


    // initial products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('https://amitbeejbhandar.in/admin/api/v1/products');
                const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProducts(productArray);
                // console.log(productArray)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    // Cart   
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)


    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const cartItems = useAppSelector((state) => state.cart.items);

    // adding items to cart
    const dispatch = useAppDispatch();

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
        setIsCartOpen(!isCartOpen)

    };

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
            || (product?.short_desc && product?.short_desc.toLowerCase().includes(query))
        );
        setFilteredSearchProducts(filtered);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const BaseURL = 'https://amitbeejbhandar.in/admin/public/storage/'

    return (
        <>
            <div className='shop_page about_us searchBg'>
                {/* header */}
                <div className='shop_nav'>
                    <Link to='/' className='shop_brand'>Amit Beej Bhandar</Link>
                </div>
                <div className="searchBar">
                    <input type="search"
                        className='searchBar_input'
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder='Search for products...' />
                </div>
            </div>
            {/* hero section */}
            <div className="hero">
                {filteredSearchProducts.length > 0 && <p className='foundProducts'>Found {filteredSearchProducts.length} products out of  {products.length}</p>}
                <div className='display'>
                    {filteredSearchProducts.length > 0 ? (
                        <table className='product-table'>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Brand Name</th>
                                    <th>Category Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSearchProducts.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                                <img
                                                    src={`${BaseURL}${product.image}`}
                                                    alt={product?.product_name}
                                                    className='product_img'
                                                    style={{ width: '150px', height: '150px' }}
                                                />
                                            </Link>
                                        </td>

                                        <td style={{ wordWrap: 'break-word', maxWidth: '200px' }}>
                                            {product?.product_name}
                                        </td>
                                        <td>{product?.brand?.brand_name}</td>
                                        <td>{product?.category?.category_name}</td>
                                        <td>₹ {product?.selling_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h3>🔍Start Searching to find relavent Products📦</h3>
                    )}
                </div>

            </div>
            {/* footer */}
            <Footer />
            {isCartOpen && <div className="overlay" onClick={openCart}>
            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    )
}
