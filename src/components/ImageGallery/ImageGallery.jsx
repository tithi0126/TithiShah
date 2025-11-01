import React from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
    return (
        <div className="image-gallery">
            <h1>Image Gallery</h1>
            <div className="gallery-section">
                <h2>Section 1</h2>
                <div className="image-thumbnails">
                    <div className="image-thumbnail" style={{backgroundImage: 'url(image1.jpg)'}}></div>
                    <div className="image-thumbnail" style={{backgroundImage: 'url(image2.jpg)'}}></div>
                    <div className="image-thumbnail" style={{backgroundImage: 'url(image3.jpg)'}}></div>
                </div>
            </div>
            <div className="gallery-section">
                <h2>Section 2</h2>
                {/* Add more thumbnails here */}
            </div>
        </div>
    );
};

export default ImageGallery;