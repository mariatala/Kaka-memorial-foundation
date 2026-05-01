'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { HeartHandshake, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export interface Donation {
    id: number;
    name: string | null;
    email: string | null;
    amount: number;
    currency: string;
    transactionId: string;
    frequency: string;
    createdAt: string;
}

type FrequencyTab = 'all' | 'One time' | 'Monthly';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function FrequencyBadge({ frequency }: { frequency: string }) {
    const isMonthly = frequency.toLowerCase() === 'monthly';
    return (
        <span
            className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isMonthly
                    ? 'bg-secondary/10 text-secondary'
                    : 'bg-primary/10 text-primary'
            }`}
        >
            {frequency}
        </span>
    );
}

function DonationRow({ donation }: { donation: Donation }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border-b border-primary/8 last:border-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                <div className="flex-1 min-w-40">
                    <p className="font-semibold text-primary text-sm">
                        {donation.name || <span className="italic text-primary/30">Anonymous</span>}
                    </p>
                    <p className="text-xs text-primary/50 mt-0.5">
                        {donation.email || <span className="italic text-primary/30">—</span>}
                    </p>
                </div>
                <p className="font-semibold text-secondary text-sm tabular-nums">
                    {donation.currency} {donation.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <FrequencyBadge frequency={donation.frequency} />
                <p className="text-xs text-primary/40 ml-auto">{formatDate(donation.createdAt)}</p>
                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-label="Toggle transaction details"
                    className="text-primary/40 hover:text-secondary transition-colors"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>
            {expanded && (
                <div className="px-6 pb-4 bg-primary/[0.02]">
                    <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Transaction ID</p>
                    <p className="text-xs text-primary/60 font-mono break-all">{donation.transactionId}</p>
                </div>
            )}
        </div>
    );
}

export default function DonationsTable({ donations }: { donations: Donation[] }) {
    const [activeTab, setActiveTab] = useState<FrequencyTab>('all');

    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    const counts: Record<FrequencyTab, number> = {
        all: donations.length,
        'One time': donations.filter((d) => d.frequency === 'One time').length,
        Monthly: donations.filter((d) => d.frequency === 'Monthly').length,
    };

    const filtered =
        activeTab === 'all'
            ? donations
            : donations.filter((d) => d.frequency === activeTab);

    const tabs: { key: FrequencyTab; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'One time', label: 'One-time' },
        { key: 'Monthly', label: 'Monthly' },
    ];

    return (
        <div className={inter.className}>
            {/* Summary card */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="bg-white rounded-lg border border-primary/10 px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                        <HeartHandshake size={18} className="text-secondary" />
                    </div>
                    <div>
                        <p className="text-xs text-primary/40 font-medium uppercase tracking-wider">Total Raised</p>
                        <p className="text-xl font-bold text-secondary tabular-nums">
                            USD {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-primary/10 px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <RefreshCw size={18} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-primary/40 font-medium uppercase tracking-wider">Transactions</p>
                        <p className="text-xl font-bold text-primary tabular-nums">{donations.length}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-primary/10">
                {tabs.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                            activeTab === key
                                ? 'text-secondary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:rounded-t-full'
                                : 'text-primary/50 hover:text-primary'
                        }`}
                    >
                        {label}
                        <span
                            className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                                activeTab === key
                                    ? 'bg-secondary/10 text-secondary'
                                    : 'bg-primary/8 text-primary/40'
                            }`}
                        >
                            {counts[key]}
                        </span>
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <p className="text-primary/40 text-sm">No donations recorded yet.</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap items-center gap-x-6 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
                        <span className="flex-1 min-w-40">Donor</span>
                        <span>Amount</span>
                        <span>Frequency</span>
                        <span className="ml-auto">Date</span>
                        <span className="w-4" />
                    </div>
                    <div className="bg-white rounded-lg border border-primary/10">
                        {filtered.map((d) => (
                            <DonationRow key={d.id} donation={d} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
