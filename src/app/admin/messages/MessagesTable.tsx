'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function MessageRow({ msg }: { msg: Message }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border-b border-primary/8 last:border-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                {/* Sender */}
                <div className="flex-1 min-w-40">
                    <p className="font-semibold text-primary text-sm">{msg.name}</p>
                    <p className="text-xs text-primary/50 mt-0.5">{msg.email}</p>
                </div>

                {/* Subject */}
                <p className="text-sm text-primary/70 hidden sm:block max-w-xs truncate">
                    {msg.subject || <span className="italic text-primary/30">No subject</span>}
                </p>

                {/* Date */}
                <p className="text-xs text-primary/40 ml-auto">{formatDate(msg.createdAt)}</p>

                {/* Expand toggle */}
                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-label="Toggle message"
                    className="text-primary/40 hover:text-secondary transition-colors"
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {expanded && (
                <div className="px-6 pb-5 bg-primary/[0.02] space-y-3">
                    {msg.subject && (
                        <div>
                            <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Subject</p>
                            <p className="text-sm text-primary/80">{msg.subject}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Message</p>
                        <p className="text-sm text-primary/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MessagesTable({ messages }: { messages: Message[] }) {
    return (
        <div className={inter.className}>
            {/* Summary card */}
            <div className="mb-8">
                <div className="bg-white rounded-lg border border-primary/10 px-6 py-4 inline-flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent-one/10 flex items-center justify-center shrink-0">
                        <MessageSquare size={18} className="text-accent-one" />
                    </div>
                    <div>
                        <p className="text-xs text-primary/40 font-medium uppercase tracking-wider">Total Messages</p>
                        <p className="text-xl font-bold text-primary tabular-nums">{messages.length}</p>
                    </div>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <MessageSquare size={32} className="mx-auto text-primary/20 mb-3" />
                    <p className="text-primary/40 text-sm">No messages received yet.</p>
                </div>
            ) : (
                <>
                    {/* Column headers */}
                    <div className="flex flex-wrap items-center gap-x-6 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
                        <span className="flex-1 min-w-40">Sender</span>
                        <span className="hidden sm:block">Subject</span>
                        <span className="ml-auto">Date</span>
                        <span className="w-4" />
                    </div>

                    <div className="bg-white rounded-lg border border-primary/10">
                        {messages.map((msg) => (
                            <MessageRow key={msg.id} msg={msg} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
