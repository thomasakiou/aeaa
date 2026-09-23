import '../styles/animations.css';
import './css/Registration.css';
import { CheckCircle, Landmark, Banknote } from 'lucide-react';

export default function Registration() {
    return (
        <div className="registration-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Online <span style={{ opacity: 0.7 }}>Registration</span></h1>
                <p className="animate-fade-up-d1">Secure your seat at the 43rd AEAA Conference hosted by NECO, Nigeria.</p>
            </div>
            <div className="page-body">
                <div style={{ marginBottom: '4.5rem' }}>
                    <h2 className="section-title text-center">Conference <span className="text-gradient">Fees</span></h2>
                    <p className="text-center" style={{ marginBottom: '2.5rem', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
                        Choose your registration packages.
                    </p>
                    <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div className="pricing-card glass-panel animate-fade-up-d2">
                            <h3>Registration Fee</h3>
                            <div className="price">$650</div>
                            <ul className="perks-list">
                                <li><CheckCircle size={16} /> Full Conference Access</li>
                                <li><CheckCircle size={16} /> Conference Materials & Bag</li>
                                <li><CheckCircle size={16} /> Lunch & Event Refreshments</li>
                                <li><CheckCircle size={16} /> Gala Dinner Ticket</li>
                            </ul>
                        </div>
                        <div className="pricing-card glass-panel animate-fade-up-d3">
                            <h3>Excursion Fee</h3>
                            <div className="price">$100</div>
                            <ul className="perks-list">
                                <li><CheckCircle size={16} /> Guided City Tour</li>
                                <li><CheckCircle size={16} /> Luxury Transportation</li>
                                <li><CheckCircle size={16} /> Excursion Experience Meals</li>
                                <li><CheckCircle size={16} /> Cultural Sites Access</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '4.5rem' }}>
                    <h2 className="section-title text-center">Payment <span className="text-gradient">Details</span></h2>
                    <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', alignItems: 'stretch' }}>
                        <div className="pricing-card glass-panel animate-fade-up-d4" style={{ textAlign: 'left', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--color-green-dark)' }}>
                                <Landmark size={28} />
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>USD Account</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                                <p style={{ margin: 0 }}><strong>Bank Name:</strong> FIRST BANK OF NIGERIA</p>
                                <p style={{ margin: 0 }}><strong>Account Name:</strong> NECO AEAA 2027 CONFERENCE COLLECTION ACCOUNT</p>
                                <p style={{ margin: 0 }}><strong>Account No:</strong> 2048975906</p>
                                <p style={{ margin: 0 }}><strong>Currency:</strong> USD</p>
                                <p style={{ margin: 0 }}><strong>Swift Code:</strong> FBNINGLA</p>
                            </div>
                        </div>
                        <div className="pricing-card glass-panel animate-fade-up-d5" style={{ textAlign: 'left', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: 'var(--color-green-dark)' }}>
                                <Landmark size={28} />
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>NGN Account</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.05rem', color: 'var(--color-text-main)' }}>
                                <p style={{ margin: 0 }}><strong>Bank Name:</strong> FIRST BANK OF NIGERIA</p>
                                <p style={{ margin: 0 }}><strong>Account Name:</strong> NECO AEAA 2027 CONFERENCE COLLECTION ACCOUNT</p>
                                <p style={{ margin: 0 }}><strong>Account No:</strong> 2048975346</p>
                                <p style={{ margin: 0 }}><strong>Currency:</strong> NGN</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel animate-fade-up-d5" style={{ marginTop: '2rem', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '5px solid var(--color-green-primary)' }}>
                        <Banknote size={40} style={{ color: 'var(--color-green-primary)', flexShrink: 0 }} />
                        <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--color-text-main)' }}><strong>On-site Registration:</strong> Delegates may also opt to pay in cash during on-site registration upon arrival at the conference venue.</p>
                    </div>
                </div>

                <div className="reg-form-section animate-fade-up-d5">
                    <h2 className="section-title text-center">Registration <span className="text-gradient">Form</span></h2>
                    <form className="reg-form glass-panel" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" className="form-input" />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" className="form-input" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Organisation / Institution</label>
                                <input type="text" placeholder="e.g. NECO" className="form-input" />
                            </div>
                            <div className="input-group">
                                <label>Country</label>
                                <input type="text" placeholder="e.g. Nigeria" className="form-input" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Registration Package</label>
                                <select className="form-input">
                                    <option value="">Select Package</option>
                                    <option>Registration Fee Only ($650)</option>
                                    <option>Registration + Excursion ($750)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+234..." className="form-input" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary form-submit-btn">Proceed with Registration</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
