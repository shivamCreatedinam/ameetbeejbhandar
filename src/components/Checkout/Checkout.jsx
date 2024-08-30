import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { incrementQuantity, decrementQuantity } from '../../Redux/slices/cartslice';
import './Checkout.css';
import product_img from '../../images/product.png';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const [quote, setQuote] = useState()
    const navigate = useNavigate();

    return (
        <>
            <div className='cart_items'>
                <button className='back_home' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}><i class="fa-solid fa-arrow-left"></i> Back to Home</button>
                <h1 className='cart_heading'>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className='cart_items_inner'>
                        {cartItems.map((item, index) => (
                            <div key={index} className='cart_items_inner_section'>
                                <div className='cart_item_img'>
                                    <img src={product_img} alt={item['Product Name']} />
                                </div>
                                <div>
                                    <h2>{item['Product Name']}</h2>
                                    <p>Brand: {item.Brand}</p>
                                    <p>Price: ₹{item.Price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className='counting'>
                                    <i className="fa-solid fa-plus" onClick={() => dispatch(incrementQuantity(item.id))}></i>
                                    <p>{item.quantity}</p>
                                    <i className="fa-solid fa-minus" onClick={() => dispatch(decrementQuantity(item.id))}></i>
                                </div>
                            </div>
                        ))}
                        <div className='quote_container'>
                            <h3>Send a Quote</h3>
                            <form>
                                <input type='number' onChange={(e) => setQuote(e.target.value)} className='quote_input'  placeholder='₹' value={quote}/>
                            </form>
                        </div>

                        <Link>
                            <button className='checkout_button'>Send Quote</button>
                        </Link>
                    </div>

                )}


            </div>
        </>
    );
};
