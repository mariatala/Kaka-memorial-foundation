'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { Plus, Pencil, Trash2, Check, X, ImageIcon, Link as LinkIcon } from 'lucide-react';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

export interface CarouselItemUI {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string | null;
    order: number;
    createdAt: string;
    updatedAt: string;
}

type FormData = {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    link: string;
    order: string;
};

function emptyForm(nextOrder = 0): FormData {
    return { title: '', description: '', imageSrc: '', imageAlt: '', link: '', order: String(nextOrder) };
}

function toFormData(item: CarouselItemUI): FormData {
    return {
        title: item.title,
        description: item.description,
        imageSrc: item.imageSrc,
        imageAlt: item.imageAlt,
        link: item.link ?? '',
        order: String(item.order),
    };
}

function validate(f: FormData): string | null {
    if (!f.title.trim()) return 'Title is required.';
    if (!f.description.trim()) return 'Description is required.';
    if (!f.imageSrc.trim()) return 'Image path or URL is required.';
    if (isNaN(parseInt(f.order, 10))) return 'Order must be a number.';
    return null;
}

const fieldCls =
    'w-full py-2.5 px-1 border-b border-primary/30 bg-transparent outline-none text-primary text-sm placeholder:text-primary/30 focus:border-secondary transition-colors duration-200';

interface ItemFormProps {
    data: FormData;
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    pending: boolean;
    error: string | null;
    submitLabel: string;
}

