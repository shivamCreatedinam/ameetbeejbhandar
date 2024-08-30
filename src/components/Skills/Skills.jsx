import React from 'react';
import './Skills.css';
import skills_image from '../../images/skill-thumb.png'
import skills_save from '../../images/skill-shape-1.png'
import skills_dots from '../../images/skill-dots.png'

export const Skills = () => {
    return (
        <>
            <div className='skills_section' >
                <div className='skills_left'>
                    <div className='skills_heading'><i className="fa-solid fa-seedling"></i><p>OUR SKILLS</p></div>
                    <div className='skills_description'>
                        <p className='skills_main_heading'>Getting A Greener Future Safe Environment</p>
                        <p className='skills_main_para'>Competently cultivate worldwide e-tailers through principle-centered value professionally engineer high-payoff deliverables without exceptional processes. Rapidiously network cost effective vortals</p>
                        <div className='skills_containers'>
                            <div className='skills_containers_child'><i className="fa-solid fa-circle-check"></i><p>Safe Environment</p></div>
                            <div className='skills_containers_child'><i className="fa-solid fa-circle-check"></i><p>Dirty Recycling</p></div>
                        </div>
                        <div className="progress-container">
                            <div className="progress-title">
                                <span>Recycling</span>
                                <span className="progress-value">90%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '90%' }}></div>
                            </div>

                            <div className="progress-title">
                                <span>Ocean Cleaning</span>
                                <span className="progress-value">80%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='skills_right'>
                   <img src={skills_image} className='skills_plant'/>
                   <img src={skills_save} className='save'></img>
                   <img src={skills_dots} className='dots'></img>
                </div>
            </div>
        </>
    )
}
