import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/animations.css';
import './css/Login.css';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        try {
            await login({ email, password });
            // Let effect handle the redirect based on updated user state
        } catch (err: any) {
            setError(err.message || 'Login failed, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // If user changes and they become authenticated, route them
    if (user) {
        if (user.role === 'ADMIN') {
            navigate('/admin', { replace: true });
        } else {
            navigate('/dashboard', { replace: true });
        }
    }

    return (
        <div className="login-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Portal <span style={{ opacity: 0.7 }}>Login</span></h1>
                <p className="animate-fade-up-d1">Access your conference dashboard, submissions, and tickets.</p>
            </div>
            <div className="page-body">
                <div className="login-card glass-panel animate-scale-in">
                    <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-green-dark)', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>Sign in to your AEAA Conference portal</p>

                    {error && <div className="alert-error" style={{ padding: '0.75rem', background: 'rgba(255, 0, 0, 0.1)', color: 'red', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group animate-fade-up-d2">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group animate-fade-up-d3" style={{ position: 'relative' }}>
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="form-input"
                                style={{ paddingRight: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="btn btn-primary form-btn animate-fade-up-d4" disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="login-footer animate-fade-up-d5">
                        Don't have an account? <a href="/registration">Register Here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
