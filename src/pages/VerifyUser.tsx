import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchApi } from '../api/client';
import { Loader2 } from 'lucide-react';
import './css/VerifyUser.css';

interface PublicUser {
    id: string;
    fullName?: string;
    email: string;
    organization?: string | null;
    country?: string | null;
    phoneNumber?: string | null;
    registrationPackage?: string | null;
    paymentStatus: 'PENDING' | 'COMPLETED';
}

export default function VerifyUser() {
    const { userId } = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams();
    const scannedFullName = searchParams.get('fullName')?.trim();
    const scannedSerialNumber = searchParams.get('sn')?.trim();
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
                <VerifyBrand />
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
                <VerifyBrand />
                <div className="verify-card verify-error-card">
                    <h2>Verification Failed</h2>
                    <p className="verify-error-msg">{error || 'User not found.'}</p>
                </div>
            </div>
        );
    }

    const isPaid = userData.paymentStatus === 'COMPLETED';

    return (
        <div className="verify-page">
            <VerifyBrand />
            <div className="verify-card">
                {scannedSerialNumber && (
                    <p style={{
                        textAlign: 'center',
                        margin: '0 0 0.75rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(0, 135, 81, 0.08)',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: 'var(--color-green-dark, #005f38)',
                        letterSpacing: '0.5px',
                    }}>
                        S/N: {scannedSerialNumber}
                    </p>
                )}
                <h1 className="verify-name">{userData.fullName || scannedFullName || 'Name unavailable'}</h1>
                <p className={`verify-status ${isPaid ? 'verify-status-paid' : 'verify-status-pending'}`}>
                    Payment {isPaid ? 'Confirmed' : 'Pending'}
                </p>

                <div className="verify-divider" />

                <div className="verify-details">
                    {/* {scannedSerialNumber && <DetailRow label="Serial Number" value={scannedSerialNumber} />} */}
                    <DetailRow label="Email" value={userData.email} />
                    <DetailRow label="Organization" value={userData.organization} />
                    <DetailRow label="Country" value={userData.country} />
                    <DetailRow label="Phone" value={userData.phoneNumber} />
                    <DetailRow label="Package" value={userData.registrationPackage} />
                </div>
            </div>
        </div>
    );
}

function VerifyBrand() {
    return (
        <header className="verify-brand" aria-label="AEAA and NECO">
            <img src="/img/emblem.png" alt="AEAA logo" />
            <div className="verify-brand-title">
                <span>AEAA</span>
                <small>HOSTED BY NECO</small>
            </div>
            <img src="/img/neco.png" alt="NECO logo" />
        </header>
    );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="verify-detail-row">
            <span className="verify-detail-label">{label}</span>
            <span className="verify-detail-value">{value || 'N/A'}</span>
        </div>
    );
}
