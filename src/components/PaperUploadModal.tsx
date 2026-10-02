import { ChangeEvent, useEffect, useState } from 'react';
import { CheckCircle2, Upload, X } from 'lucide-react';
import { fetchApi } from '../api/client';
import { useAuth } from '../context/AuthContext';
import '../styles/animations.css';
import '../pages/css/Submission.css';

interface PaperUploadModalProps {
    onClose: () => void;
    onUploaded?: () => void;
}

export default function PaperUploadModal({ onClose, onUploaded }: PaperUploadModalProps) {
    const { user } = useAuth();
    const [submissionTitle, setSubmissionTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            setSelectedFile(null);
            setFileError('Please select a PDF file.');
            event.target.value = '';
            return;
        }

        setFileError('');
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!user) return;

        const title = submissionTitle.trim();
        if (!title || !selectedFile) return;

        setUploadStatus('loading');
        setStatusMessage('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', selectedFile);

        try {
            await fetchApi('/user/submissions', { method: 'POST', body: formData });
            setUploadStatus('success');
            setStatusMessage('Paper successfully submitted!');
            onUploaded?.();
        } catch (error) {
            setUploadStatus('error');
            setStatusMessage(error instanceof Error ? error.message : 'Upload failed. Please try again.');
        }
    };

    return (
        <div className="upload-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
                <div className="upload-modal-header">
                    <div>
                        <span className="upload-modal-eyebrow">Paper submission</span>
                        <h2 id="upload-modal-title">Upload your paper</h2>
                    </div>
                    <button type="button" className="upload-modal-close" onClick={onClose} aria-label="Close upload modal" disabled={uploadStatus === 'loading'}>
                        <X size={22} />
                    </button>
                </div>
                {uploadStatus === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <CheckCircle2 size={64} style={{ color: 'var(--color-green-primary)', margin: '0 auto 1.5rem auto' }} />
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-green-dark)' }}>{statusMessage}</h3>
                        <button type="button" className="btn btn-primary" onClick={onClose}>Done</button>
                    </div>
                ) : (
                    <>
                        <p className="upload-modal-description">Enter the paper title and select your completed paper as a PDF file.</p>

                        {uploadStatus === 'error' && (
                            <div role="alert" style={{ padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', color: 'red', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(255,0,0,0.3)' }}>
                                {statusMessage}
                            </div>
                        )}

                        <div className="input-group upload-title-group">
                            <label htmlFor="submission-title">Paper Title</label>
                            <input
                                id="submission-title"
                                className="form-input"
                                type="text"
                                value={submissionTitle}
                                onChange={(event) => setSubmissionTitle(event.target.value)}
                                placeholder="Enter the title of your paper"
                                required
                                disabled={uploadStatus === 'loading'}
                            />
                        </div>
                        <label className="upload-box modal-upload-box" htmlFor="paper-upload" style={{ opacity: uploadStatus === 'loading' ? 0.5 : 1, pointerEvents: uploadStatus === 'loading' ? 'none' : 'auto' }}>
                            <Upload size={34} color="var(--color-green-primary)" />
                            <h4>{selectedFile ? selectedFile.name : 'Choose a PDF file'}</h4>
                            <p>{selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB selected` : 'PDF format only'}</p>
                            <input id="paper-upload" className="file-input" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} />
                        </label>
                        {fileError && <p className="upload-file-error" role="alert">{fileError}</p>}
                        <div className="upload-modal-actions">
                            <button type="button" className="btn btn-outline" onClick={onClose} disabled={uploadStatus === 'loading'}>Cancel</button>
                            <button type="button" className="btn btn-primary" disabled={!submissionTitle.trim() || !selectedFile || uploadStatus === 'loading'} onClick={handleSubmit}>
                                {uploadStatus === 'loading' ? 'Uploading...' : 'Submit'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}