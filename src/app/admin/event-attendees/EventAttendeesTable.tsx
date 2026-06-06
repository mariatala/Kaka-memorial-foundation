'use client';

import { useState, useMemo } from 'react';
import { Inter } from 'next/font/google';
import { ChevronDown, ChevronUp, Search, Download, CalendarDays, MapPin } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export interface EventAttendee {
    id: number;
    name: string;
    email: string;
    phone: string;
    comments: string;
    createdAt: string;
    eventCategoryId: number | null;
    eventTitle: string;
    eventDate: string | null;
    eventLocation: string;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function EventBadge({ title }: { title: string }) {
    return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
            <CalendarDays size={10} />
            {title}
        </span>
    );
}

function AttendeeRow({ attendee }: { attendee: EventAttendee }) {
    const [expanded, setExpanded] = useState(false);
    const hasDetails = attendee.comments || attendee.eventLocation;

    return (
        <div className="border-b border-primary/8 last:border-0">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                <div className="flex-1 min-w-40">
                    <p className="font-semibold text-primary text-sm">{attendee.name}</p>
                    <p className="text-xs text-primary/50 mt-0.5">{attendee.phone}</p>
                </div>
                <EventBadge title={attendee.eventTitle} />
                <p className="text-sm text-primary/60 hidden sm:block">
                    {attendee.email || <span className="italic text-primary/30">—</span>}
                </p>
                <p className="text-xs text-primary/40 ml-auto">{formatDate(attendee.createdAt)}</p>
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
                    {attendee.eventLocation && (
                        <div>
                            <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <MapPin size={10} /> Location
                            </p>
                            <p className="text-sm text-primary/70">{attendee.eventLocation}</p>
                        </div>
                    )}
                    {attendee.comments && (
                        <div>
                            <p className="text-xs font-medium text-primary/40 uppercase tracking-wider mb-1">Message</p>
                            <p className="text-sm text-primary/70">{attendee.comments}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function exportCsv(attendees: EventAttendee[]) {
    const headers = ['Name', 'Email', 'Phone', 'Event', 'Event Date', 'Location', 'Message', 'Registered On'];
    const rows = attendees.map((a) => [
        a.name,
        a.email,
        a.phone,
        a.eventTitle,
        a.eventDate ? formatDate(a.eventDate) : '',
        a.eventLocation,
        a.comments,
        formatDate(a.createdAt),
    ]);
    const csv = [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-attendees-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

export default function EventAttendeesTable({ attendees }: { attendees: EventAttendee[] }) {
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('all');

    const uniqueEvents = useMemo(() => {
        const seen = new Map<string, string>();
        for (const a of attendees) {
            seen.set(a.eventTitle, a.eventTitle);
        }
        return Array.from(seen.keys()).sort();
    }, [attendees]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return attendees.filter((a) => {
            const matchesEvent = selectedEvent === 'all' || a.eventTitle === selectedEvent;
            const matchesSearch =
                !q ||
                a.name.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                a.phone.includes(q);
            return matchesEvent && matchesSearch;
        });
    }, [attendees, search, selectedEvent]);

    const countsByEvent = useMemo(() => {
        const map: Record<string, number> = {};
        for (const a of attendees) {
            map[a.eventTitle] = (map[a.eventTitle] ?? 0) + 1;
        }
        return map;
    }, [attendees]);

    return (
        <div className={inter.className}>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-primary/15 rounded-lg bg-white text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors"
                    />
                </div>
                <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="px-4 py-2.5 text-sm border border-primary/15 rounded-lg bg-white text-primary focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                >
                    <option value="all">All Events ({attendees.length})</option>
                    {uniqueEvents.map((title) => (
                        <option key={title} value={title}>
                            {title} ({countsByEvent[title] ?? 0})
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => exportCsv(filtered)}
                    disabled={filtered.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-primary/15 rounded-lg bg-white text-primary/70 hover:text-secondary hover:border-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <Download size={14} />
                    Export CSV
                </button>
            </div>

            {/* Per-event summary chips */}
            {uniqueEvents.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {uniqueEvents.map((title) => (
                        <button
                            key={title}
                            onClick={() => setSelectedEvent(selectedEvent === title ? 'all' : title)}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                                selectedEvent === title
                                    ? 'bg-secondary text-white border-secondary'
                                    : 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20'
                            }`}
                        >
                            <CalendarDays size={10} />
                            {title}
                            <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs ${
                                selectedEvent === title ? 'bg-white/20' : 'bg-secondary/20'
                            }`}>
                                {countsByEvent[title] ?? 0}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <p className="text-primary/40 text-sm">
                        {search || selectedEvent !== 'all'
                            ? 'No attendees match your filter.'
                            : 'No event registrations yet.'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Column headers */}
                    <div className="flex flex-wrap items-center gap-x-6 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary/40">
                        <span className="flex-1 min-w-40">Name / Phone</span>
                        <span>Event</span>
                        <span className="hidden sm:block">Email</span>
                        <span className="ml-auto">Registered</span>
                        <span className="w-4" />
                    </div>

                    <div className="bg-white rounded-lg border border-primary/10">
                        {filtered.map((attendee) => (
                            <AttendeeRow key={attendee.id} attendee={attendee} />
                        ))}
                    </div>

                    <p className="text-xs text-primary/30 mt-3 text-right">
                        Showing {filtered.length} of {attendees.length} registration{attendees.length !== 1 ? 's' : ''}
                    </p>
                </>
            )}
        </div>
    );
}
