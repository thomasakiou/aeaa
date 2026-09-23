import '../styles/animations.css';
import './css/ProgrammePages.css';
import { CalendarDays, MapPin } from 'lucide-react';
import { useState } from 'react';

const venueImages = [
    { src: '/img/Venue1.jpg', alt: 'Abuja Continental Hotel exterior' },
    { src: '/img/venue2.jpg', alt: 'Abuja Continental Hotel venue view' },
    { src: '/img/venue3.jpg', alt: 'Abuja Continental Hotel interior' },
    { src: '/img/venue4.jpg', alt: 'Abuja Continental Hotel facilities' },
    // { src: '/img/venue5.jpg', alt: 'Abuja Continental Hotel event space' },
    { src: '/img/venue6.jpg', alt: 'Abuja Continental Hotel surroundings' },
];

export default function Venue() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const activeImage = venueImages[activeImageIndex];

    return (
        <div className="programme-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Conference <span style={{ opacity: 0.7 }}>Venue</span></h1>
                <p className="animate-fade-up-d1">Find your way to the 43rd AEAA Conference in Abuja.</p>
            </div>
            <div className="page-body venue-page-body">
                <div className="venue-feature animate-fade-up-d2">
                    <div className="venue-gallery">
                        <div className="venue-image-wrap">
                            <img src={activeImage.src} alt={activeImage.alt} />
                        </div>
                        <div className="venue-thumbnail-grid">
                            {venueImages.map((image, index) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    className={`venue-thumbnail ${index === activeImageIndex ? 'venue-thumbnail-active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    aria-label={`Show ${image.alt}`}
                                    aria-pressed={index === activeImageIndex}
                                >
                                    <img src={image.src} alt={image.alt} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="venue-details">
                        <span className="venue-eyebrow">Official conference venue</span>
                        <h2 className="section-title">Abuja <span className="text-gradient">Continental Hotel</span></h2>
                        <div className="venue-meta">
                            <div><CalendarDays size={20} /><span>16th - 20th August 2027</span></div>
                            <div><MapPin size={20} /><span>1 Ladi Kwali Street, Wuse Zone 4, P.M.B 143<br />Federal Capital Territory, Abuja, Nigeria</span></div>
                        </div>
                        <p>The 43rd AEAA Annual Conference will be held at the Abuja Continental Hotel, a five-star landmark hotel located at 1 Ladi Kwali Street, Wuse Zone 4, Abuja. Rising 12 floors above the city, it is one of Abuja’s most recognisable hotels and sits within easy reach of the Central Business District, the National Mosque, and Millennium Park.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
