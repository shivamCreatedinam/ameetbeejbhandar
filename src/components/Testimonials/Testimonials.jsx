import React, { useRef } from 'react';
import './Testimonials.css'; 
import c1 from '../../images/customer_1.jpg'
import c2 from '../../images/customer_2.jpg'
import c3 from '../../images/customer_3.jpg'
import c4 from '../../images/customer_4.jpg'
import c5 from '../../images/customer_5.jpg'

const testimonials = [
  {
    id: 1,
    name: 'Anjelina Watson',
    role: 'UI/UX Designer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Service Quality',
    imageUrl: c1,
  },
  {
    id: 2,
    name: 'John D. Alexon',
    role: 'Web Developer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Supports',
    imageUrl: c2,
  },
  {
    id: 3,
    name: 'Anjelina Watson',
    role: 'UI/UX Designer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Service Quality',
    imageUrl: c3,
  },
  {
    id: 4,
    name: 'John D. Alexon',
    role: 'Web Developer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Supports',
    imageUrl: c4,
  },
  {
    id: 5,
    name: 'Anjelina Watson',
    role: 'UI/UX Designer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Service Quality',
    imageUrl: c5,
  },
  {
    id: 6,
    name: 'John D. Alexon',
    role: 'Web Developer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Supports',
    imageUrl: c1,
  },
  {
    id: 7,
    name: 'Anjelina Watson',
    role: 'UI/UX Designer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Service Quality',
    imageUrl: c3,
  },
  {
    id: 8,
    name: 'John D. Alexon',
    role: 'Web Developer',
    feedback: 'Competently cultivate worldwide e-tailers through to principles...',
    service: 'Supports',
    imageUrl: c2,
  },
  
];

export const Testimonials = () => {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Adjust the scroll speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByCards = (direction) => {
    const cardWidth = sliderRef.current.querySelector('.testimonial-card').offsetWidth;
    sliderRef.current.scrollLeft += direction * (cardWidth * 2); // Scroll two cards at a time
  };

  return (
    <div className="testimonials_container">
      <div className="testimonials_para">
        <i className="fa-solid fa-seedling"></i>
        <p>Testimonials</p>
      </div>
      <h1 className="testimonials_heading">Clients Best Feedback About Amit Beej Bhandar</h1>

      <div className="slider-wrapper">
        <button className="slider-button" onClick={() => scrollByCards(-1)}>◀</button>
        <div
          className="testimonial-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: 'grab' }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.imageUrl} alt={testimonial.name} className="testimonial-img" />
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
              <p>{testimonial.feedback}</p>
              <p>
                <strong>{testimonial.service}</strong>
              </p>
            </div>
          ))}
        </div>
        <button className="slider-button" onClick={() => scrollByCards(1)}>▶</button>
      </div>
    </div>
  );
};
