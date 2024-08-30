// import React, {useEffect} from 'react'
// import { useParams } from 'react-router-dom'; 
// import { Product_details } from '../components/Product_details/Product_details'
// import { Suggest_Products } from '../components/Suggest_Products/Suggest_Products'
// import { Footer } from '../components/Footer/Footer'
// import productsData from '../Products.json'
// export const Products = () => {

//   const { productId } = useParams()

//   const findProduct = productsData.find((prod) => prod.id == productId);

//   useEffect(() => {

//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }, [productId]); 

//   return (
//     <>
//  <Product_details productId={productId} />
// {/* <Suggest_Products category={findProduct.Category}/>
// <Footer/> */}
//     </>
//   )
// }