function ItemForm({ data, onChange, onSubmit, onCancel, pending, error, submitLabel }: ItemFormProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        className={fieldCls}
                        value={data.title}
                        onChange={e => onChange('title', e.target.value)}
                        placeholder="e.g. Water Access Advocacy"
                    />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className={`${fieldCls} resize-none`}
                        rows={3}
                        value={data.description}
                        onChange={e => onChange('description', e.target.value)}
                        placeholder="Short summary of this advocacy or project…"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Image <span className="text-red-500">*</span>{' '}
                        <span className="font-normal normal-case text-primary/30">(path or URL)</span>
                    </label>
                    <input
                        className={fieldCls}
                        value={data.imageSrc}
                        onChange={e => onChange('imageSrc', e.target.value)}
                        placeholder="/water.jpg or https://…"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Image Alt Text
                    </label>
                    <input
                        className={fieldCls}
                        value={data.imageAlt}
                        onChange={e => onChange('imageAlt', e.target.value)}
                        placeholder="Describe the image for screen readers"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-primary/50">
                        Link{' '}
                        <span className="font-normal normal-case text-primary/30">(optional — internal path or full URL)</span>
                    </label>
                    <input
                        className={fieldCls}
                        value={data.link}
                        onChange={e => onChange('link', e.target.value)}
                        placeholder="/events or https://…"
                    />
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
                        inputMode="numeric"
                        placeholder="0"
                    />
                </div>
            </div>

            {/* Image preview */}
            {data.imageSrc.trim() && (
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/50">Preview</p>
                    <div className="relative w-48 aspect-[16/10] rounded-lg overflow-hidden border border-primary/10">
                        <Image
                            src={data.imageSrc.trim()}
                            alt={data.imageAlt || 'preview'}
                            fill
                            className="object-cover"
                            unoptimized={data.imageSrc.startsWith('http')}
                        />
                    </div>
                </div>
            )}

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

export default function CarouselEditor({ items: initial }: { items: CarouselItemUI[] }) {
    const [items, setItems] = useState<CarouselItemUI[]>(initial);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<FormData>(emptyForm());
    const [editError, setEditError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [createForm, setCreateForm] = useState<FormData>(emptyForm());
    const [createError, setCreateError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<number | null>(null);

    function startEdit(item: CarouselItemUI) {
        setEditingId(item.id);
        setEditForm(toFormData(item));
        setEditError(null);
        setIsCreating(false);
        setDeleteConfirmId(null);
    }

    function cancelEdit() { setEditingId(null); setEditError(null); }

    function startCreate() {
        const nextOrder = items.length > 0 ? Math.max(...items.map(i => i.order)) + 1 : 1;
        setIsCreating(true);
        setCreateForm(emptyForm(nextOrder));
        setCreateError(null);
        setEditingId(null);
        setDeleteConfirmId(null);
    }

    async function handleUpdate() {
        const err = validate(editForm);
        if (err) { setEditError(err); return; }
        setPending(true); setEditError(null);
        try {
            const res = await fetch(`/api/admin/carousel/${editingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editForm, link: editForm.link || null, order: parseInt(editForm.order, 10) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setItems(prev => prev.map(i => i.id === editingId ? data : i));
            setEditingId(null);
            setSuccessId(data.id);
            setTimeout(() => setSuccessId(null), 2500);
        } catch (err) {
            setEditError(err instanceof Error ? err.message : 'Update failed.');
        } finally { setPending(false); }
    }

    async function handleCreate() {
        const err = validate(createForm);
        if (err) { setCreateError(err); return; }
        setPending(true); setCreateError(null);
        try {
            const res = await fetch('/api/admin/carousel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...createForm, link: createForm.link || null, order: parseInt(createForm.order, 10) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setItems(prev => [...prev, data].sort((a, b) => a.order - b.order));
            setIsCreating(false);
            setSuccessId(data.id);
            setTimeout(() => setSuccessId(null), 2500);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : 'Create failed.');
        } finally { setPending(false); }
    }

    async function handleDelete(id: number) {
        setPending(true); setDeleteError(null);
        try {
            const res = await fetch(`/api/admin/carousel/${id}`, { method: 'DELETE' });
            if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
            setItems(prev => prev.filter(i => i.id !== id));
            setDeleteConfirmId(null);
            if (editingId === id) setEditingId(null);
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : 'Delete failed.');
        } finally { setPending(false); }
    }

    return (
        <div className={inter.className}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                    <h2 className={`text-xl font-semibold text-primary ${gowun.className}`}>Carousel Items</h2>
                    <div className="w-10 h-0.5 bg-secondary rounded-full" />
                </div>
                {!isCreating && (
                    <button
                        onClick={startCreate}
                        className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
                    >
                        <Plus size={15} />
                        New Item
                    </button>
                )}
            </div>

            {deleteError && (
                <div className="mb-4 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm flex items-center justify-between">
                    <p className="text-red-700 text-sm">{deleteError}</p>
                    <button onClick={() => setDeleteError(null)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                </div>
            )}

            {isCreating && (
                <div className="bg-white rounded-lg border border-secondary/30 px-6 py-5 mb-6 shadow-sm">
                    <p className={`text-sm font-semibold text-primary mb-5 ${gowun.className}`}>New Carousel Item</p>
                    <ItemForm
                        data={createForm}
                        onChange={(name, value) => setCreateForm(prev => ({ ...prev, [name]: value }))}
                        onSubmit={handleCreate}
                        onCancel={() => { setIsCreating(false); setCreateError(null); }}
                        pending={pending}
                        error={createError}
                        submitLabel="Add Item"
                    />
                </div>
            )}

            {items.length === 0 ? (
                <div className="bg-white rounded-lg border border-primary/10 py-16 text-center">
                    <ImageIcon size={32} className="mx-auto text-primary/20 mb-3" />
                    <p className="text-primary/40 text-sm">No carousel items yet. Add one above.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`bg-white rounded-lg border overflow-hidden transition-colors duration-500 ${
                                successId === item.id ? 'border-secondary/50 shadow-sm' : 'border-primary/10'
                            }`}
                        >
                            <div className="flex items-start gap-4 px-6 py-5">
                                {/* Thumbnail */}
                                <div className="relative w-20 aspect-[16/10] rounded-md overflow-hidden border border-primary/10 shrink-0">
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt || item.title}
                                        fill
                                        className="object-cover"
                                        unoptimized={item.imageSrc.startsWith('http')}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-primary text-sm leading-snug">{item.title}</p>
                                    <p className="text-xs text-primary/50 mt-1 line-clamp-2">{item.description}</p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <span className="text-xs text-primary/40">Order: {item.order}</span>
                                        {item.link && (
                                            <span className="flex items-center gap-1 text-xs text-secondary/70">
                                                <LinkIcon size={10} />
                                                {item.link}
                                            </span>
                                        )}
                                        {successId === item.id && (
                                            <span className="text-xs text-secondary font-medium">✓ Saved</span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                {editingId !== item.id && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary/60 hover:text-secondary border border-primary/20 hover:border-secondary/40 rounded-sm transition-colors"
                                        >
                                            <Pencil size={12} />
                                            Edit
                                        </button>

                                        {deleteConfirmId === item.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(item.id)}
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
                                                onClick={() => { setDeleteConfirmId(item.id); setDeleteError(null); }}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 rounded-sm transition-colors"
                                            >
                                                <Trash2 size={12} />
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {editingId === item.id && (
                                <div className="border-t border-primary/10 px-6 py-5 bg-primary/[0.02]">
                                    <p className={`text-sm font-semibold text-primary mb-5 ${gowun.className}`}>
                                        Editing: {item.title}
                                    </p>
                                    <ItemForm
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
