import '../styles/animations.css';
import './css/ProgrammePages.css';
import { MapPinned } from 'lucide-react';

const excursionSites = [
    {
        name: 'Nike Art Gallery',
        location: 'Along Airport Road, Abuja',
        image: '/excursion/Nike Art Gallery.jpg',
        description: 'Founded by Chief Nike Davies-Okundaye, this working cultural centre is one of West Africa’s largest galleries, housing thousands of diverse Nigerian artworks.',
    },
    {
        name: 'Abuja Art and Craft Village',
        location: 'Central Business District, Abuja',
        image: '/excursion/images (3).jpg',
        description: 'Located in Abuja’s Central Business District, this open-air cultural village offers authentic Nigerian handicrafts, textiles, and souvenirs in an easily walkable setting.',
    },
    {
        name: 'Zuma Rock',
        location: 'Abuja-Kaduna Road',
        image: '/excursion/Zuma Rock, Niger StateFCT Border.webp',
        description: 'This striking 725-metre monolith is often called the “gateway to Abuja.” Famous for its human-like rock face contours, it is also featured on Nigeria’s 100 Naira note.',
    },
    {
        name: 'Katampe Hill',
        location: 'Katampe District, Abuja',
        image: '/excursion/images.jpg',
        description: 'Katampe Hills is famously recognised as the geographical centre of Nigeria, located in the Katampe district of Abuja, the Federal Capital Territory.',
    },
    {
        name: 'Discovery Museum',
        location: 'Abuja Art Tech District',
        image: '/excursion/images (1).jpg',
        description: 'Located in Abuja’s Art Tech District, the Discovery Museum is Nigeria’s first digital venue blending technology and art to showcase the nation’s history and cultural heritage.',
    },
];

export default function ExcursionSites() {
    return (
        <div className="programme-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Excursion <span style={{ opacity: 0.7 }}>Sites</span></h1>
                <p className="animate-fade-up-d1">Experience the culture, landmarks, and hospitality of Abuja.</p>
            </div>
            <div className="page-body excursion-page-body">
                <MapPinned size={42} color="var(--color-green-primary)" />
                <h2 className="section-title animate-fade-up-d2">Experience <span className="text-gradient">Abuja and Beyond</span></h2>
                <p className="excursion-intro animate-fade-up-d2">Delegates can discover art, history, craft, and remarkable landscapes through a selection of cultural sites around Abuja and Nigeria.</p>
                <div className="excursion-grid">
                    {excursionSites.map((site, index) => (
                        <article key={site.name} className={`excursion-card animate-fade-up-d${Math.min(index + 1, 5)}`}>
                            <div className="excursion-image-wrap">
                                <img src={site.image} alt={site.name} />
                                <span>{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="excursion-card-content">
                                <p className="excursion-location">{site.location}</p>
                                <h3>{site.name}</h3>
                                <p>{site.description}</p>
                                {/* <button type="button" className="excursion-detail-link">Explore site <ArrowRight size={16} /></button> */}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
