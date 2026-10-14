import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../api/client';
import { CheckCircle, XCircle, Loader2, User, Building2, Globe, Phone, Package } from 'lucide-react';
import './css/VerifyUser.css';

interface PublicUser {
    id: string;
    fullName: string;
    email: string;
    organization?: string | null;
    country?: string | null;
    phoneNumber?: string | null;
    registrationPackage?: string | null;
    paymentStatus: 'PENDING' | 'COMPLETED';
}

export default function VerifyUser() {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<PublicUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        setError('');
        fetchApi<PublicUser>(`/users/${userId}/public`)
            .then(setUserData)
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'Unable to retrieve user information.');
            })
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) {
        return (
            <div className="verify-page">
                <div className="verify-loading">
                    <Loader2 className="verify-spinner" size={48} />
                    <p>Verifying participant…</p>
                </div>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="verify-page">
                <div className="verify-card verify-error-card glass-panel">
                    <div className="verify-icon-circle verify-icon-error">
                        <XCircle size={48} />
                    </div>
                    <h2>Verification Failed</h2>
                    <p className="verify-error-msg">{error || 'User not found.'}</p>
                </div>
            </div>
        );
    }

    const isPaid = userData.paymentStatus === 'COMPLETED';

    return (
        <div className="verify-page">
            <div className="verify-card glass-panel animate-fade-up">
                {/* Header badge */}
                <div className="verify-badge-wrapper">
                    <div className={`verify-icon-circle ${isPaid ? 'verify-icon-success' : 'verify-icon-warning'}`}>
                        {isPaid ? <CheckCircle size={48} /> : <XCircle size={48} />}
                    </div>
                    <span className={`status-badge ${isPaid ? 'status-completed' : 'status-pending'}`} style={{ fontSize: '0.9rem', padding: '0.35rem 1rem' }}>
                        {isPaid ? 'Payment Confirmed' : 'Payment Pending'}
                    </span>
                </div>

                <h1 className="verify-name">{userData.fullName}</h1>
                <p className="verify-subtitle">43rd AEAA Conference Participant</p>

                <div className="verify-divider" />

                <div className="verify-details">
                    <DetailRow icon={<User size={18} />} label="Email" value={userData.email} />
                    <DetailRow icon={<Building2 size={18} />} label="Organization" value={userData.organization} />
                    <DetailRow icon={<Globe size={18} />} label="Country" value={userData.country} />
                    <DetailRow icon={<Phone size={18} />} label="Phone" value={userData.phoneNumber} />
                    <DetailRow icon={<Package size={18} />} label="Package" value={userData.registrationPackage} />
                </div>

                <div className="verify-footer">
                    <p>Scanned via AEAA Conference QR Verification</p>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
    return (
        <div className="verify-detail-row">
            <span className="verify-detail-icon">{icon}</span>
            <div>
                <span className="verify-detail-label">{label}</span>
                <span className="verify-detail-value">{value || 'N/A'}</span>
            </div>
        </div>
    );
}
