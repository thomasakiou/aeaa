import '../styles/animations.css';
import './css/Login.css';

export default function Login() {
    return (
        <div className="login-page">
            <div className="page-hero">
                <h1 className="animate-fade-up">Portal <span style={{ opacity: 0.7 }}>Login</span></h1>
                <p className="animate-fade-up-d1">Access your conference dashboard, submissions, and tickets.</p>
            </div>
            <div className="page-body">
                <div className="login-card glass-panel animate-scale-in">
                    <img src="/img/neco.png" alt="NECO Logo" className="login-logo animate-float" />
                    <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-green-dark)', marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Sign in to your AEAA Conference portal</p>
                    <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group animate-fade-up-d2">
                            <label>Email Address</label>
                            <input type="email" placeholder="you@example.com" className="form-input" />
                        </div>
                        <div className="input-group animate-fade-up-d3">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" className="form-input" />
                        </div>
                        <button type="submit" className="btn btn-primary form-btn animate-fade-up-d4">Sign In</button>
                    </form>
                    <p className="login-footer animate-fade-up-d5">
                        Don't have an account? <a href="/registration">Register Here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
