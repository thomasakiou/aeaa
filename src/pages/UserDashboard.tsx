import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../api/client';
import './css/Dashboard.css';
import { Navigate } from 'react-router-dom';
import PaperUploadModal from '../components/PaperUploadModal';

interface Submission {
    id: string;
    title: string;
    status: string;
}

export default function UserDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<Submission[] | null>(null);
    const [submissionError, setSubmissionError] = useState('');
    const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const refreshSubmissions = async () => {
        setIsLoadingSubmissions(true);
        setSubmissionError('');
        try {
            setSubmissions(await fetchApi<Submission[]>('/user/submissions', { cache: 'no-store' }));
        } catch (error) {
            setSubmissionError(error instanceof Error ? error.message : 'Unable to load your submissions.');
        } finally {
            setIsLoadingSubmissions(false);
        }
    };

    useEffect(() => {
        if (!user) return;

        void refreshSubmissions();
    }, [user?.id]);

    // Fallback if component renders briefly before redirect
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="dashboard-page container animate-fade-up">
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1>Participant <span style={{ opacity: 0.7 }}>Dashboard</span></h1>
                    <p style={{ color: 'var(--color-text-light)' }}>Welcome back, {user.fullName}</p>
                </div>
                {/* <button onClick={logout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={18} /> Logout
                </button> */}
            </div>

            <div className="dashboard-grid">
                {/* Profile Information */}
                <div className="dashboard-card glass-panel animate-fade-up-d1">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(0,135,81,0.1)', color: 'var(--color-green-primary)', borderRadius: '50%' }}>
                            <User size={32} />
                        </div>
                        <h3>My Profile</h3>
                    </div>

                    <div className="user-info-list">
                        <div className="info-item">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">{user.fullName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email Address</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Organization</span>
                            <span className="info-value">{user.organization || 'Not provided'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Country</span>
                            <span className="info-value">{user.country || 'Not provided'}</span>
                        </div>
                    </div>
                </div>

                {/* Registration Data */}
                <div className="dashboard-card glass-panel animate-fade-up-d2">
                    <h3>Conference Registration Details</h3>
                    <div className="user-info-list" style={{ marginTop: '1.5rem' }}>
                        <div className="info-item">
                            <span className="info-label">Selected Package</span>
                            <span className="info-value">{user.registrationPackage}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Payment Status</span>
                            <span className="info-value">
                                <span className={`status-badge ${user.paymentStatus === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                    {user.paymentStatus}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1.5px dashed rgba(0, 135, 81, 0.3)', borderRadius: '12px', textAlign: 'center' }}>
                        {isLoadingSubmissions ? (
                            <p style={{ margin: 0, color: 'var(--color-text-main)' }}>Loading your submissions...</p>
                        ) : submissionError ? (
                            <p role="alert" style={{ margin: 0, color: 'var(--color-text-main)' }}>{submissionError}</p>
                        ) : submissions?.length ? (
                            <>
                                <p style={{ margin: 0, color: 'var(--color-text-main)' }}>
                                    You have submitted {submissions.length === 1 ? 'a paper' : `${submissions.length} papers`}.
                                </p>
                                <ul style={{ margin: '1rem 0 0', padding: 0, listStyle: 'none' }}>
                                    {submissions.map((submission) => (
                                        <li key={submission.id} style={{ marginTop: '0.5rem', color: 'var(--color-text-main)' }}>
                                            {submission.title} <span className="status-badge">{submission.status.split('_').join(' ')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p style={{ margin: 0, color: 'var(--color-text-main)' }}>You have not submitted any papers yet.</p>
                        )}
                        <button type="button" onClick={() => user ? setIsUploadModalOpen(true) : navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Submit a Paper</button>
                    </div>
                </div>
            </div>
            {isUploadModalOpen && (
                <PaperUploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onUploaded={() => void refreshSubmissions()}
                />
            )}
        </div>
    );
}
