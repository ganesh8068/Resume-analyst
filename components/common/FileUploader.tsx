
import React, { useState, useRef } from 'react';
import { extractTextFromFile } from '../../utils/file-parser';

interface FileUploaderProps {
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onTextExtracted, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    try {
      const text = await extractTextFromFile(file);
      onTextExtracted(text);
    } catch (err: any) {
      onError(err.message || 'Failed to extract text from file.');
      setFileName(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer text-center group
        ${isDragging ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(79,70,229,0.15)]' : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'}
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        className="hidden" 
        accept=".pdf,.docx,.txt"
      />
      
      <div className="flex flex-col items-center gap-4">
        {isProcessing ? (
          <div className="w-12 h-12 flex items-center justify-center">
            <i className="fas fa-circle-notch animate-spin text-3xl text-indigo-500"></i>
          </div>
        ) : fileName ? (
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
            <i className="fas fa-file-check text-xl text-emerald-400"></i>
          </div>
        ) : (
          <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
            <i className="fas fa-upload text-xl text-indigo-400"></i>
          </div>
        )}

        <div>
          <p className="font-bold text-slate-100 tracking-tight">
            {isProcessing ? 'Decrypting File...' : fileName ? fileName : 'Upload Resume'}
          </p>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {fileName ? 'Ready for Analysis' : 'PDF, DOCX or TXT (Max 5MB)'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
