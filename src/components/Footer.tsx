import './Footer.css';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-wave"></div>
            <div className="container footer-content">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src="/img/neco.png" alt="NECO" className="footer-logo" />
                        <p>43rd Association for Educational Assessment in Africa (AEAA) Conference</p>
                        <p className="footer-host">Hosted by NECO, Nigeria &bull; 2027</p>
                        <div className="footer-socials" aria-label="Social media links">
                            <a href="https://www.facebook.com/AEAAfrica" target="_blank" rel="noopener noreferrer" aria-label="AEAA on Facebook" title="AEAA on Facebook">
                                <Facebook size={16} />
                            </a>
                            <a href="https://www.instagram.com/aeaafrica" target="_blank" rel="noopener noreferrer" aria-label="AEAA on Instagram" title="AEAA on Instagram">
                                <Instagram size={16} />
                            </a>
                            <a href="https://x.com/AEAAfrica" target="_blank" rel="noopener noreferrer" aria-label="AEAA on X" title="AEAA on X">
                                <Twitter size={16} />
                            </a>
                            <a href="https://www.linkedin.com/company/association-for-educational-assessment-in-africa" target="_blank" rel="noopener noreferrer" aria-label="AEAA on LinkedIn" title="AEAA on LinkedIn">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>
                    <div className="footer-links-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/programme">Programme</Link></li>
                            <li><Link to="/registration">Registration</Link></li>
                            <li><Link to="/submission">Submit Paper</Link></li>
                        </ul>
                    </div>
                    <div className="footer-links-col">
                        <h4>More</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/login">Portal Login</Link></li>
                            {/* <li><a href="https://www.aeaafrica.org" target="_blank" rel="noopener noreferrer">AEAA Website</a></li> */}
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2027 AEAA Conference &bull; National Examinations Council (NECO), Nigeria. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
