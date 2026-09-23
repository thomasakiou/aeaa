import '../styles/animations.css';
import './css/AboutPages.css';
import { MapPin, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HostCountry() {
    return (
        <div className="about-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Host <span style={{ opacity: 0.7 }}>Country</span></h1>
                <p className="animate-fade-up-d1">Discover Nigeria and its Federal Capital Territory, Abuja.</p>
            </div>
            <div className="page-body about-content-grid about-content-grid-reverse">
                <div className="about-feature-image animate-fade-right">
                    <img src="/img/Flag-Nigeria.png" alt="The Nigerian flag" />
                </div>
                <div className="about-copy animate-fade-left">
                    <MapPin size={40} color="var(--color-green-primary)" />
                    <h2 className="section-title">Welcome to <span className="text-gradient">Nigeria</span></h2>
                    <p>Nigeria is a country of vibrant cultures, growing innovation, and a deep commitment to education. Its people and institutions continue to shape conversations about assessment and opportunity across the continent.</p>
                    <p>Abuja, the purpose-built capital, provides a welcoming and accessible setting for the conference. The city combines modern infrastructure with remarkable landscapes and a thriving diplomatic community.</p>
                    <div className="about-fact-row">
                        <div><strong>Abuja</strong><span>Federal Capital Territory</span></div>
                        <div><strong>NECO</strong><span>Conference host</span></div>
                    </div>
                    <Link to="/contact" className="btn btn-primary">Plan Your Visit <Plane size={18} /></Link>
                </div>
            </div>
        </div>
    );
}
