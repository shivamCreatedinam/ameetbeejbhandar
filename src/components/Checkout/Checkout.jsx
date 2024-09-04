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
    const navigate = useNavigate();

    const [name, setName] = useState()
    const [remarks, setRemarks] = useState()
    const [contact, setContact] = useState()


    // GST
    const [gstNumber, setGstNumber] = useState('');
    const [isValidGST, setIsValidGST] = useState(false);


    const validateGSTIN = (gstin) => {
        const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstinPattern.test(gstin);
    };
    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        setGstNumber(value);

        if (validateGSTIN(value)) {
            setIsValidGST(true);
        } else {
            setIsValidGST(false);
        }
    };



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
                            <div className='quote_container_left'>
                                <h1>Get a Quote</h1>
                                <p>Fill the Form and our Team will get back to you, <br />as soon as possible.</p>
                                <div className='contact_options'>
                                    <div className='contact_options_container'><i class="fa-solid fa-phone"></i><p>+91 88595 91451</p></div>
                                    <div className='contact_options_container'><i class="fa-solid fa-envelope"></i><p>vibhorvashistha3@gmail.com</p></div>
                                    <div className='contact_options_container'><i class="fa-solid fa-location-dot"></i><p>Punjabi Pura, TP Nagar, Meerut, UP India</p></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className='quote_container_right'>
                                <p>Your Name</p>
                                <input type="text" onChange={(e) => setName(e.target.value)} className='quote_input' placeholder='John Doe' value={name} />
                                <p className='remarks'>Remarks</p>
                                <input type='text' onChange={(e) => setRemarks(e.target.value)} className='quote_input' placeholder='remarks' value={remarks} /><br />
                                <p className='remarks'>Contact Details</p>
                                <input type='text' onChange={(e) => setContact(e.target.value)} className='quote_input' placeholder='Mobile no. or Email' value={contact} /><br />
                                <p className='contact_details'>Contact details</p>
                                <input type='text' className='quote_input'
                                    value={gstNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter GST Number" />
                                {isValidGST && (
                                    <span className="valid_sign">✓</span>
                                )}

                                {!isValidGST && gstNumber.length > 0 && (
                                    <p className="warning_valid">Please enter a valid GST number.</p>
                                )}
                                <button className='checkout_button'>Send Quote</button>
                            </div>
                        </div>
                    </div>
                )}


                <p className='thanku_footer'>Thank You for Visiting.</p>
            </div>
        </>
    );
};
