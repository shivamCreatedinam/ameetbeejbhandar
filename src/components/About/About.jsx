import React from 'react'
import './About.css'
import about from '../../images/about.png'
import about_icon_1 from '../../images/about-icon-1.png'
import about_icon_2 from '../../images/about-icon-2.png'

export const About = () => {
  return (
    <>
<div className='about_section'>
    <div className='about_left'>
        <img src={about} alt="" />
    </div>
    <div className='about_right'>
        <div className='about_description'>
                <div className='about_subheading'><i className="fa-solid fa-seedling"></i><p>ABOUT AMIT BEEJ BHANDAR</p></div>
                <h3>Environmental Sustainable Forever Green Future</h3>
                <div className='about_features'>
                    <img src={about_icon_1}></img>
                    <div>
                        <p className='about_features_heading'>Economic Benifits</p>
                        <p>Alternative innovation after ethical to network environmental whiteboard transparent growth natural done</p>
                    </div>
                </div>
                <div className='about_features'>
                    <img  src={about_icon_2}></img>
                    <div>
                        <p  className='about_features_heading'>Safe Environment</p>
                        <p>Alternative innovation after ethical to network environmental whiteboard transparent growth natural done</p>
                    </div>
                </div>
        </div>
        <div>
            <button><p>More  About</p><i className="fa-solid fa-leaf"></i></button>
        </div>
    </div>
</div>

    </>
  )
}
