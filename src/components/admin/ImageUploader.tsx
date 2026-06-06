"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Plus, Link, Image as ImageIcon, Loader2 } from "lucide-react";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
};

export default function ImageUploader({ images, onChange, max = 10 }: Props) {
  const [uploading, setUploading] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [urlMode, setUrlMode] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File, index?: number) => {
    const form = new FormData();
    form.append("file", file);
    const idx = index ?? images.length;
    setUploading(idx);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Upload failed");
      }
      const { url } = await res.json();
      if (index !== undefined) {
        const next = [...images];
        next[index] = url;
        onChange(next);
      } else {
        onChange([...images, url]);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : "Błąd uploadu");
    } finally {
      setUploading(null);
    }
  }, [images, onChange]);

  const handleFiles = useCallback((files: FileList | null, index?: number) => {
    if (!files?.length) return;
    if (index !== undefined) {
      uploadFile(files[0], index);
    } else {
      Array.from(files).slice(0, max - images.length).forEach((f) => uploadFile(f));
    }
  }, [uploadFile, images.length, max]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const remove = (i: number) => onChange(images.filter((_, j) => j !== i));
  const updateUrl = (i: number, val: string) => {
    const next = [...images];
    next[i] = val;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {/* Existing images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
              {img ? (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon size={24} className="text-zinc-600" />
                </div>
              )}

              {uploading === i && (
                <div className="absolute inset-0 bg-zinc-950/70 flex items-center justify-center">
                  <Loader2 size={20} className="text-amber-400 animate-spin" />
                </div>
              )}

              {/* Actions on hover */}
              <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                  <Upload size={12} /> Zmień
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files, i)} />
                </label>
                <button
                  type="button"
                  onClick={() => setUrlMode(urlMode === i ? null : i)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Link size={12} /> URL
                </button>
              </div>

              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>

              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-amber-500 text-zinc-950 text-xs font-bold px-1.5 py-0.5 rounded">
                  Główne
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* URL input for selected slot */}
      {urlMode !== null && (
        <div className="flex gap-2">
          <input
            autoFocus
            type="url"
            placeholder="https://..."
            defaultValue={images[urlMode]}
            onBlur={(e) => { updateUrl(urlMode, e.target.value); setUrlMode(null); }}
            onKeyDown={(e) => { if (e.key === "Enter") { updateUrl(urlMode, e.currentTarget.value); setUrlMode(null); } if (e.key === "Escape") setUrlMode(null); }}
            className="flex-1 bg-zinc-800 border border-amber-500 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <button type="button" onClick={() => setUrlMode(null)} className="p-2.5 bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Drop zone / Add button */}
      {images.length < max && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 ${
            dragging ? "border-amber-500 bg-amber-500/5" : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center justify-center py-8 gap-3 pointer-events-none">
            {uploading !== null && uploading >= images.length ? (
              <Loader2 size={24} className="text-amber-400 animate-spin" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <Plus size={20} className="text-zinc-400" />
              </div>
            )}
            <div className="text-center">
              <p className="text-zinc-300 text-sm font-medium">
                {dragging ? "Upuść zdjęcie tutaj" : "Przeciągnij zdjęcia lub kliknij"}
              </p>
              <p className="text-zinc-600 text-xs mt-0.5">JPG, PNG, WebP · max 10 MB · {images.length}/{max}</p>
            </div>
          </div>
        </div>
      )}

      {/* URL mode toggle */}
      <button
        type="button"
        onClick={() => { onChange([...images, ""]); setUrlMode(images.length); }}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
      >
        <Link size={12} /> Dodaj przez URL zamiast
      </button>
    </div>
  );
}
