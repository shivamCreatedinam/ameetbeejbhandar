import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import './Suggest_Products.css'
import product_img from '../../images/product.png'
import productsData from '../../Products.json'
export const Suggest_Products = (category) => {



    // adding items to cart
    const dispatch = useAppDispatch();

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
    };



    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    // console.log(category.category)
    const filteredProducts = productsData.filter(product => product.Category == category.category);
    console.log(filteredProducts)
    return (
        <>
            <div>
                <h1 className='suggestion_heading'>You May also like these Products</h1>
                <div className='suggestion_container'>
                    <div className='products_right_container'>

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (

                                <div key={index} className='single_product'>
                                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', }}>
                                        <img src={product_img} className='product_image' alt="Product" />
                                        <h1>{product['Product Name']}</h1>
                                        <p>By: {product.Brand}</p>
                                        <p>Price: ₹XXX</p>
                                    </Link>
                                    <div className='product_options'>
                                        <button className='cart_btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                        <Link to="/checkout">
                                            <button className='buy' onClick={() => handleAddToCart(product)}>Buy Now</button>
                                        </Link>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <p>No products available in this category.</p>
                        )}

                    </div>
                </div>
            </div>


        </>
    )
}
