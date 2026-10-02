import { useAuth } from '../context/AuthContext';
import { Users, Trash2, CheckCircle, RotateCcw, ChevronDown, ChevronUp, FileDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { apiUrl, fetchApi } from '../api/client';
import './css/Dashboard.css';
import { Navigate } from 'react-router-dom';

interface AdminSubmission {
    id: string;
    title: string;
    originalFileName: string;
    fileSizeMB?: number | null;
    status: string;
    createdAt: string;
    user: { id: string; fullName: string; email: string };
}

export default function AdminDashboard() {
    const { user } = useAuth();

    if (!user || user.role !== 'ADMIN') return <Navigate to="/login" replace />;

    const [users, setUsers] = useState<any[]>([]);
    const [stats, setStats] = useState({ paymentsCompleted: 0 });
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
    const [submissionError, setSubmissionError] = useState('');
    const [downloadingSubmissionId, setDownloadingSubmissionId] = useState<string | null>(null);
    const [downloadError, setDownloadError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const statsData = await fetchApi<{ paymentsCompleted: number }>('/admin/stats');
                setStats(statsData);

                const firstUsersPage = await fetchApi<{ users: any[]; totalPages: number }>('/admin/users?page=1&limit=100');
                const allUsers = [...firstUsersPage.users];
                for (let page = 2; page <= firstUsersPage.totalPages; page += 1) {
                    const usersPage = await fetchApi<{ users: any[] }>('/admin/users?page=' + page + '&limit=100');
                    allUsers.push(...usersPage.users);
                }
                setUsers(allUsers);

                const allSubmissions: AdminSubmission[] = [];
                for (let page = 1; ; page += 1) {
                    const submissionsPage = await fetchApi<AdminSubmission[]>(`/admin/submissions?page=${page}&limit=100`);
                    allSubmissions.push(...submissionsPage);
                    if (submissionsPage.length < 100) break;
                }
                setSubmissions(allSubmissions);
            } catch (err) {
                console.error("Failed to load admin data", err);
                setSubmissionError(err instanceof Error ? err.message : 'Unable to load submissions.');
            }
        };
        loadData();
    }, []);

    const handleDownloadSubmission = async (submission: AdminSubmission) => {
        setDownloadingSubmissionId(submission.id);
        setDownloadError('');
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(apiUrl(`/admin/submissions/${submission.id}/download`), {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error('Unable to download this paper.');

            const fileUrl = URL.createObjectURL(await response.blob());
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = submission.originalFileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
        } catch (err) {
            setDownloadError(err instanceof Error ? err.message : 'Unable to download this paper.');
        } finally {
            setDownloadingSubmissionId(null);
        }
    };

    const handleTogglePayment = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
            const updatedUser = await fetchApi<any>(`/admin/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ paymentStatus: newStatus })
            });
            setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const toggleRow = (id: string) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    };

    return (
        <div className="dashboard-page container animate-fade-up">
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomColor: 'rgba(211, 47, 47, 0.3)' }}>
                <div>
                    {/* <h1 style={{ color: '#d32f2f' }}><ShieldAlert size={28} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} />Admin <span style={{ opacity: 0.7 }}>Portal</span></h1> */}
                    <p style={{ color: 'var(--color-text-light)', paddingTop: '2rem', fontWeight: 'bold' }}>Welcome back, administrator.</p>
                </div>
                {/* <button onClick={logout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#d32f2f', color: '#d32f2f' }}>
                    <LogOut size={18} /> Logout
                </button> */}
            </div>

            <div className="dashboard-grid">
                {/* Stats Panel */}
                <div className="dashboard-card glass-panel animate-fade-up-d1">
                    <h3>System Overview</h3>
                    <div className="admin-stat-list">
                        <div className="info-item" style={{ background: 'rgba(0,135,81,0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <span className="info-label">Admin Users</span>
                            <span className="info-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{users.filter(adminUser => adminUser.role === 'ADMIN').length}</span>
                        </div>
                        <div className="info-item" style={{ background: 'rgba(0,135,81,0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <span className="info-label">Total Registrations</span>
                            <span className="info-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{users.filter(registeredUser => registeredUser.role === 'USER').length}</span>
                        </div>
                        <div className="info-item" style={{ background: 'rgba(0,135,81,0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <span className="info-label">Payments Completed</span>
                            <span className="info-value" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.paymentsCompleted}</span>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="dashboard-card glass-panel animate-fade-up-d2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Users size={24} color="var(--color-green-dark)" />
                        <h3 style={{ margin: 0 }}>Recent Users</h3>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Payment</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <React.Fragment key={u.id}>
                                        <tr style={{ background: expandedRows.includes(u.id) ? 'rgba(0,135,81,0.03)' : 'transparent' }}>
                                            <td>
                                                <button
                                                    className="btn btn-outline btn-small"
                                                    onClick={() => toggleRow(u.id)}
                                                    style={{ padding: '0.2rem', borderColor: 'transparent', color: 'var(--color-text-light)' }}
                                                >
                                                    {expandedRows.includes(u.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </button>
                                            </td>
                                            <td style={{ fontWeight: 600 }}>{u.fullName || u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`status-badge ${u.paymentStatus === 'COMPLETED' ? 'status-completed' : 'status-pending'}`}>
                                                    {u.paymentStatus || 'PENDING'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        className="btn btn-outline btn-small"
                                                        title={u.paymentStatus === 'COMPLETED' ? "Revert Payment" : "Confirm Payment"}
                                                        style={{
                                                            borderColor: u.paymentStatus === 'COMPLETED' ? '#f57c00' : 'var(--color-green-primary)',
                                                            color: u.paymentStatus === 'COMPLETED' ? '#f57c00' : 'var(--color-green-primary)'
                                                        }}
                                                        onClick={() => handleTogglePayment(u.id, u.paymentStatus)}
                                                    >
                                                        {u.paymentStatus === 'COMPLETED' ? <RotateCcw size={14} /> : <CheckCircle size={14} />}
                                                    </button>
                                                    <button className="btn btn-outline btn-small" title="Delete" style={{ borderColor: 'red', color: 'red' }}><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedRows.includes(u.id) && (
                                            <tr style={{ background: 'rgba(0,135,81,0.02)' }}>
                                                <td colSpan={5} style={{ padding: '1rem 3rem', borderTop: 'none' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Organization</span>
                                                            <span style={{ fontSize: '0.95rem' }}>{u.organization || 'N/A'}</span>
                                                        </div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Country</span>
                                                            <span style={{ fontSize: '0.95rem' }}>{u.country || 'N/A'}</span>
                                                        </div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Phone Number</span>
                                                            <span style={{ fontSize: '0.95rem' }}>{u.phoneNumber || u.phone || 'N/A'}</span>
                                                        </div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Role</span>
                                                            <span style={{ fontSize: '0.95rem' }}>{u.role || 'USER'}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '1.5rem' }}>
                                                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600, marginBottom: '0.75rem' }}>Uploaded Papers</span>
                                                        {submissionError ? (
                                                            <p role="alert" style={{ margin: 0 }}>{submissionError}</p>
                                                        ) : submissions.filter(submission => submission.user.id === u.id).length ? (
                                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.75rem' }}>
                                                                {submissions.filter(submission => submission.user.id === u.id).map(submission => (
                                                                    <li key={submission.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', borderTop: '1px solid rgba(0, 135, 81, 0.1)', paddingTop: '0.75rem' }}>
                                                                        <div>
                                                                            <strong style={{ display: 'block' }}>{submission.title}</strong>
                                                                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{submission.originalFileName} · {submission.status.split('_').join(' ')}</span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline btn-small"
                                                                            onClick={() => handleDownloadSubmission(submission)}
                                                                            disabled={downloadingSubmissionId === submission.id}
                                                                            title={`Download ${submission.originalFileName}`}
                                                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                                                                        >
                                                                            <FileDown size={14} /> {downloadingSubmissionId === submission.id ? 'Downloading...' : 'Download'}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p style={{ margin: 0, color: 'var(--color-text-light)' }}>No papers uploaded.</p>
                                                        )}
                                                        {downloadError && <p role="alert" style={{ margin: '0.75rem 0 0', color: '#b42318' }}>{downloadError}</p>}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
