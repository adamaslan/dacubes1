import { useState } from 'react';
import Navbar from 'app/components/navbar';

export default function About() {
  return (
    <>    <Navbar 
    links={[
      { href: "/", text: "Home" },
      { href: "/about", text: "About" },
      { href: "/contact", text: "Contact" }
    ]} 
    logo={<div className="text-white font-bold">LOGO</div>}
  />
    <div className="grid-container">
      <style>
        {`
          .grid-container {
            display: grid;
            gap: 1rem;
            padding: 1rem;
          }

          @media (min-width: 768px) {
            .grid-container {
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(3, 1fr);
            }
          }

          @media (max-width: 767px) {
            .grid-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          .grid-item {
            padding: 2rem;
            text-align: center;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          }
        `}
      </style>

      <div className="grid-item" style={{ backgroundColor: '#FF6B6B' }}>
        Welcome to our amazing grid layout!
      </div>
      <div className="grid-item" style={{ backgroundColor: '#4ECDC4' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#45B7D1' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#96CEB4' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#FFEEAD' }}>
        Discover the power of CSS Grid!
      </div>
      <div className="grid-item" style={{ backgroundColor: '#D4A5A5' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#9B786F' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#A8E6CE' }}>
        + - + - + - + - + - + - + - + -
      </div>
      <div className="grid-item" style={{ backgroundColor: '#FFD93D' }}>
        Thanks for visiting our page!
      </div>
    </div>
    </>
  );
}