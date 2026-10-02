import '../styles/animations.css';
import { FileText, AlertCircle, Mail, Upload } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PaperUploadModal from '../components/PaperUploadModal';

const guidelines = [
    { label: 'ABSTRACTS', text: 'Maximum of 350 words. Must include Title, Sub-Theme, and Author(s) details (name(s), institutional affiliation, email address(es)).' },
    { label: 'FULL PAPER', text: 'Not less than 3,500 words. Line spacing: 1.5. Must use APA reference style.' },
    { label: 'FORMATTING', text: 'All submissions must be presented in Times New Roman, 12pt format.' },
];

const subThemes = [
    { title: 'Foundational Learning Measurement', desc: 'Early grade reading and numeracy assessments in Africa.' },
    { title: 'Regional and International Benchmarking', desc: 'Participation in global and African assessments.' },
    { title: 'Digital Assessment Transformation', desc: 'Computer-based testing, AI and adaptive assessments in Africa.' },
    { title: 'Equity and Inclusion in Assessment', desc: 'Measuring disadvantaged learners in Africa.' },
    { title: 'Classroom-Based and Formative Assessment', desc: 'Moving beyond high-stakes examinations in Africa.' },
    { title: 'Using Data for Policy and Practice in Africa', desc: 'Evidence-based decision making.' },
];

export default function Submission() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    useEffect(() => {
        const routeState = location.state as { openUploadModal?: boolean } | null;
        if (user && routeState?.openUploadModal) {
            setIsUploadModalOpen(true);
            navigate(`${location.pathname}${location.search}${location.hash}`, { replace: true, state: null });
        }
    }, [location, navigate, user]);

    const handleUploadClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setIsUploadModalOpen(true);
    };

    return (
        <div className="submission-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Call for <span style={{ opacity: 0.7 }}>Papers</span></h1>
                <p className="animate-fade-up-d1">Share your research and innovations with the AEAA community.</p>
            </div>
            <div className="page-body">

                {/* Sub-themes */}
                <div className="sub-themes-section animate-fade-up-d2">
                    <h2 className="section-title text-center">Conference <span className="text-gradient">Sub-Themes</span></h2>
                    <p className="text-center" style={{ marginBottom: '2.5rem', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                        The conference welcomes presentations and papers that address the following sub-themes:
                    </p>
                    <div className="themes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                        {subThemes.map((theme, idx) => (
                            <div key={idx} className="theme-card glass-panel" style={{ animationDelay: `${0.1 * idx}s`, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className="theme-number" style={{ fontSize: '1.5rem', color: 'var(--color-green-primary)', fontWeight: 'bold' }}>
                                        {String.fromCharCode(97 + idx)}.
                                    </span>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-green-dark)' }}>{theme.title}</h3>
                                </div>
                                <p style={{ color: 'var(--color-text-main)', margin: '0 0 0 2.5rem' }}>{theme.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Guidelines */}
                <div className="guidelines-section animate-fade-up-d3" style={{ marginTop: '4.5rem' }}>
                    <h2 className="section-title text-center">Submission <span className="text-gradient">Guidelines</span></h2>
                    <div className="guidelines-card glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="guidelines-header" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <AlertCircle size={28} color="var(--color-green-primary)" />
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Important Formatting Instructions</h3>
                        </div>
                        <ul className="guidelines-list" style={{ listStyle: 'none', padding: 0 }}>
                            {guidelines.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem', fontSize: '1.05rem' }}>
                                    <FileText size={20} style={{ color: 'var(--color-green-primary)', flexShrink: 0, marginTop: '2px' }} />
                                    <span><strong>{item.label}:</strong> {item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Upload Section / Instructions */}
                <div className="upload-section animate-fade-up-d4" style={{ marginTop: '4.5rem', textAlign: 'center' }}>
                    <h2 className="section-title">How to <span className="text-gradient">Submit</span></h2>
                    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', borderTop: '5px solid var(--color-green-primary)' }}>
                        <p style={{ fontSize: '1.15rem', color: 'var(--color-text-main)', marginBottom: '2rem' }}>
                            Abstracts and papers should be submitted by uploading them directly on the official AEAA website and sent as an attachment to the conference email addresses provided under Contact Us.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                            <button type="button" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={handleUploadClick}>
                                <Upload size={20} style={{ marginRight: '8px' }} /> Upload Paper
                            </button>
                            <Link to="/contact" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                <Mail size={20} style={{ marginRight: '8px' }} /> View Contact Emails
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            {isUploadModalOpen && <PaperUploadModal onClose={() => setIsUploadModalOpen(false)} />}
        </div>
    );
}
