'use client';

import { useState } from 'react';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { Plus, Pencil, Trash2, Check, X, CalendarDays, MapPin } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

export interface EventCategoryUI {
    id: number;
    title: string;
    subtitle: string;
    about: string;
    date: string | null;
    location: string;
    imageUrl: string;
    background: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

type FormData = {
    title: string;
    subtitle: string;
    about: string;
    date: string;
    location: string;
    imageUrl: string;
    background: string;
    order: string;
};

const BG_OPTIONS = [
    { value: 'bg-secondary', label: 'Teal' },
    { value: 'bg-accent-one', label: 'Orange' },
    { value: 'bg-accent-two', label: 'Blue' },
    { value: 'bg-primary', label: 'Dark Green' },
];

function emptyForm(): FormData {
    return { title: '', subtitle: '', about: '', date: '', location: '', imageUrl: '', background: 'bg-secondary', order: '0' };
}

function toFormData(event: EventCategoryUI): FormData {
    return {
        title: event.title,
        subtitle: event.subtitle,
        about: event.about,
        date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
        location: event.location,
        imageUrl: event.imageUrl,
        background: event.background,
        order: String(event.order),
    };
}

function formatDate(iso: string | null) {
    if (!iso) return 'No date set';
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

const fieldCls = 'w-full py-2.5 px-1 border-b border-primary/30 bg-transparent outline-none text-primary text-sm placeholder:text-primary/30 focus:border-secondary transition-colors duration-200';

interface EventFormProps {
    data: FormData;
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    pending: boolean;
    error: string | null;
    submitLabel: string;
}

function EventForm({ data, onChange, onSubmit, onCancel, pending, error, submitLabel }: EventFormProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={fieldCls}
                        value={data.title}
                        onChange={e => onChange('title', e.target.value)}
                        placeholder="Event category title"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">Subtitle</label>
                    <input
                        className={fieldCls}
                        value={data.subtitle}
                        onChange={e => onChange('subtitle', e.target.value)}
                        placeholder="Short tagline"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">Date &amp; Time</label>
                    <input
                        type="datetime-local"
                        className={fieldCls}
                        value={data.date}
                        onChange={e => onChange('date', e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">Location</label>
                    <input
                        className={fieldCls}
                        value={data.location}
                        onChange={e => onChange('location', e.target.value)}
                        placeholder="Venue or city"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">Image URL</label>
                    <input
                        className={fieldCls}
                        value={data.imageUrl}
                        onChange={e => onChange('imageUrl', e.target.value)}
                        placeholder="/school.png or https://…"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">Card Colour</label>
                    <select
                        className={`${fieldCls} cursor-pointer`}
                        value={data.background}
                        onChange={e => onChange('background', e.target.value)}
                    >
                        {BG_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Display Order{' '}
                        <span className="font-normal normal-case text-primary/30">(lower = appears first)</span>
                    </label>
                    <input
                        className={fieldCls}
                        value={data.order}
                        onChange={e => onChange('order', e.target.value)}
                        placeholder="0"
                        inputMode="numeric"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                    About <span className="font-normal normal-case text-primary/30">(description shown on the events page)</span>
                </label>
                <textarea
                    className={`${fieldCls} resize-none`}
                    rows={4}
                    value={data.about}
                    onChange={e => onChange('about', e.target.value)}
                    placeholder="Describe this event category…"
                />
            </div>

            {error && (
                <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <div className="flex items-center gap-3 pt-1">
                <button
                    onClick={onSubmit}
                    disabled={pending}
                    className="flex items-center gap-1.5 px-5 py-2 bg-secondary text-white text-sm font-semibold rounded-sm hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {pending
                        ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : <Check size={14} />}
                    {submitLabel}
                </button>
                <button
                    onClick={onCancel}
                    disabled={pending}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary/60 hover:text-primary border border-primary/20 rounded-sm transition-colors"
                >
                    <X size={14} />
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default function EventsEditor({ events: initial }: { events: EventCategoryUI[] }) {
    const [events, setEvents] = useState<EventCategoryUI[]>(initial);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<FormData>(emptyForm());
    const [editError, setEditError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [createForm, setCreateForm] = useState<FormData>(emptyForm());
    const [createError, setCreateError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    function startEdit(event: EventCategoryUI) {
        setEditingId(event.id);
        setEditForm(toFormData(event));
        setEditError(null);
        setIsCreating(false);
        setCreateError(null);
        setDeleteConfirmId(null);
    }

    function cancelEdit() {
        setEditingId(null);
        setEditError(null);
    }

    function startCreate() {
        const nextOrder = events.length > 0 ? Math.max(...events.map(e => e.order)) + 1 : 1;
        setIsCreating(true);
        setCreateForm({ ...emptyForm(), order: String(nextOrder) });
        setCreateError(null);
        setEditingId(null);
        setEditError(null);
        setDeleteConfirmId(null);
    }

    async function handleUpdate() {
        if (!editForm.title.trim()) { setEditError('Title is required.'); return; }
        setPending(true); setEditError(null);
        try {
            const res = await fetch(`/api/admin/events/${editingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editForm, date: editForm.date || null, order: parseInt(editForm.order, 10) || 0 }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setEvents(prev => prev.map(e => e.id === editingId ? data : e));
            setEditingId(null);
        } catch (err) {
            setEditError(err instanceof Error ? err.message : 'Update failed.');
        } finally {
            setPending(false);
        }
    }

    async function handleCreate() {
        if (!createForm.title.trim()) { setCreateError('Title is required.'); return; }
        setPending(true); setCreateError(null);
        try {
            const res = await fetch('/api/admin/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...createForm, date: createForm.date || null, order: parseInt(createForm.order, 10) || 0 }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setEvents(prev => [...prev, data]);
            setCreateForm(emptyForm());
            setIsCreating(false);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : 'Create failed.');
        } finally {
            setPending(false);
        }
    }

    async function handleDelete(id: number) {
        setPending(true); setDeleteError(null);
        try {
            const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
            if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
            setEvents(prev => prev.filter(e => e.id !== id));
            setDeleteConfirmId(null);
            if (editingId === id) setEditingId(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed.');
        } finally {
            setPending(false);
        }
    }

    return (
        <div className={inter.className}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                    <h2 className={`text-xl font-semibold text-primary ${gowun.className}`}>Event Categories</h2>
                    <div className="w-10 h-0.5 bg-secondary rounded-full" />
                </div>
                {!isCreating && (
                    <button
                        onClick={startCreate}
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
                    >
                        <Plus size={15} />
                        New Event
                    </button>
                )}
            </div>

            {/* Delete error banner */}
            {deleteError && (
                <div className="mb-4 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm flex items-center justify-between">
                    <p className="text-red-700 text-sm">{deleteError}</p>
                    <button onClick={() => setDeleteError(null)} className="text-red-400 hover:text-red-600">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Create form */}
            {isCreating && (
                <div className="bg-white rounded-lg border border-secondary/30 px-6 py-5 mb-6 shadow-sm">
                    <p className={`text-sm font-semibold text-primary mb-5 ${gowun.className}`}>New Event Category</p>
                    <EventForm
                        data={createForm}
                        onChange={(name, value) => setCreateForm(prev => ({ ...prev, [name]: value }))}
                        onSubmit={handleCreate}
                        onCancel={() => { setIsCreating(false); setCreateError(null); }}
                        pending={pending}
                        error={createError}
                        submitLabel="Create Event"
                    />
                </div>
            )}

            {/* Event list */}
            {events.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <p className="text-primary/40 text-sm">No event categories yet. Create one above.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white rounded-lg border border-primary/10 overflow-hidden">

                            {/* Card row */}
                            <div className="flex items-start gap-4 px-6 py-5">
                                {/* Colour swatch */}
                                <div className={`w-1.5 self-stretch rounded-full shrink-0 ${event.background}`} />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-primary">{event.title}</p>
                                    {event.subtitle && (
                                        <p className="text-sm text-primary/50 mt-0.5">{event.subtitle}</p>
                                    )}
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <span className="flex items-center gap-1 text-xs text-primary/40">
                                            <CalendarDays size={12} />
                                            {formatDate(event.date)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-primary/40">
                                            <MapPin size={12} />
                                            {event.location || 'Location TBA'}
                                        </span>
                                        <span className="text-xs text-primary/40">Order: {event.order}</span>
                                    </div>
                                    {event.about && editingId !== event.id && (
                                        <p className="text-sm text-primary/50 mt-2 line-clamp-2">{event.about}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                {editingId !== event.id && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => startEdit(event)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary/60 hover:text-secondary border border-primary/20 hover:border-secondary/40 rounded-sm transition-colors"
                                        >
                                            <Pencil size={12} />
                                            Edit
                                        </button>

                                        {deleteConfirmId === event.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    disabled={pending}
                                                    className="px-3 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(null)}
                                                    className="px-3 py-1.5 text-xs font-medium text-primary/60 border border-primary/20 rounded-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => { setDeleteConfirmId(event.id); setDeleteError(null); }}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 rounded-sm transition-colors"
                                            >
                                                <Trash2 size={12} />
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Inline edit form */}
                            {editingId === event.id && (
                                <div className="border-t border-primary/10 px-6 py-5 bg-primary/[0.02]">
                                    <p className={`text-sm font-semibold text-primary mb-5 ${gowun.className}`}>
                                        Editing: {event.title}
                                    </p>
                                    <EventForm
                                        data={editForm}
                                        onChange={(name, value) => setEditForm(prev => ({ ...prev, [name]: value }))}
                                        onSubmit={handleUpdate}
                                        onCancel={cancelEdit}
                                        pending={pending}
                                        error={editError}
                                        submitLabel="Save Changes"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
