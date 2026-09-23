import '../styles/animations.css';
import './css/Contact.css';
import { Mail, Phone, Globe, Send, User } from 'lucide-react';

export default function Contact() {
    return (
        <div className="contact-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Contact <span style={{ opacity: 0.7 }}>Us</span></h1>
                <p className="animate-fade-up-d1">We'd love to hear from you. Get in touch with the conference organisers.</p>
            </div>
            <div className="page-body">
                <div className="contact-grid">
                    {/* Contact Info Cards */}
                    <div className="contact-info-col">
                        <h2 className="section-title animate-fade-left">Get in <span className="text-gradient">Touch</span></h2>
                        <p className="animate-fade-left" style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                            For enquiries about the 43rd AEAA Conference, please contact the Local Organising Committee.
                        </p>

                        <div className="glass-panel animate-fade-up-d1" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '12px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--color-green-dark)' }}>
                                <User size={22} className="text-gradient" /> Primary Contacts
                            </h3>
                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                <div>
                                    <strong style={{ fontSize: '1.1rem' }}>Dr INNOCENT UCHE EZENWANNE</strong>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', marginTop: '6px' }}>
                                        <Phone size={16} style={{ color: 'var(--color-green-primary)' }} /> +234 8035063496
                                    </div>
                                </div>
                                <div>
                                    <strong style={{ fontSize: '1.1rem' }}>JUMMAI G.M BASHIR Esq</strong>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', marginTop: '6px' }}>
                                        <Phone size={16} style={{ color: 'var(--color-green-primary)' }} /> +234 8033601784
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel animate-fade-up-d2" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '12px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--color-green-dark)' }}>
                                <Phone size={22} className="text-gradient" /> Other Contacts
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', color: 'var(--color-text-main)' }}>
                                <span>+234 8035986854</span>
                                <span>+234 8060858665</span>
                                <span>+234 8037032039</span>
                                <span>+234 8072980099</span>
                                <span>+234 8037045443</span>
                                <span>+234 8035999942</span>
                                <span>+234 8036018919</span>
                            </div>
                        </div>

                        <div className="glass-panel animate-fade-up-d3" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', color: 'var(--color-green-dark)' }}>
                                <Globe size={22} className="text-gradient" /> Digital Channels
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--color-text-main)' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Mail size={18} style={{ color: 'var(--color-green-primary)' }} />
                                    <a href="mailto:aeaa2027@neco.gov.ng" style={{ color: 'inherit' }}>aeaa2027@neco.gov.ng</a>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Mail size={18} style={{ color: 'var(--color-green-primary)' }} />
                                    <a href="mailto:ezenwanneuche@neco.gov.ng" style={{ color: 'inherit' }}>ezenwanneuche@neco.gov.ng</a>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Mail size={18} style={{ color: 'var(--color-green-primary)' }} />
                                    <a href="mailto:jummaibashir@neco.gov.ng" style={{ color: 'inherit' }}>jummaibashir@neco.gov.ng</a>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '0.25rem' }}>
                                    <Globe size={18} style={{ color: 'var(--color-green-primary)' }} />
                                    <a href="https://www.neco.gov.ng" target="_blank" rel="noreferrer" style={{ color: 'var(--color-green-dark)', fontWeight: '600' }}>www.neco.gov.ng</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-col animate-fade-right">
                        <form className="contact-form glass-panel" onSubmit={(e) => e.preventDefault()}>
                            <h3>Send a Message</h3>
                            <div className="input-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="Full name" className="form-input" />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="you@example.com" className="form-input" />
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input type="text" placeholder="What is this about?" className="form-input" />
                            </div>
                            <div className="input-group">
                                <label>Message</label>
                                <textarea placeholder="Write your message here..." className="form-input form-textarea" rows={5}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary form-submit-btn">
                                <Send size={18} style={{ marginRight: '0.5rem' }} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
