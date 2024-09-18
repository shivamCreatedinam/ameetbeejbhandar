import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { incrementQuantity, decrementQuantity, updateQuantity } from '../../Redux/slices/cartslice';
import './Cart.css';
import product_img from '../../images/product.png';

export const Cart = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const BaseURL = 'https://aamitbeejbhandar.createdinam.com/admin/public/storage/'

    return (
        <>
            <div className='cart_items'>
                <h1 className='cart_heading'>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className='cart_items_inner'>
                        {cartItems.map((item, index) => (
                            <>
                            <div key={index} className='cart_items_inner_section'>
                                <div className='cart_item_img'>
                                    <img src={`${BaseURL}${item.image}`} alt={item['Product Name']} />
                                </div>
                                <div>
                                    <h3>{item?.product_name}</h3>
                                    <p><span style={{fontWeight: 'bold'}}>By: </span> {item?.brand?.brand_name}</p>
                                    <p><span style={{fontWeight: 'bold'}}>Quantity: </span> {item.quantity}</p>
                                </div>
                            </div>
                            <div className='counting'>
                                    <i className="fa-solid fa-plus" onClick={() => dispatch(incrementQuantity(item.id))}></i>
                                    <input
                                        className='input_quantity'
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = Number(e.target.value)
                                            if (newQuantity >= 0) {
                                                dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
                                            }
                                        }}
                                    />
                                    <i className="fa-solid fa-minus" onClick={() => dispatch(decrementQuantity(item.id))}></i>
                                </div>
                            </>
                        ))}
                        <Link to='/checkout'>
                            <button className='checkout_button'>Proceed to Checkout</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};
