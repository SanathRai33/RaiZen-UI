import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HeroBanner() {
    const slides = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAmPXRfbsKZ6j7RjEVbjCIvl7uJrT4zdMBPw&s",
            title: "Big Summer Sale",
            caption: "Up to 50% off on electronics!",
        },
        {
            image: "data:image/jpeg;base64,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",
            title: "Fashion Fiesta",
            caption: "Flat 40% off on trending fashion.",
        },
        {
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2R1Y3R8ZW58MHwwfDB8fHww",
            title: "Home Essentials",
            caption: "Modern furniture at best prices.",
        },
    ];

    return (
        <div
            id="carouselExampleAutoplaying"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
            data-bs-interval="4000"
            style={{ borderRadius: "10px", overflow: "hidden" , width: '100%'}} // 👈 Fix overflow here
        >
            <div
                className="carousel-inner"
                style={{
                    height: "380px", // 👈 Set consistent height
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                        style={{ height: "100%" }}
                    >
                        <img
                            src={slide.image}
                            className="d-block w-100"
                            alt={slide.title}
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3 py-2">
                            <h5>{slide.title}</h5>
                            <p>{slide.caption}</p>
                        </div>
                    </div>
                ))}
            </div>


            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
