import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";
import productData from '../../Products.json'
import product_img from '../../images/default.png'
import { useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import { Link } from "react-router-dom";
import { Cart } from '../Cart/Cart';
import axios from 'axios'
export const Products = () => {

    // adding items to cart
    const dispatch = useAppDispatch();

    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddToCart = (product) => {
        const defaultVariant = product.variants[0];


        const payload = {
            id: product.id,
            variantId: defaultVariant.id,
            variantName: defaultVariant.variant_name,
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


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    // fetching products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const BaseURL = 'https://amitbeejbhandar.in/admin/public/storage/'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://amitbeejbhandar.in/admin/api/v1/products');
                // const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProducts(response.data.data.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [products2, setProducts2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://amitbeejbhandar.in/admin/api/v1/products', {
                    page_no: 2,
                });
                // const productArray = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);
                setProducts2(response.data.data.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <p className="loading_text">Loading products...</p>
            ) : products.length > 0 && (
                <div className="products">
                    <h2>Our Top Products</h2>

                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={index} style={{ margin: "0 10px" }}>
                                <Card className="main_card" style={{ marginRight: '1rem' }}>
                                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card.Img variant="top" src={product?.image ? `${BaseURL}${product.image}` : product_img } className="card_img" />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className="product_name">{product.product_name}</Card.Title>
                                        <p>{product.category.category_name}</p>
                                        <Card.Text className="product_info">
                                            {product["Technical Content"]}
                                        </Card.Text>
                                        <div className="product-actions">
                                            <Link to="/checkout">
                                                <button className="primary" onClick={() => handleAddToCart(product)}>Buy</button>
                                            </Link>
                                            <button className="secondary" onClick={() => handleAddToCart(product)}>Cart</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {loading ? (
                <p className="loading_text">Loading products...</p>
            ) : products.length > 0 && (
                <div className="products2">
                    <h2>Our Top Products</h2>

                    <Slider {...settings}>
                        {products2.map((product, index) => (
                            <div key={index} style={{ margin: "0 10px" }}>
                                <Card className="main_card" style={{ marginRight: '1rem' }}>
                                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card.Img variant="top" src={product?.image ? `${BaseURL}${product?.image}` : product_img} className="card_img" />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className="product_name">{product.product_name}</Card.Title>
                                        <p>{product.category.category_name}</p>
                                        <Card.Text className="product_info">
                                            {product["Technical Content"]}
                                        </Card.Text>
                                        <div className="product-actions">
                                            <Link to="/checkout">
                                                <button className="primary" onClick={() => handleAddToCart(product)}>Buy</button>
                                            </Link>
                                            <button className="secondary" onClick={() => handleAddToCart(product)}>Cart</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* cart */}
            {isCartOpen && <div className="overlay" onClick={openCart}></div>}
            <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                <Cart />
            </div>
        </>
    );
};

