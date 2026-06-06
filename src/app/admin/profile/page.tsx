'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { Inter, Gowun_Dodum } from 'next/font/google';
import {
    ArrowLeft,
    Eye,
    EyeOff,
    KeyRound,
    ShieldCheck,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

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

interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}

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

const Spinner = () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    // ── Security question state ──
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
    const [questionIsSet, setQuestionIsSet] = useState(false);
    const [sqLoading, setSqLoading] = useState(true);

    const [sqCurrentPw, setSqCurrentPw] = useState('');
    const [sqQuestion, setSqQuestion] = useState(SECURITY_QUESTIONS[0]);
    const [sqAnswer, setSqAnswer] = useState('');
    const [sqPending, setSqPending] = useState(false);
    const [sqError, setSqError] = useState<string | null>(null);
    const [sqSuccess, setSqSuccess] = useState(false);
    const [showSqPw, setShowSqPw] = useState(false);

    // ── Change password state ──
    const [cpCurrent, setCpCurrent] = useState('');
    const [cpNew, setCpNew] = useState('');
    const [cpConfirm, setCpConfirm] = useState('');
    const [showCpCurrent, setShowCpCurrent] = useState(false);
    const [showCpNew, setShowCpNew] = useState(false);
    const [showCpConfirm, setShowCpConfirm] = useState(false);
    const [cpPending, setCpPending] = useState(false);
    const [cpError, setCpError] = useState<string | null>(null);
    const [cpSuccess, setCpSuccess] = useState(false);

    const strength = getPasswordStrength(cpNew);

    useEffect(() => {
        if (!isPending && !session?.user) router.push('/sign-in');
        if (!isPending && session?.user && session.user.role !== 'admin') router.push('/');
    }, [isPending, session, router]);

    useEffect(() => {
        if (!session?.user) return;
        fetch('/api/user/security-question')
            .then((r) => r.json())
            .then((data) => {
                setCurrentQuestion(data.question ?? null);
                setQuestionIsSet(data.isSet ?? false);
                if (data.question) setSqQuestion(data.question);
            })
            .catch(() => {})
            .finally(() => setSqLoading(false));
    }, [session]);

    async function handleSqSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSqError(null);
        setSqSuccess(false);
        setSqPending(true);
        try {
            const res = await fetch('/api/user/security-question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: sqCurrentPw,
                    question: sqQuestion,
                    answer: sqAnswer,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setSqError(data.error ?? 'Failed to update security question.');
            } else {
                setSqSuccess(true);
                setCurrentQuestion(sqQuestion);
                setQuestionIsSet(true);
                setSqCurrentPw('');
                setSqAnswer('');
            }
        } catch {
            setSqError('Network error. Please try again.');
        } finally {
            setSqPending(false);
        }
    }

    async function handleCpSubmit(e: React.FormEvent) {
        e.preventDefault();
        setCpError(null);
        setCpSuccess(false);
        if (cpNew !== cpConfirm) {
            setCpError('New passwords do not match.');
            return;
        }
        setCpPending(true);
        try {
            const res = await authClient.changePassword({
                currentPassword: cpCurrent,
                newPassword: cpNew,
                revokeOtherSessions: false,
            });
            if (res.error) {
                setCpError(res.error.message ?? 'Failed to change password.');
            } else {
                setCpSuccess(true);
                setCpCurrent('');
                setCpNew('');
                setCpConfirm('');
            }
        } catch {
            setCpError('Network error. Please try again.');
        } finally {
            setCpPending(false);
        }
    }

    if (isPending) {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!session?.user || session.user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center">
                <p className={`text-primary/60 text-sm ${inter.className}`}>Redirecting…</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-light ${inter.className}`}>

            {/* ── Hero banner ── */}
            <div className="w-full bg-primary pt-24 pb-12 px-6 md:px-16">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-1.5 text-accent-three/60 hover:text-accent-three text-xs mb-6 transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3 mb-1">
                        <ShieldCheck size={16} className="text-secondary" />
                        <span className="text-secondary text-xs font-semibold uppercase tracking-widest">
                            Account Settings
                        </span>
                    </div>
                    <h1 className={`text-2xl md:text-3xl text-light font-bold tracking-wide ${gowun.className}`}>
                        Security & Password
                    </h1>
                    <p className="text-accent-three/60 text-sm mt-1">
                        Manage your password and account recovery options.
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 md:px-16 py-12 space-y-10">

                {/* ── Security question notice ── */}
                {!sqLoading && !questionIsSet && (
                    <div className="flex items-start gap-3 px-4 py-4 bg-accent-two/10 border border-accent-two/30 rounded-sm">
                        <AlertCircle size={18} className="text-accent-two shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-primary/80">Security question not set</p>
                            <p className="text-xs text-primary/50 mt-0.5">
                                Set a security question below so you can recover your account if you forget your password.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Change Password ── */}
                <section className="bg-white rounded-lg border border-primary/10 p-6 space-y-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <KeyRound size={16} className="text-secondary" />
                            <h2 className={`text-lg font-semibold text-primary ${gowun.className}`}>
                                Change Password
                            </h2>
                        </div>
                        <div className="w-8 h-0.5 bg-secondary rounded-full" />
                    </div>

                    {cpSuccess && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-sm">
                            <CheckCircle size={16} className="text-secondary" />
                            <p className="text-sm text-secondary font-medium">Password changed successfully.</p>
                        </div>
                    )}

                    {cpError && (
                        <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
                            <p className="text-red-700 text-sm font-medium">{cpError}</p>
                        </div>
                    )}

                    <form onSubmit={handleCpSubmit} className="space-y-5" noValidate>
                        {/* Current password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="cp-current" className="text-sm font-medium text-primary/80">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    id="cp-current"
                                    type={showCpCurrent ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={cpCurrent}
                                    onChange={(e) => setCpCurrent(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                                />
                                <button type="button" onClick={() => setShowCpCurrent(v => !v)}
                                    aria-label={showCpCurrent ? 'Hide' : 'Show'}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors">
                                    {showCpCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="cp-new" className="text-sm font-medium text-primary/80">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="cp-new"
                                    type={showCpNew ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={cpNew}
                                    onChange={(e) => setCpNew(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                                />
                                <button type="button" onClick={() => setShowCpNew(v => !v)}
                                    aria-label={showCpNew ? 'Hide' : 'Show'}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors">
                                    {showCpNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {cpNew && (
                                <div className="mt-1 space-y-1">
                                    <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                            style={{ width: `${(strength.score / 6) * 100}%` }}
                                        />
                                    </div>
                                    <p className={`text-xs font-medium ${
                                        strength.label === 'Strong' ? 'text-secondary' :
                                        strength.label === 'Fair' ? 'text-accent-two' : 'text-red-500'
                                    }`}>{strength.label}</p>
                                </div>
                            )}
                            <ul className="mt-1 space-y-0.5">
                                {[
                                    [/[A-Z]/.test(cpNew), 'Uppercase letter'],
                                    [/[a-z]/.test(cpNew), 'Lowercase letter'],
                                    [/[0-9]/.test(cpNew), 'Number'],
                                    [/[^A-Za-z0-9]/.test(cpNew), 'Special character'],
                                    [cpNew.length >= 8, 'At least 8 characters'],
                                ].map(([met, label]) => (
                                    <li key={String(label)} className={`text-xs flex items-center gap-1.5 ${met ? 'text-secondary' : 'text-primary/30'}`}>
                                        <span className="text-[10px]">{met ? '✓' : '○'}</span>
                                        {String(label)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Confirm password */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="cp-confirm" className="text-sm font-medium text-primary/80">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="cp-confirm"
                                    type={showCpConfirm ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={cpConfirm}
                                    onChange={(e) => setCpConfirm(e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full border-b-2 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none transition-colors duration-200 ${
                                        cpConfirm && cpConfirm !== cpNew
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-primary/20 focus:border-secondary'
                                    }`}
                                />
                                <button type="button" onClick={() => setShowCpConfirm(v => !v)}
                                    aria-label={showCpConfirm ? 'Hide' : 'Show'}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors">
                                    {showCpConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {cpConfirm && cpConfirm !== cpNew && (
                                <p className="text-xs text-red-500 mt-0.5">Passwords do not match.</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={cpPending || !cpCurrent || !cpNew || !cpConfirm || cpNew !== cpConfirm}
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-light font-semibold py-2.5 px-6 rounded-sm transition-colors duration-300"
                        >
                            {cpPending ? <><Spinner />Saving…</> : <><KeyRound size={16} />Update Password</>}
                        </button>
                    </form>
                </section>

                {/* ── Security Question ── */}
                <section className="bg-white rounded-lg border border-primary/10 p-6 space-y-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-secondary" />
                            <h2 className={`text-lg font-semibold text-primary ${gowun.className}`}>
                                Security Question
                            </h2>
                        </div>
                        <div className="w-8 h-0.5 bg-secondary rounded-full" />
                        {!sqLoading && currentQuestion && (
                            <p className="text-xs text-primary/50 pt-1">
                                Current question: <span className="font-medium text-primary/70">{currentQuestion}</span>
                            </p>
                        )}
                    </div>

                    {sqSuccess && (
                        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-sm">
                            <CheckCircle size={16} className="text-secondary" />
                            <p className="text-sm text-secondary font-medium">
                                Security question {questionIsSet ? 'updated' : 'set'} successfully.
                            </p>
                        </div>
                    )}

                    {sqError && (
                        <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
                            <p className="text-red-700 text-sm font-medium">{sqError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSqSubmit} className="space-y-5" noValidate>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="sq-current-pw" className="text-sm font-medium text-primary/80">
                                Current Password <span className="text-primary/40 font-normal">(required to confirm identity)</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="sq-current-pw"
                                    type={showSqPw ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={sqCurrentPw}
                                    onChange={(e) => setSqCurrentPw(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                                />
                                <button type="button" onClick={() => setShowSqPw(v => !v)}
                                    aria-label={showSqPw ? 'Hide' : 'Show'}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors">
                                    {showSqPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="sq-question" className="text-sm font-medium text-primary/80">
                                Security Question
                            </label>
                            <select
                                id="sq-question"
                                value={sqQuestion}
                                onChange={(e) => setSqQuestion(e.target.value)}
                                className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary focus:outline-none focus:border-secondary transition-colors duration-200 cursor-pointer"
                            >
                                {SECURITY_QUESTIONS.map((q) => (
                                    <option key={q} value={q}>{q}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="sq-answer" className="text-sm font-medium text-primary/80">
                                Your Answer
                            </label>
                            <input
                                id="sq-answer"
                                type="text"
                                autoComplete="off"
                                required
                                value={sqAnswer}
                                onChange={(e) => setSqAnswer(e.target.value)}
                                placeholder="Enter your answer"
                                className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
                            />
                            <p className="text-xs text-primary/40 mt-0.5">
                                Answers are stored securely and are not case-sensitive.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={sqPending || !sqCurrentPw || !sqAnswer.trim()}
                            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-sm transition-colors duration-300"
                        >
                            {sqPending
                                ? <><Spinner />Saving…</>
                                : <><ShieldCheck size={16} />{questionIsSet ? 'Update' : 'Set'} Security Question</>}
                        </button>
                    </form>
                </section>

            </div>
        </div>
    );
}
