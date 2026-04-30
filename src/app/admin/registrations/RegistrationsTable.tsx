'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { Users, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export interface Registration {
    id: number;
    registrationType: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    message: string;
    createdAt: string;
}

type Tab = 'all' | 'partner' | 'volunteer';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function TypeBadge({ type }: { type: string }) {
    const isPartner = type === 'partner';
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isPartner
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary/10 text-secondary'
            }`}
        >
            {isPartner ? <HeartHandshake size={11} /> : <Users size={11} />}
            {type}
        </span>
    );
}

function RegistrationRow({ reg }: { reg: Registration }) {
    const [expanded, setExpanded] = useState(false);
    const hasDetails = reg.address || reg.message;

    return (
        <div className="border-b border-primary/8 last:border-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                <div className="flex-1 min-w-40">
                    <p className="font-semibold text-primary text-sm">{reg.name}</p>
                    <p className="text-xs text-primary/50 mt-0.5">{reg.phone}</p>
                </div>
                <TypeBadge type={reg.registrationType} />
                <p className="text-sm text-primary/60 hidden sm:block">
                    {reg.email || <span className="italic text-primary/30">—</span>}
                </p>
                <p className="text-xs text-primary/40 ml-auto">{formatDate(reg.createdAt)}</p>
                {hasDetails && (
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        aria-label="Toggle details"
                        className="text-primary/40 hover:text-secondary transition-colors"
                    >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                )}
            </div>
            {expanded && hasDetails && (
                <div className="px-6 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-primary/2">
                    {reg.address && (
                        <div>
                            <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Address</p>
                            <p className="text-sm text-primary/70">{reg.address}</p>
                        </div>
                    )}
                    {reg.message && (
                        <div>
                            <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Message</p>
                            <p className="text-sm text-primary/70">{reg.message}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
    const [activeTab, setActiveTab] = useState<Tab>('all');

    const counts = {
        all: registrations.length,
        partner: registrations.filter((r) => r.registrationType === 'partner').length,
        volunteer: registrations.filter((r) => r.registrationType === 'volunteer').length,
    };

    const filtered =
        activeTab === 'all'
            ? registrations
            : registrations.filter((r) => r.registrationType === activeTab);

    const tabs: { key: Tab; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'partner', label: 'Partners' },
        { key: 'volunteer', label: 'Volunteers' },
    ];

    return (
        <div className={inter.className}>
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
                    <p className="text-primary/40 text-sm">No {activeTab === 'all' ? '' : activeTab} registrations yet.</p>
                </div>
            ) : (
                <>
                    {/* Column headers */}
                    <div className="flex flex-wrap items-center gap-x-6 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
                        <span className="flex-1 min-w-40">Name / Phone</span>
                        <span>Type</span>
                        <span className="hidden sm:block">Email</span>
                        <span className="ml-auto">Date</span>
                        <span className="w-4" />
                    </div>

                    <div className="bg-white rounded-lg border border-primary/10">
                        {filtered.map((reg) => (
                            <RegistrationRow key={reg.id} reg={reg} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
