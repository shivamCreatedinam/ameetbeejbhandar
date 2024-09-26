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
import { Link } from 'react-router-dom';
import product_img from '../../images/product.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Product_details = () => {

    const { productId } = useParams()

    const [product, setProduct] = useState([]);

    const BaseURL = 'https://aamitbeejbhandar.createdinam.com/admin/public/storage/'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');

                // Convert the product object into an array
                const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProduct(productArray.find((prod) => prod.id == productId));
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // setLoading(false);
            }
        };

        fetchData();
    }, [productId]);


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
        setIsCartOpen(!isCartOpen)

    };

    const cartItems = useAppSelector((state) => state.cart.items);


    //   take to the top
    useEffect(() => {

        window.scrollTo({ top: 0 });
    }, [productId]);

    // initial products
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

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


    // const handleProductClick = (clickedProductId) => {
    //     if (clickedProductId === productId) {
    //         setSearchQuery('');
    //     } else {
    //         setSearchQuery('');
    //         navigate(`/products/${clickedProductId}`);

    //     }
    // };


    return (
        <>
            <div className='products_page'>
                {/* header */}
                <div className='shop_nav'>
                    <a href='/' className='shop_brand'>Amit Beej Bhandar</a>
                    <div className={`menu-btn ${isActive ? 'menu_active' : ''}`} onClick={handleClick}>
                        {isActive ? <i className="fa-solid fa-xmark fa-lg"></i> : <i className="fa-solid fa-bars-staggered fa-lg"></i>}
                    </div>

                    <div className={`navigation ${isActive ? 'navigation_active' : ''}`}>
                        <div className='shop_navigation-items'>
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
                            <div className='customer_section products_customer_section'>
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

            <div className='products_details'>
                <div className='products_details_left'>
                    <img src={`${BaseURL}${product.image}`}></img>
                </div>
                <div className='products_details_right'>
                    <h1>{product?.product_name}</h1>
                    <p>By: {product?.brand?.brand_name} </p>
                    <p>Category -: {product?.category?.category_name} </p>
                    <p>Sub Category -: {product?.sub_category?.subcategory_name} </p>
                    <div>
                        <p className='product_price'>₹ XXX.XX</p>
                        ⭐⭐⭐⭐⭐ <p className='ratings'>550 Ratings</p>
                    </div>
                    <select className='select_options product_shop_options'>

                        <option value='size'>{product?.features}</option>
                    </select>
                    <div className='products_choice'>
                        <button className='products_choice_cart' onClick={handleAddToCart}>Add to Cart</button>
                        <Link to="/checkout">
                            <button className='products_choice_buy' onClick={handleAddToCart}>Buy Now</button>
                        </Link>

                    </div>
                </div>
            </div>


            {/* other components */}
            <Suggest_Products category={product?.category?.category_name} />
            <Footer />

            {isCartOpen && <div className="overlay" onClick={openCart}>

            </div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    )
}
