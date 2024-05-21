import React from 'react';
import '../index.css'; // Import CSS for styling

const LoadingScreen = () => {
  return (
    <section id='overlay'>
        <div className="loading-animation">
            <div id='animation-window'>
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
            </div>
        </div>
    </section>
    
  );
};

export default LoadingScreen;
