import '../styles/animations.css';
import './css/ProgrammePages.css';
import { Mail, Mic, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const speakers = [
    {
        name: 'Dr. Amina Bello',
        role: 'Keynote Speaker | Nigeria',
        email: 'amina.bello@example.org',
        bio: 'An assessment leader focused on foundational learning, equity, and stronger national assessment systems. Her work supports better classroom measurement and helps education stakeholders turn reliable evidence into practical interventions for learners across different contexts.',
    },
    {
        name: 'Prof. Daniel Mensah',
        role: 'Plenary Speaker | Ghana',
        email: 'daniel.mensah@example.org',
        bio: 'A researcher whose work connects educational measurement, teacher practice, and evidence-informed policy. He has contributed to regional conversations on teacher assessment literacy, learning progression, and the responsible use of data to improve education quality.',
    },
    {
        name: 'Dr. Grace Ndlovu',
        role: 'Panelist | Zimbabwe',
        email: 'grace.ndlovu@example.org',
        bio: 'An education specialist advancing inclusive assessment approaches for diverse learners and communities. Her programmes focus on removing barriers for underserved learners and designing assessment experiences that recognise different abilities, languages, and learning pathways.',
    },
    {
        name: 'Mr. Ibrahim Okafor',
        role: 'Workshop Facilitator | Nigeria',
        email: 'ibrahim.okafor@example.org',
        bio: 'A digital assessment practitioner exploring practical tools for secure, accessible, and responsive testing. He works with education teams to improve assessment delivery, strengthen digital confidence, and balance innovation with the security and fairness expected from high-stakes examinations.',
    },
    {
        name: 'Dr. Leila Hassan',
        role: 'Panelist | Kenya',
        email: 'leila.hassan@example.org',
        bio: 'A policy adviser working to translate assessment data into meaningful improvements in classrooms. Her experience spans system-level planning, school improvement, and the design of clear reporting that enables policymakers, teachers, and families to act on assessment findings.',
    },
    {
        name: 'Prof. Samuel Tadesse',
        role: 'Plenary Speaker | Ethiopia',
        email: 'samuel.tadesse@example.org',
        bio: 'An academic specialising in regional comparisons, learning outcomes, and assessment quality assurance. His research examines how countries can learn from one another while keeping assessment policies relevant to local priorities, resources, and the realities of their education systems.',
    },
    {
        name: 'Ms. Njeri Wambui',
        role: 'Session Chair | Kenya',
        email: 'njeri.wambui@example.org',
        bio: 'A conference contributor passionate about collaboration, professional learning, and assessment innovation. She brings together practitioners and researchers to share approaches that make assessment more useful, more transparent, and more closely connected to everyday teaching and learning.',
    },
    {
        name: 'Dr. Thabo Molefe',
        role: 'Keynote Speaker | South Africa',
        email: 'thabo.molefe@example.org',
        bio: 'A measurement expert examining how technology and responsible AI can support global competence. His work considers how emerging tools can broaden opportunity while protecting validity, privacy, human judgement, and the trust that learners and communities place in assessment systems.',
    },
];

export default function Speakers() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<typeof speakers[number] | null>(null);

    useEffect(() => {
        if (!selectedSpeaker) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedSpeaker(null);
            }
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedSpeaker]);

    return (
        <div className="programme-subpage">
            <div className="page-hero">
                <h1 className="animate-fade-up">Conference <span style={{ opacity: 0.7 }}>Speakers</span></h1>
                <p className="animate-fade-up-d1">Meet the experts shaping the future of educational assessment in Africa.</p>
            </div>
            <div className="page-body speakers-page-body">
                <Mic size={42} color="var(--color-green-primary)" />
                <h2 className="section-title animate-fade-up-d2">Voices of <span className="text-gradient">Assessment</span></h2>
                <p className="speakers-intro animate-fade-up-d2">Meet the keynote speakers, plenary contributors, and session leaders bringing fresh ideas to the 43rd AEAA Conference.</p>
                <div className="speakers-grid">
                    {speakers.map((speaker, speakerIndex) => (
                        <article key={speaker.email} className={`speaker-card animate-fade-up-d${Math.min(speakerIndex + 1, 5)}`}>
                            <div className="speaker-image-wrap">
                                <img src="/img/images.png" alt={`${speaker.name} placeholder portrait`} className="speaker-image" />
                                <span className="speaker-placeholder-label">Photo placeholder</span>
                            </div>
                            <div className="speaker-card-content">
                                <h3>{speaker.name}</h3>
                                <p className="speaker-role">{speaker.role}</p>
                                <a href={`mailto:${speaker.email}`} className="speaker-contact"><Mail size={15} /> {speaker.email}</a>
                                <p className="speaker-bio">{`${speaker.bio.slice(0, 125)}...`}</p>
                                <button type="button" className="speaker-read-more" onClick={() => setSelectedSpeaker(speaker)}>
                                    Read More
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            {selectedSpeaker && (
                <div className="speaker-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedSpeaker(null)}>
                    <div className="speaker-modal" role="dialog" aria-modal="true" aria-labelledby="speaker-modal-title">
                        <div className="speaker-modal-header">
                            <div>
                                <span className="speaker-modal-eyebrow">Conference speaker</span>
                                <h2 id="speaker-modal-title">{selectedSpeaker.name}</h2>
                                <p className="speaker-modal-role">{selectedSpeaker.role}</p>
                            </div>
                            <button type="button" className="speaker-modal-close" onClick={() => setSelectedSpeaker(null)} aria-label="Close speaker bio">
                                <X size={22} />
                            </button>
                        </div>
                        <div className="speaker-modal-body">
                            <img src="/img/images.png" alt={`${selectedSpeaker.name} placeholder portrait`} />
                            <div>
                                <p>{selectedSpeaker.bio}</p>
                                <a href={`mailto:${selectedSpeaker.email}`} className="speaker-modal-contact"><Mail size={16} /> {selectedSpeaker.email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
