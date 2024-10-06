import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { addItemToCart } from '../../Redux/slices/cartslice';
import './Suggest_Products.css';
import product_img from '../../images/product.png';
import axios from 'axios';
import { Cart } from '../Cart/Cart';

export const Suggest_Products = ( category ) => {
    const [products, setProducts] = useState([]);

    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => {
        setIsCartOpen(!isCartOpen)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://amitbeejbhandar.in/admin/api/v1/products');
                const allProducts = Object.values(response.data.data.data).filter(item => typeof item === 'object' && item.id);

                // Filter products by category
                const filteredProducts = allProducts.filter((prod) => prod.category?.category_name === category.category);
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);

    const dispatch = useAppDispatch();

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

    const BaseURL = 'https://amitbeejbhandar.in/admin/public/storage/'

    return (
        <div>
            <h1 className='suggestion_heading'>You May Also Like These Products</h1>
            <div className='suggestion_container'>
                <div className='products_right_container'>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className='single_product'>
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img src={`${BaseURL}${product.image}`} className='product_image' alt="Product" />
                                    <h1 style={{ wordWrap: 'break-word', maxWidth: '200px' }} >{product?.product_name}</h1>
                                    <p>By: {product?.brand?.brand_name}</p>
                                    <p>Price: ₹{product?.selling_price}</p>
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


            {isCartOpen && <div className="overlay" onClick={openCart}>
              
              </div>}
              <div className={`cart ${isCartOpen ? 'cart_open' : ''}`}>
                  <Cart />
              </div>

        </div>

        
    );
};
