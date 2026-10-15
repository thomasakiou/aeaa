import '../styles/animations.css';
import './css/ProgrammePages.css';

export default function Visa() {
    return (
        <div className="programme-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Visa <span style={{ opacity: 0.7 }}>Information</span></h1>
                <p className="animate-fade-up-d1">Guidance for delegates travelling to Nigeria.</p>
            </div>
            <div className="page-body hotels-page-body">
                <div className="glass-panel hotels-coming-soon animate-fade-up-d2">
                    <h2 className="section-title">Information regarding visa application processes coming soon</h2>
                </div>
            </div>
        </div>
    );
}
