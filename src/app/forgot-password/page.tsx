'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { Eye, EyeOff, ArrowLeft, KeyRound, ShieldCheck, CheckCircle } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

type Step = 'email' | 'answer' | 'reset' | 'done';

interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}

const SECURITY_QUESTIONS = [
    'What was your childhood nickname?',
    'What is the name of your first pet?',
    'What city were you born in?',
    "What is your mother's maiden name?",
    'What was the name of your elementary school?',
    'What was the make and model of your first car?',
    'What street did you grow up on?',
    "What is your oldest sibling's middle name?",
];

function getPasswordStrength(pw: string): PasswordStrength {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'bg-accent-two' };
    return { score, label: 'Strong', color: 'bg-secondary' };
}

function ForgotPasswordForm() {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const strength = getPasswordStrength(newPassword);
    const strengthWidth = `${(strength.score / 6) * 100}%`;

    async function handleEmailSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setPending(true);
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ step: 'request', email }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Something went wrong.');
            } else {
                setQuestion(data.question);
                setStep('answer');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setPending(false);
        }
    }

    async function handleAnswerSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setPending(true);
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ step: 'verify', email, answer }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Incorrect answer.');
            } else {
                setToken(data.token);
                setStep('reset');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setPending(false);
        }
    }

    async function handleResetSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setPending(true);
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ step: 'reset', email, token, newPassword }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Failed to reset password.');
            } else {
                setStep('done');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setPending(false);
        }
    }

    const Spinner = () => (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
    );

    return (
        <div className="w-full max-w-md">

            {/* ── Step indicators ── */}
            {step !== 'done' && (
                <div className="flex items-center gap-2 mb-8">
                    {(['email', 'answer', 'reset'] as const).map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                                step === s
                                    ? 'bg-secondary border-secondary text-white'
                                    : ['answer', 'reset', 'done'].indexOf(step) > i
                                        ? 'bg-secondary/20 border-secondary/40 text-secondary'
                                        : 'bg-transparent border-primary/20 text-primary/30'
                            }`}>
                                {i + 1}
                            </div>
                            {i < 2 && <div className="w-6 h-px bg-primary/15" />}
                        </div>
                    ))}
                </div>
            )}

            {/* ── Header ── */}
            <div className="mb-8 space-y-1">
                <div className="flex items-center gap-2.5 mb-3">
                    {step !== 'done' ? (
                        <KeyRound size={20} className="text-secondary" />
                    ) : (
                        <CheckCircle size={20} className="text-secondary" />
                    )}
                    <h1 className={`text-3xl md:text-4xl font-bold text-primary tracking-wide uppercase ${gowun.className}`}>
                        {step === 'email' && 'Reset Password'}
                        {step === 'answer' && 'Verify Identity'}
                        {step === 'reset' && 'New Password'}
                        {step === 'done' && 'All Done'}
                    </h1>
                </div>
                <div className="w-10 h-0.5 bg-secondary rounded-full" />
                <p className={`text-primary/60 text-sm mt-2 ${inter.className}`}>
                    {step === 'email' && 'Enter your account email address to begin.'}
                    {step === 'answer' && 'Answer your security question to verify your identity.'}
                    {step === 'reset' && 'Choose a strong new password for your account.'}
                    {step === 'done' && 'Your password has been updated. You can now sign in.'}
                </p>
            </div>

            {/* ── Error banner ── */}
            {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}

            {/* ── Step: Email ── */}
            {step === 'email' && (
                <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fp-email" className="text-sm font-medium text-primary/80">
                            Email Address
                        </label>
                        <input
                            id="fp-email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={pending || !email}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-light font-semibold py-3 rounded-sm transition-colors duration-300"
                    >
                        {pending ? <><Spinner />Checking…</> : 'Continue'}
                    </button>
                </form>
            )}

            {/* ── Step: Security Answer ── */}
            {step === 'answer' && (
                <form onSubmit={handleAnswerSubmit} className="space-y-6" noValidate>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-primary/80">Security Question</label>
                        <p className="text-primary/70 text-sm py-2.5 px-1 border-b-2 border-primary/10">
                            {question}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fp-answer" className="text-sm font-medium text-primary/80">
                            Your Answer
                        </label>
                        <input
                            id="fp-answer"
                            type="text"
                            autoComplete="off"
                            required
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter your answer"
                            className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                        />
                        <p className="text-xs text-primary/40 mt-0.5">Answers are not case-sensitive.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => { setStep('email'); setError(null); }}
                            className="flex-1 flex items-center justify-center gap-2 border border-primary/20 hover:border-primary/40 text-primary/60 font-medium py-3 rounded-sm transition-colors duration-200"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                        <button
                            type="submit"
                            disabled={pending || !answer.trim()}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-light font-semibold py-3 rounded-sm transition-colors duration-300"
                        >
                            {pending ? <><Spinner />Verifying…</> : <><ShieldCheck size={16} />Verify</>}
                        </button>
                    </div>
                </form>
            )}

            {/* ── Step: New Password ── */}
            {step === 'reset' && (
                <form onSubmit={handleResetSubmit} className="space-y-6" noValidate>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fp-new" className="text-sm font-medium text-primary/80">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="fp-new"
                                type={showNew ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew((v) => !v)}
                                aria-label={showNew ? 'Hide password' : 'Show password'}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {newPassword && (
                            <div className="mt-1 space-y-1">
                                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                        style={{ width: strengthWidth }}
                                    />
                                </div>
                                <p className={`text-xs font-medium ${
                                    strength.label === 'Strong' ? 'text-secondary' :
                                    strength.label === 'Fair' ? 'text-accent-two' : 'text-red-500'
                                }`}>
                                    {strength.label}
                                </p>
                            </div>
                        )}
                        <ul className="mt-1 space-y-0.5">
                            {[
                                [/[A-Z]/.test(newPassword), 'Uppercase letter'],
                                [/[a-z]/.test(newPassword), 'Lowercase letter'],
                                [/[0-9]/.test(newPassword), 'Number'],
                                [/[^A-Za-z0-9]/.test(newPassword), 'Special character'],
                                [newPassword.length >= 8, 'At least 8 characters'],
                            ].map(([met, label]) => (
                                <li key={String(label)} className={`text-xs flex items-center gap-1.5 ${met ? 'text-secondary' : 'text-primary/30'}`}>
                                    <span className="text-[10px]">{met ? '✓' : '○'}</span>
                                    {String(label)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fp-confirm" className="text-sm font-medium text-primary/80">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="fp-confirm"
                                type={showConfirm ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full border-b-2 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none transition-colors duration-200 ${
                                    confirmPassword && confirmPassword !== newPassword
                                        ? 'border-red-400 focus:border-red-500'
                                        : 'border-primary/20 focus:border-secondary'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {confirmPassword && confirmPassword !== newPassword && (
                            <p className="text-xs text-red-500 mt-0.5">Passwords do not match.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={
                            pending ||
                            !newPassword ||
                            !confirmPassword ||
                            newPassword !== confirmPassword
                        }
                        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors duration-300"
                    >
                        {pending ? <><Spinner />Saving…</> : <><KeyRound size={16} />Set New Password</>}
                    </button>
                </form>
            )}

            {/* ── Step: Done ── */}
            {step === 'done' && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4 py-4 bg-secondary/10 border border-secondary/20 rounded-sm">
                        <CheckCircle size={20} className="text-secondary shrink-0" />
                        <p className="text-sm text-primary/80">
                            Your password has been reset successfully. All active sessions have been signed out.
                        </p>
                    </div>
                    <Link
                        href="/sign-in"
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-light font-semibold py-3 rounded-sm transition-colors duration-300"
                    >
                        Sign In Now
                    </Link>
                </div>
            )}

            {step !== 'done' && (
                <div className="mt-8 text-center">
                    <Link href="/sign-in" className="text-xs text-primary/40 hover:text-primary/70 transition-colors">
                        ← Back to sign in
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function ForgotPasswordPage() {
    return (
        <div className={`min-h-screen bg-accent-three-light flex flex-col lg:flex-row ${inter.className}`}>

            {/* ── Left: brand panel ── */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-16">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('/cover_image.jpeg')" }}
                />
                <div className="relative z-10 flex flex-col h-full justify-center gap-12">
                    <div className="space-y-6">
                        <h2 className={`text-4xl xl:text-5xl text-light tracking-widest uppercase leading-snug ${gowun.className}`}>
                            Account<br />Recovery
                        </h2>
                        <div className="w-16 h-1 bg-secondary rounded-full" />
                        <p className="text-accent-three text-base leading-8 tracking-wide max-w-sm">
                            Verify your identity using your security question to regain access to your account.
                        </p>
                    </div>
                    <div className="space-y-3 text-accent-three/60 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-[10px] font-bold">1</div>
                            <span>Enter your email address</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-[10px] font-bold">2</div>
                            <span>Answer your security question</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-[10px] font-bold">3</div>
                            <span>Set your new password</span>
                        </div>
                    </div>
                    <p className="text-light/30 text-xs">
                        Kaka Memorial Foundation · Registered Charity 193031
                    </p>
                </div>
            </div>

            {/* ── Right: form ── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pt-24 lg:pt-16">
                <Suspense fallback={
                    <div className="w-full max-w-md space-y-6 animate-pulse">
                        <div className="h-10 bg-primary/10 rounded" />
                        <div className="h-12 bg-primary/10 rounded" />
                        <div className="h-12 bg-primary/10 rounded" />
                    </div>
                }>
                    <ForgotPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
