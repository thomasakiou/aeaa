import '../styles/animations.css';
import './css/Home.css';
import { ArrowRight, Users, BookOpen, Globe, Calendar, MapPin, Mic, Building2, Images } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            {/* Hero Section — Full Banner */}
            <section className="hero">
                <img src="/img/banner3.png" alt="43rd AEAA Conference Banner" className="hero-banner-img" />
                <div className="hero-theme-overlay">
                    <span>Conference Theme:</span>
                    <strong>ADVANCING EDUCATIONAL ASSESSMENT IN AFRICA.</strong>
                    <p>Strengthening Foundational Learning, Equity and Global Competence</p>
                </div>
                <div className="hero-cta-overlay animate-fade-up">
                    <Link to="/registration" className="btn btn-hero-primary cta-btn">
                        Register Now <ArrowRight size={18} />
                    </Link>
                    <Link to="/submission" className="btn btn-hero-outline cta-btn">
                        Call for Papers <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="about-section container" id="about" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
                <img src="/img/emblem.png" alt="" aria-hidden="true" className="about-floating-emblem" />
                <div className="about-grid">
                    <div className="about-image-box animate-fade-left">
                        <img src="/img/intro.png" alt="Host City - Abuja" className="about-img main-img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
                    </div>
                    <div className="about-text animate-fade-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {/* <h2 className="section-title">Introduction to the <span className="text-gradient">43rd Conference</span></h2> */}
                        <h2 className="section-title">Introduction</h2>
                        <p className="section-description" style={{ textAlign: 'justify', marginBottom: '1.5rem' }}>
                            The 43rd Annual Conference of the Association for Educational Assessment in Africa (AEAA) will be hosted by the National Examinations Council (NECO) of Nigeria, in Abuja, the Federal Capital Territory. Following the success of the 42nd AEAA Annual Conference hosted by the National Examinations Council of Tanzania (NECTA) in Arusha, the 43rd edition moves to West Africa, bringing together assessment leaders, researchers, and policymakers from across the continent and beyond.
                        </p>

                        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-green-primary)' }}>
                            <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-green-dark)', fontWeight: 'bold' }}>
                                The conference theme: "Advancing Educational Assessment in Africa: Strengthening Foundational Learning, Equity and Global Competence"
                            </p>
                        </div>

                        <div style={{ marginTop: '0.5rem' }}>
                            <Link to="/about" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Read the Full Introduction <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Break / Nigeria Banner */}
            <section className="banner-section">
                <div className="banner-overlay">
                    <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', color: 'white', maxWidth: '800px' }}>
                            <img src="/img/Flag-Nigeria.png" alt="Nigeria Flag" className="banner-flag animate-float" />
                            <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>Discover the rich culture of Nigeria</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>A vibrant environment for expanding the horizons of educational assessment.</p>
                            <Link to="/about/gallery" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                View Gallery <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links / CTA Section */}
            <section className="cta-section container">
                <div className="cta-grid">
                    <Link to="/programme" className="cta-card animate-fade-up-d1">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Calendar size={28} /></div><h3>Conference Programme</h3><p>View the full 3-day schedule</p></div>
                            <div className="cta-card-face cta-card-back"><Calendar size={34} /><strong>Explore the schedule</strong><span>View programme</span></div>
                        </div>
                    </Link>
                    <Link to="/submission" className="cta-card animate-fade-up-d2">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><BookOpen size={28} /></div><h3>Submit a Paper</h3><p>Share your research with peers</p></div>
                            <div className="cta-card-face cta-card-back"><BookOpen size={34} /><strong>Share your research</strong><span>Submit a paper</span></div>
                        </div>
                    </Link>
                    <Link to="/registration" className="cta-card animate-fade-up-d3">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Users size={28} /></div><h3>Register Now</h3><p>Secure your spot today</p></div>
                            <div className="cta-card-face cta-card-back"><Users size={34} /><strong>Join the conference</strong><span>Register now</span></div>
                        </div>
                    </Link>
                    <Link to="/contact" className="cta-card animate-fade-up-d4">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Globe size={28} /></div><h3>Contact Us</h3><p>Get in touch with organisers</p></div>
                            <div className="cta-card-face cta-card-back"><Globe size={34} /><strong>We are here to help</strong><span>Contact organisers</span></div>
                        </div>
                    </Link>
                    <Link to="/programme/excursion-sites" className="cta-card animate-fade-up-d5">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><MapPin size={28} /></div><h3>Excursion Site</h3><p>Explore Abuja with fellow delegates</p></div>
                            <div className="cta-card-face cta-card-back"><MapPin size={34} /><strong>Discover Abuja</strong><span>View excursion sites</span></div>
                        </div>
                    </Link>
                    <Link to="/programme/speakers" className="cta-card animate-fade-up-d5">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Mic size={28} /></div><h3>Speakers</h3><p>Meet the conference contributors</p></div>
                            <div className="cta-card-face cta-card-back"><Mic size={34} /><strong>Meet the experts</strong><span>View speakers</span></div>
                        </div>
                    </Link>
                    <Link to="/programme/venue" className="cta-card animate-fade-up-d5">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Building2 size={28} /></div><h3>Venue</h3><p>Find the conference location</p></div>
                            <div className="cta-card-face cta-card-back"><Building2 size={34} /><strong>Find your way</strong><span>View venue details</span></div>
                        </div>
                    </Link>
                    <Link to="/about/gallery" className="cta-card animate-fade-up-d5">
                        <div className="cta-card-inner">
                            <div className="cta-card-face cta-card-front"><div className="cta-icon-box"><Images size={28} /></div><h3>Gallery</h3><p>Explore conference highlights</p></div>
                            <div className="cta-card-face cta-card-back"><Images size={34} /><strong>See the highlights</strong><span>Open gallery</span></div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
