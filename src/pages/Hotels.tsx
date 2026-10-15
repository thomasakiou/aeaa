import '../styles/animations.css';
import './css/ProgrammePages.css';

export default function Hotels() {
    return (
        <div className="programme-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Recommended <span style={{ opacity: 0.7 }}>Hotels</span></h1>
                <p className="animate-fade-up-d1">Accommodation information for conference delegates.</p>
            </div>
            <div className="page-body hotels-page-body">
                <div className="glass-panel hotels-coming-soon animate-fade-up-d2">
                    <h2 className="section-title">List of recommended hotels coming soon</h2>
                </div>
            </div>
        </div>
    );
}
