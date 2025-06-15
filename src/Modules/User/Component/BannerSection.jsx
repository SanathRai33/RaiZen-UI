import 'bootstrap/dist/css/bootstrap.min.css';
import carousel1 from '../Assets/Images/carousel 1.png'
import carousel2 from '../Assets/Images/carousel 2.png'
import carousel3 from '../Assets/Images/carousel 3.png'
import carousel4 from '../Assets/Images/carousel 4.png'

export default function HeroBanner() {
    const slides = [
        {
            image: carousel1,
            title: "Big Summer Sale",
            caption: "Up to 50% off on electronics!",
        },
        {
            image: carousel2,
            title: "Fashion Fiesta",
            caption: "Flat 40% off on trending fashion.",
        },
        {
            image: carousel3,
            title: "Home Essentials",
            caption: "Modern furniture at best prices.",
        },
        {
            image: carousel4,
            title: "Home Essentials",
            caption: "Modern furniture at best prices.",
        },
    ];

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="4000" style={{ overflow: "hidden", width: '100%', backgroundColor:'#000' }} >
            <div className="carousel-inner" style={{ height: "380px", }}>
                {slides.map((slide, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index} style={{ height: "100%" }}>
                        <img src={slide.image} className="d-block w-100" alt={slide.title} style={{ height: "100%", objectFit: "cover" }} />
                        {/* <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded px-3 py-2">
                            <h5>{slide.title}</h5>
                            <p>{slide.caption}</p>
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}