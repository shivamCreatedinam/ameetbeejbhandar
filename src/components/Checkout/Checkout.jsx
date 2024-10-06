import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { incrementQuantity, decrementQuantity, updateQuantity } from '../../Redux/slices/cartslice';
import './Checkout.css';
import product_img from '../../images/product.png';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export const Checkout = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});

    // GST and  PAN
    const [gstOrPanNumber, setGstOrPanNumber] = useState('');
    const [isValidGSTOrPAN, setIsValidGSTOrPAN] = useState(false);

    // GST validation pattern
    const validateGSTIN = (gstin) => {
        const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
        return gstinPattern.test(gstin);
    };

    // PAN validation pattern
    const validatePAN = (pan) => {
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panPattern.test(pan);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        setGstOrPanNumber(value);

        if (validateGSTIN(value) || validatePAN(value)) {
            setIsValidGSTOrPAN(true);
        } else {
            setIsValidGSTOrPAN(false);
        }
    };


    // API
    const validateForm = () => {
        let formErrors = {};

        if (!name) formErrors.name = "Name is required";
        if (!mobile || !/^\d{10}$/.test(mobile)) formErrors.mobile = "Valid 10-digit mobile number is required";
        if (!email || !/\S+@\S+\.\S+/.test(email)) formErrors.email = "Valid email is required";
        if (!gstOrPanNumber || !(validateGSTIN(gstOrPanNumber) || validatePAN(gstOrPanNumber))) {
            formErrors.gstOrPanNumber = "Valid GST or PAN number is required";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const BaseURL = 'https://amitbeejbhandar.in/admin/public/storage/'


    const API = 'https://amitbeejbhandar.in/admin/api/v1/create-lead';

    const sendOrder = () => {
        if (validateForm()) {
            const data = {
                name: name,
                remarks: remarks,
                email: email,
                mobile: mobile,
                quotes: cartItems,
            };

            if (validateGSTIN(gstOrPanNumber)) {
                data.gst_number = gstOrPanNumber;
            } else if (validatePAN(gstOrPanNumber)) {
                data.pan_number = gstOrPanNumber;
            }

            fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    toast.success('Order sent successfully!');
                    console.log('Order sent successfully:', data);
                        console.log(data.data.quotes)
                    // setTimeout(() => {
                    //     navigate('/');
                    //     window.location.reload();
                    // }, 1000);
                })
                .catch((error) => {
                    toast.error('Error sending order. Please try again.');
                    console.error('Error sending order:', error);
                });
        }
    }

    // console.log(cartItems)

    return (

        <>
            <div className='cart_items'>
                <button className='back_home' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}><i className="fa-solid fa-arrow-left"></i> Back to Home</button>
                <h1 className='cart_heading'>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className='cart_items_inner'>
                        {cartItems.map((item, index) => (
                            <div key={index} className='cart_items_inner_section'>
                                <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', width: 'auto' }}>
                                <div className='cart_item_img'>
                                    <img src={`${BaseURL}${item.image}`} alt={item['Product Name']} />
                                </div>
                                </Link>
                                <div>
                                    <h2>{item?.product_name}</h2>
                                    <p><span style={{fontWeight: 'bold'}}>By: </span> {item?.brand?.brand_name}</p>
                                    <p><span style={{ fontWeight: 'bold' }}>Variant: </span> {item?.variantName}</p>
                                    <p><span style={{fontWeight: 'bold'}}>Quantity: </span> {item.quantity}</p>
                                </div>
                                <div className='counting checkout_counting'>
                                    <i className="fa-solid fa-plus" onClick={() => dispatch(incrementQuantity({ id: item.id, variantId: item.variantId }))}></i>
                                    <input
                                        className='input_quantity'
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = Number(e.target.value);
                                            if (newQuantity >= 0) {
                                                dispatch(updateQuantity({ id: item.id, variantId: item.variantId, quantity: newQuantity }));
                                            }
                                        }}
                                    />
                                    <i className="fa-solid fa-minus" onClick={() => dispatch(decrementQuantity({ id: item.id, variantId: item.variantId }))}></i>
                                </div>
                            </div>
                        ))}

                        <div className='quote_container'>
                            <div className='quote_container_left'>
                                <h1>Get a Quote</h1>
                                <p>Fill the Form and our Team will get back to you, <br />as soon as possible.</p>
                                <div className='contact_options'>
                                    <div className='contact_options_container'><i className="fa-solid fa-phone"></i><p>+91 88595 91451</p></div>
                                    <div className='contact_options_container'><i className="fa-solid fa-envelope"></i><p>vibhorvashistha3@gmail.com</p></div>
                                    <div className='contact_options_container'><i className="fa-solid fa-location-dot"></i><p>Punjabi Pura, TP Nagar, Meerut, UP India</p></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className='quote_container_right'>
                                <p>Your Name</p>
                                <input type="text" onChange={(e) => setName(e.target.value)} className='quote_input' placeholder='John Doe' value={name} required />
                                {errors.name && <p className="warning_valid">{errors.name}</p>}

                                <p className='remarks'>Mobile No.</p>
                                <input type='text' onChange={(e) => setMobile(e.target.value)} className='quote_input' placeholder='Mobile no.' value={mobile} required />
                                {errors.mobile && <p className="warning_valid">{errors.mobile}</p>}

                                <p className='remarks'>Email ID</p>
                                <input type='text' onChange={(e) => setEmail(e.target.value)} className='quote_input' placeholder='Email' value={email} required />
                                {errors.email && <p className="warning_valid">{errors.email}</p>}

                                <p className='remarks'>Remarks</p>
                                <input type='text' onChange={(e) => setRemarks(e.target.value)} className='quote_input' placeholder='Remarks' value={remarks} />

                                <p className='contact_details'>GST Number or PAN Number</p>
                                <input type='text' className='quote_input' required value={gstOrPanNumber} onChange={handleInputChange} placeholder="Enter GST or PAN Number" />
                                {isValidGSTOrPAN  && (
                                    <span className="valid_sign">✓</span>
                                )}
                                {!isValidGSTOrPAN && gstOrPanNumber.length > 0 && (
                                    <p className="warning_valid">Please enter a valid GST or PAN number.</p>
                                )}
                                <button className='checkout_button' onClick={sendOrder}>Send Order</button>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                )}


                <p className='thanku_footer'>Thank You for Visiting.</p>
            </div>
        </>
    );
};
