import React from "react";
import Slider from "react-slick";
import { Card, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Products.css";

export const Products = () => {
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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <>
            <div className="products">
                <h2> Our Top Products </h2>
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} style={{ margin: "0 10px" }}>
                            <Card style={{ width: "inherit", width:'300px' , marginLeft: '25px', border: '1px solid gray', borderRadius: '20px', padding: '1em'}}>
                                <Card.Img variant="top" src={slide.img} className="card_img"/>
                                <Card.Body>
                                    <Card.Title className="product_name">Product Name</Card.Title>
                                    <Card.Text className="product_info">
                                        Brief Info about the product
                                    </Card.Text>
                                    <div className="product-actions">
                                        <button className="primary">Buy</button>
                                        <button className="secondary">Cart</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

