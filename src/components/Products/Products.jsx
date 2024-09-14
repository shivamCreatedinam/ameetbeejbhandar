import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";
import productData from '../../Products.json'
import product_img from '../../images/product.png'
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
        dispatch(addItemToCart(product));
        setIsCartOpen(!isCartOpen)

    };

    const slides = [
        { img: "https://dummyimage.com/600x400/000/7CFC00" },
        { img: "https://dummyimage.com/600x400/000/ccccc" },
        { img: "https://dummyimage.com/600x400/000/dddddd" },
        { img: "https://dummyimage.com/600x400/000/fff" },
        { img: "https://dummyimage.com/600x400/000/B22222" },
        { img: "https://dummyimage.com/600x400/000/7CFC00" },
        { img: "https://dummyimage.com/600x400/000/ccccc" },
        { img: "https://dummyimage.com/600x400/000/dddddd" },
        { img: "https://dummyimage.com/600x400/000/B22222" },
        { img: "https://dummyimage.com/600x400/000/7CFC00" }
    ];

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://aamitbeejbhandar.createdinam.com/admin/api/v1/products');
                setProducts(response.data.data.data);
                console.log(response.data.data.data)
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
   <div className="products">
            <h2>Our Top Products</h2>

            {loading ? (
                <p>Loading products...</p>
            ) : products.length > 0 ? (
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div key={index} style={{ margin: "0 10px" }}>
                            <Card className="main_card" style={{ marginRight: '1rem' }}>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img variant="top" src={product_img} className="card_img" />
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
            ) : (
                <p>No products found</p>
            )}
        </div>

         <div className="products2">

            {loading ? (
                <p>Loading products...</p>
            ) : products.length > 0 ? (
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div key={index} style={{ margin: "0 10px" }}>
                            <Card className="main_card" style={{ marginRight: '1rem' }}>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img variant="top" src={product_img} className="card_img" />
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
            ) : (
                <p>No products found</p>
            )}
        </div>

{/* cart */ }
{ isCartOpen && <div className="overlay" onClick={openCart}></div> }
<div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
    <Cart />
</div>
        </>
    );
};

