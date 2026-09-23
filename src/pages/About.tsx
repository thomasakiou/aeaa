import '../styles/animations.css';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="about-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">About the <span style={{ opacity: 0.7 }}>43rd Conference</span></h1>
                <p className="animate-fade-up-d1">Advancing Educational Assessment in Africa</p>
            </div>

            <div className="page-body container" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div className="glass-panel animate-fade-up-d2" style={{ padding: '3rem', borderRadius: '16px' }}>
                    <h2 className="section-title text-center" style={{ marginBottom: '2rem' }}>Introduction to the <span className="text-gradient">AEAA 43rd Edition</span></h2>

                    <p className="section-description" style={{ textAlign: 'justify', marginBottom: '1.5rem', fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
                        The 43rd Annual Conference of the Association for Educational Assessment in Africa (AEAA) will be hosted by the National Examinations Council (NECO) of Nigeria, in Abuja, the Federal Capital Territory. Following the success of the 42nd AEAA Annual Conference hosted by the National Examinations Council of Tanzania (NECTA) in Arusha, the 43rd edition moves to West Africa, bringing together assessment leaders, researchers, and policymakers from across the continent and beyond.
                    </p>

                    <div style={{ padding: '2rem', margin: '2.5rem 0', background: 'rgba(0, 135, 81, 0.05)', borderLeft: '5px solid var(--color-green-primary)', borderRadius: '0 12px 12px 0' }}>
                        <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--color-green-dark)', fontWeight: 'bold', lineHeight: '1.6' }}>
                            “Advancing Educational Assessment in Africa: Strengthening Foundational Learning, Equity and Global Competence”
                        </p>
                    </div>

                    <p className="section-description" style={{ textAlign: 'justify', marginBottom: '1.5rem', fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
                        The conference theme reflects the continent's renewed focus on ensuring that every learner masters the basics — reading and numeracy — while building assessment systems that are equitable, technologically responsive, and globally benchmarked.
                    </p>

                    <p className="section-description" style={{ textAlign: 'justify', marginBottom: '1.5rem', fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
                        The conference will bring together key educational stakeholders in assessment from Africa and globally, mainly national educational assessment bodies, to examine how foundational learning can be measured and strengthened, how African assessment systems compare on regional and international benchmarks, how digital and AI-driven tools are transforming assessment practice, and how data can better inform policy and classroom practice.
                    </p>

                    <p className="section-description" style={{ textAlign: 'justify', fontSize: '1.15rem', color: 'var(--color-text-main)' }}>
                        Abuja, Nigeria's purpose-built capital city, offers a fitting backdrop for these discussions: a modern, accessible, and secure city that hosts the headquarters of ECOWAS and numerous diplomatic missions, and that has become one of West Africa's leading destinations for international conferences.
                    </p>
                </div>

                <div className="text-center animate-fade-up-d3" style={{ marginTop: '3rem' }}>
                    <Link to="/registration" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                        Register Now <ArrowRight size={18} style={{ marginLeft: '10px' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
