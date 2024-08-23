import React from 'react'
import './Footer.css'
import logo from '../../images/logo_2.png'

export const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='footer_banner'>
                    <h1>Stay with us On Social</h1>
                    <div className='footer_social'>
                        <p>FOLOW US: </p>
                        <div className='footer_social_section'>
                            <div className='footer_social_icons facebook'><i className="fa-brands fa-facebook-f"></i></div>
                            <div className='footer_social_icons'><i className="fa-brands fa-instagram"></i></div>
                            <div className='footer_social_icons'><i className="fa-brands fa-x-twitter"></i></div>
                        </div>
                    </div>
                </div>
                {/* 2nd */}
                <div className='footer_hero'>
                    <div className='footer_brand'>
                        <img src={logo}></img>
                        <h3>Amit Beej bhandar</h3>
                        <p className='about'>Elevate your harvest with Amit Beej Bhandar's premium <br />seeds, fertilizers, and crop protection solutions.  Achleve <br />higher yields, healthier crops, and a more profitable season.</p>
                        <div className='footer_contact'><i class="fa-solid fa-minus"></i><p> Contact</p></div>
                        <div  className='footer_contact'><i class="fa-solid fa-phone"></i><p>+91 88595 91451</p></div>
                        <div  className='footer_contact'><i class="fa-solid fa-envelope"></i><p>vibhorvashistha3@gmail.com</p></div>
                    </div>
                    <div className='quick_links'>
                        <h3>Links</h3>
                        <div className='quick_links_section'>
                            <a href='#'>About Us</a>
                            <a href='#'>Shipping</a>
                            <a href='#'>FAQ</a>
                            <a href='#'>Terms & Conditions</a>
                            <a href='#'>Privacy Policy</a>
                            <a href='#'>Exchanges and Returns</a>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='copyright'>
                    <p>© Copyrights 2024 Amit Beej Bhandar  All All rights reserved.</p>
                </div>
            </div>
        </>
    )
}
