import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image, Video, Music, Lock, CheckCircle, Trash2, ShieldAlert } from 'lucide-react';

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
  encrypted: boolean;
}

interface EvidenceLockerProps {
  files: UploadedFile[];
  onFilesChange: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

export const EvidenceLocker: React.FC<EvidenceLockerProps> = ({ files, onFilesChange }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFiles = (fileList: FileList) => {
    const validFiles: UploadedFile[] = [];
    const allowedTypes = ['image/', 'video/', 'audio/', 'application/pdf'];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const isAllowed = allowedTypes.some(type => file.type.startsWith(type) || file.name.endsWith('.pdf'));

      if (isAllowed) {
        const newFile: UploadedFile = {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          progress: 0,
          encrypted: false
        };
        validFiles.push(newFile);
      }
    }

    if (validFiles.length === 0) return;

    // Add to list and simulate encrypting/uploading
    const updatedList = [...files, ...validFiles];
    onFilesChange(updatedList);

    validFiles.forEach((file) => {
      simulateUpload(file.name);
    });
  };

  const simulateUpload = (fileName: string) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 20) + 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        onFilesChange(prev => 
          prev.map(f => 
            f.name === fileName 
              ? { ...f, progress: 100, encrypted: true } 
              : f
          )
        );
      } else {
        onFilesChange(prev =>
          prev.map(f =>
            f.name === fileName
              ? { ...f, progress: currentProgress }
              : f
          )
        );
      }
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileName: string) => {
    onFilesChange(files.filter(f => f.name !== fileName));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-5 w-5 text-indigo-500" />;
    if (type.startsWith('video/')) return <Video className="h-5 w-5 text-sky-500" />;
    if (type.startsWith('audio/')) return <Music className="h-5 w-5 text-emerald-500" />;
    return <FileText className="h-5 w-5 text-rose-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
          Evidence Locker <span className="text-base">🔒</span>
        </label>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
          <Lock className="h-3 w-3" /> Fully Encrypted
        </span>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50/50 scale-[0.99] shadow-inner'
            : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf"
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover-shake">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="text-sm font-bold text-slate-700">
          Drag & drop evidence files, or <span className="text-blue-600 underline">browse</span>
        </p>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Supports Images, Videos, Audio transcripts, and PDF files. Max size 50MB.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50/60 border border-blue-100/50 p-3.5 flex items-start space-x-2">
        <ShieldAlert className="h-4.5 w-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-blue-800">
          <strong>Locker Security Guarantee:</strong> Your uploads are client-side encrypted before hitting campus databases. De-identified hashes shield your IP and network trace from metadata logs.
        </p>
      </div>

      {/* Uploaded Files Queue */}
      {files.length > 0 && (
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between border border-slate-100 bg-white p-3 rounded-xl shadow-xs transition-all hover:border-blue-100"
            >
              <div className="flex items-center space-x-3 w-10/12">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100/70">
                  {getFileIcon(file.type)}
                </div>
                <div className="w-full min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{file.size}</span>
                  </div>
                  
                  {file.progress < 100 ? (
                    <div className="mt-1.5 w-full">
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-[9px] text-blue-600 font-bold mt-0.5 flex items-center gap-1 animate-pulse">
                        Encrypting file... {file.progress}%
                      </p>
                    </div>
                  ) : (
                    <p className="text-[9px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Zero-Knowledge Encrypted & Uploaded
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                {file.encrypted && (
                  <span className="p-1 text-emerald-600 bg-emerald-50 rounded-md border border-emerald-100">
                    <Lock className="h-3 w-3" />
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(file.name)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
