import React, { useState } from 'react';

export function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setUrl(null);

    try {
      // 1. Get pre-signed URL from our backend
      const res = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to get upload options');
      }

      const { uploadUrl, publicUrl } = await res.json();

      // 2. Upload file directly to Cloudflare R2
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error('Failed to upload file to R2');

      // 3. Keep the public URL for translations.ts
      setUrl(publicUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-accent p-4 font-mono text-sm mb-6 bg-ink/50">
      <div className="font-bold text-accent mb-2">{">>" } R2 IMAGE UPLOADER (ADMIN)</div>
      <p className="text-paper/70 mb-4 text-xs">Загрузка картинок на Cloudflare R2 напрямую из браузера.</p>
      
      <div className="flex flex-col gap-3">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-paper file:mr-4 file:py-1 file:px-3 file:border file:border-accent file:bg-transparent file:text-accent file:text-xs hover:file:bg-accent hover:file:text-ink cursor-pointer"
        />
        
        <button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="self-start px-4 py-1 bg-accent text-ink uppercase text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/80"
        >
          {uploading ? 'LOADING...' : 'UPLOAD'}
        </button>

        {error && <div className="text-red-400 mt-2">Error: {error}</div>}
        
        {url && (
          <div className="mt-2 p-2 border border-green-500/30 bg-green-500/10 text-green-400">
            <div>Успешно! Добавь этот URL в translations.ts:</div>
            <div className="select-all break-all mt-1 bg-ink p-1">{url}</div>
          </div>
        )}
      </div>
    </div>
  );
}
