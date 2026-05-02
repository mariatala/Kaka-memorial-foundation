'use client';

import { useState, useMemo } from 'react';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { Trash2, X, Search, Copy, Check, Mail } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

export interface MembershipUI {
    id: number;
    email: string;
    createdAt: string;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
    });
}

export default function MembershipsTable({ memberships: initial }: { memberships: MembershipUI[] }) {
    const [memberships, setMemberships] = useState<MembershipUI[]>(initial);
    const [query, setQuery] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [copied, setCopied] = useState(false);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return memberships;
        return memberships.filter(m => m.email.toLowerCase().includes(q));
    }, [memberships, query]);

    async function handleDelete(id: number) {
        setPending(true);
        setDeleteError(null);
        try {
            const res = await fetch(`/api/admin/memberships/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.message);
            }
            setMemberships(prev => prev.filter(m => m.id !== id));
            setDeleteConfirmId(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed.');
        } finally {
            setPending(false);
        }
    }

    function copyEmails() {
        const list = filtered.map(m => m.email).join(', ');
        navigator.clipboard.writeText(list).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className={inter.className}>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div className="space-y-1">
                    <h2 className={`text-xl font-semibold text-primary ${gowun.className}`}>
                        Subscribers
                    </h2>
                    <div className="w-10 h-0.5 bg-secondary rounded-full" />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-56">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                        <input
                            type="search"
                            placeholder="Filter by email…"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm border border-primary/20 rounded-sm bg-white text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors"
                        />
                    </div>

                    {/* Copy button */}
                    <button
                        onClick={copyEmails}
                        disabled={filtered.length === 0}
                        title={`Copy ${filtered.length} email${filtered.length !== 1 ? 's' : ''} to clipboard`}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-primary/20 rounded-sm text-primary/70 hover:text-primary hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                    >
                        {copied ? <Check size={13} className="text-secondary" /> : <Copy size={13} />}
                        {copied ? 'Copied!' : `Copy${filtered.length < memberships.length ? ` ${filtered.length}` : ' all'}`}
                    </button>
                </div>
            </div>

            {/* Delete error banner */}
            {deleteError && (
                <div className="mb-4 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm flex items-center justify-between">
                    <p className="text-red-700 text-sm">{deleteError}</p>
                    <button onClick={() => setDeleteError(null)} className="text-red-400 hover:text-red-600 ml-3">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Empty states */}
            {memberships.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-20 text-center">
                    <Mail size={32} className="mx-auto text-primary/20 mb-3" />
                    <p className="text-primary/40 text-sm">No subscribers yet.</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <p className="text-primary/40 text-sm">No results for &ldquo;{query}&rdquo;.</p>
                    <button onClick={() => setQuery('')} className="mt-2 text-xs text-secondary hover:underline">
                        Clear filter
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-primary/10 overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_auto_auto] items-center px-6 py-3 border-b border-primary/8 bg-primary/[0.025]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary/50">Email</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary/50 hidden sm:block pr-8">Subscribed</span>
                        <span className="sr-only">Actions</span>
                    </div>

                    {/* Rows */}
                    <ul className="divide-y divide-primary/6">
                        {filtered.map(m => (
                            <li key={m.id} className="grid grid-cols-[1fr_auto_auto] items-center px-6 py-4 hover:bg-primary/[0.015] transition-colors">
                                {/* Email */}
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Mail size={13} className="text-secondary" />
                                    </div>
                                    <span className="text-sm text-primary font-medium truncate">{m.email}</span>
                                </div>

                                {/* Date */}
                                <span className="text-xs text-primary/45 hidden sm:block pr-8 whitespace-nowrap">
                                    {formatDate(m.createdAt)}
                                </span>

                                {/* Delete */}
                                <div className="flex items-center gap-1 shrink-0">
                                    {deleteConfirmId === m.id ? (
                                        <>
                                            <button
                                                onClick={() => handleDelete(m.id)}
                                                disabled={pending}
                                                className="px-2.5 py-1 text-xs font-semibold bg-red-500 text-white rounded-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
                                            >
                                                {pending ? '…' : 'Remove'}
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirmId(null)}
                                                className="px-2.5 py-1 text-xs font-medium text-primary/60 border border-primary/20 rounded-sm hover:text-primary transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => { setDeleteConfirmId(m.id); setDeleteError(null); }}
                                            className="p-1.5 text-red-300 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            aria-label={`Remove ${m.email}`}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Footer count */}
                    <div className="px-6 py-3 border-t border-primary/8 bg-primary/[0.015]">
                        <p className="text-xs text-primary/40">
                            {filtered.length === memberships.length
                                ? `${memberships.length} subscriber${memberships.length !== 1 ? 's' : ''}`
                                : `${filtered.length} of ${memberships.length} subscribers`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
