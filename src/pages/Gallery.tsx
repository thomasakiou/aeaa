import '../styles/animations.css';
import './css/AboutPages.css';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const galleryImages = [
    { src: '/gallery/Aso Rock, FCT Abuja.webp', alt: 'Aso Rock in Abuja', title: 'Aso Rock, Abuja' },
    { src: '/gallery/Abuja National Mosque, FCT.webp', alt: 'Abuja National Mosque', title: 'Abuja National Mosque' },
    { src: '/gallery/Jabi Lake, Abuja.webp', alt: 'Jabi Lake in Abuja', title: 'Jabi Lake' },
    { src: '/gallery/Millennium Park, Abuja.webp', alt: 'Millennium Park in Abuja', title: 'Millennium Park' },
    { src: '/gallery/Zuma Rock, Niger StateFCT Border.webp', alt: 'Zuma Rock near Abuja', title: 'Zuma Rock' },
    { src: '/gallery/Gurara Waterfalls Niger State.jpg', alt: 'Gurara Waterfalls', title: 'Gurara Waterfalls' },
    { src: '/gallery/Obudu Mountain Resort, Cross River State.webp', alt: 'Obudu Mountain Resort', title: 'Obudu Mountain Resort' },
    { src: '/gallery/Lekki Conservation Centre, Lagos.webp', alt: 'Lekki Conservation Centre', title: 'Lekki Conservation Centre' },
    { src: '/gallery/Nike Art Gallery.jpg', alt: 'Nike Art Gallery', title: 'Nike Art Gallery' },
];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const activeImage = galleryImages[activeIndex];

    const showPrevious = () => setActiveIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
    const showNext = () => setActiveIndex((current) => (current + 1) % galleryImages.length);

    useEffect(() => {
        if (!isExpanded) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsExpanded(false);
            if (event.key === 'ArrowLeft') showPrevious();
            if (event.key === 'ArrowRight') showNext();
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isExpanded]);

    return (
        <div className="about-subpage gallery-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Conference <span style={{ opacity: 0.7 }}>Gallery</span></h1>
                <p className="animate-fade-up-d1">A glimpse into the people, places, and ideas behind the 43rd AEAA Conference.</p>
            </div>
            <div className="page-body">
                <div className="gallery-slider animate-fade-up-d2">
                    <div className="gallery-stage">
                        <img src={activeImage.src} alt={activeImage.alt} className="gallery-active-image" />
                        <div className="gallery-stage-shade">
                            <span>{activeImage.title}</span>
                            <button type="button" className="gallery-expand-button" onClick={() => setIsExpanded(true)} aria-label={`Expand ${activeImage.title}`} title="Expand image">
                                <Expand size={20} />
                            </button>
                        </div>
                        <button type="button" className="gallery-arrow gallery-arrow-left" onClick={showPrevious} aria-label="Previous gallery image">
                            <ChevronLeft size={26} />
                        </button>
                        <button type="button" className="gallery-arrow gallery-arrow-right" onClick={showNext} aria-label="Next gallery image">
                            <ChevronRight size={26} />
                        </button>
                    </div>
                    <div className="gallery-slider-footer">
                        <div className="gallery-thumbnails" aria-label="Gallery images">
                            {galleryImages.map((image, index) => (
                                <button key={image.src} type="button" className={`gallery-thumbnail ${index === activeIndex ? 'gallery-thumbnail-active' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Show ${image.title}`} aria-current={index === activeIndex}>
                                    <img src={image.src} alt="" />
                                </button>
                            ))}
                        </div>
                        <div className="gallery-dots">
                            {galleryImages.map((image, index) => <button key={image.src} type="button" className={index === activeIndex ? 'gallery-dot gallery-dot-active' : 'gallery-dot'} onClick={() => setActiveIndex(index)} aria-label={`Show slide ${index + 1}`} />)}
                        </div>
                    </div>
                </div>
            {isExpanded && (
                <div className="gallery-lightbox" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsExpanded(false)}>
                    <div className="gallery-lightbox-content" role="dialog" aria-modal="true" aria-label={activeImage.title}>
                        <button type="button" className="gallery-lightbox-close" onClick={() => setIsExpanded(false)} aria-label="Close expanded image"><X size={24} /></button>
                        <img src={activeImage.src} alt={activeImage.alt} />
                        <p>{activeImage.title}</p>
                        <button type="button" className="gallery-arrow gallery-arrow-left" onClick={showPrevious} aria-label="Previous gallery image"><ChevronLeft size={28} /></button>
                        <button type="button" className="gallery-arrow gallery-arrow-right" onClick={showNext} aria-label="Next gallery image"><ChevronRight size={28} /></button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
