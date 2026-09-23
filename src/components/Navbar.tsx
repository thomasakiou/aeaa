import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Programme', path: '/programme' },
    { label: 'Registration', path: '/registration' },
    { label: 'Submission', path: '/submission' },
    { label: 'Contact', path: '/contact' },
];

const aboutItems = [
    { label: 'Introduction', path: '/about' },
    { label: 'Host Organisation', path: '/about/host-organisation' },
    { label: 'Host Country', path: '/about/host-country' },
    { label: 'Gallery', path: '/about/gallery' },
];

const programmeItems = [
    { label: 'Key Dates', path: '/programme#key-dates' },
    { label: 'Speakers', path: '/programme/speakers' },
    { label: 'Excursion Sites', path: '/programme/excursion-sites' },
    { label: 'Venue', path: '/programme/venue' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setIsAboutOpen(false);
        setIsProgrammeOpen(false);
    }, [location]);



    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <img src="/img/emblem.png" alt="NECO Logo" className="logo-img" />
                    <span className="logo-text">AEAA</span>
                </Link>
                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    {navItems.slice(0, 1).map((item) => (
                        <li
                            key={item.label}
                            className="nav-item"
                        >
                            <Link
                                to={item.path}
                                className={`nav-links ${location.pathname === item.path ? 'nav-active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item has-dropdown">
                        <div
                            className="dropdown-container"
                            onMouseEnter={() => setIsAboutOpen(true)}
                            onMouseLeave={() => setIsAboutOpen(false)}
                        >
                            <button
                                type="button"
                                className={`nav-links dropdown-toggle ${location.pathname.startsWith('/about') ? 'nav-active' : ''} ${isAboutOpen ? 'dropdown-active' : ''}`}
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                                aria-expanded={isAboutOpen}
                            >
                                About <ChevronDown size={16} className="dropdown-icon" />
                            </button>
                            <ul className={`dropdown-menu ${isAboutOpen ? 'show' : ''}`}>
                                {aboutItems.map((item) => (
                                    <li key={item.path}>
                                        <Link to={item.path} className="dropdown-link" onClick={() => setIsAboutOpen(false)}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    {navItems.slice(1).map((item) => item.label === 'Programme' ? (
                        <li key={item.label} className="nav-item has-dropdown">
                            <div
                                className="dropdown-container"
                                onMouseEnter={() => setIsProgrammeOpen(true)}
                                onMouseLeave={() => setIsProgrammeOpen(false)}
                            >
                                <button
                                    type="button"
                                    className={`nav-links dropdown-toggle ${location.pathname.startsWith('/programme') ? 'nav-active' : ''} ${isProgrammeOpen ? 'dropdown-active' : ''}`}
                                    onClick={() => setIsProgrammeOpen(!isProgrammeOpen)}
                                    aria-expanded={isProgrammeOpen}
                                >
                                    Programme <ChevronDown size={16} className="dropdown-icon" />
                                </button>
                                <ul className={`dropdown-menu ${isProgrammeOpen ? 'show' : ''}`}>
                                    {programmeItems.map((subItem) => (
                                        <li key={subItem.path}>
                                            <Link to={subItem.path} className="dropdown-link" onClick={() => setIsProgrammeOpen(false)}>{subItem.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ) : (
                        <li
                            key={item.label}
                            className="nav-item"
                        >
                            <Link
                                to={item.path}
                                className={`nav-links ${location.pathname === item.path ? 'nav-active' : ''}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item nav-btn-item">
                        <Link to="/login" className="btn btn-primary nav-login-btn">Portal Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
