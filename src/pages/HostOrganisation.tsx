import '../styles/animations.css';
import './css/AboutPages.css';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

const highlights = [
    'National examinations and assessment services',
    'Quality assurance across Nigeria’s education system',
    'Research, innovation, and stakeholder collaboration',
];

export default function HostOrganisation() {
    return (
        <div className="about-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Host <span style={{ opacity: 0.7 }}>Organisation</span></h1>
                <p className="animate-fade-up-d1">Meet the National Examinations Council, host of the 43rd AEAA Conference.</p>
            </div>
            <div className="page-body about-content-grid">
                <div className="about-feature-image animate-fade-left">
                    <img src="/img/host.png" alt="National Examinations Council host organisation" />
                </div>
                <div className="about-copy animate-fade-right">
                    <Building2 size={40} color="var(--color-green-primary)" />
                    <h2 className="section-title host-organisation-title">National Examinations <span className="text-gradient">Council</span></h2>
                    <p>The National Examinations Council (NECO) is Nigeria’s examination body responsible for conducting credible, accessible, and nationally recognised assessments.</p>
                    <p>As host of the 43rd AEAA Conference, NECO welcomes assessment leaders, researchers, and policymakers to Abuja for conversations that strengthen learning outcomes across Africa.</p>
                    <ul className="about-list">
                        {highlights.map((highlight) => <li key={highlight}><CheckCircle2 size={20} /> {highlight}</li>)}
                    </ul>
                    <a href="https://www.neco.gov.ng" target="_blank" rel="noreferrer" className="btn btn-primary">Visit NECO <ArrowRight size={18} /></a>
                </div>
            </div>
            {/* <div className="about-subpage-link text-center">
                <Link to="/about/host-country" className="btn btn-outline">Explore the Host Country <ArrowRight size={18} /></Link>
            </div> */}
        </div>
    );
}
