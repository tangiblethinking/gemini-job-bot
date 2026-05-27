"use client";
import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface Props {
  onUpload: (file: File) => void;
  loading: boolean;
}

export default function ResumeUpload({ onUpload, loading }: Props) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setFileName(file.name);
    onUpload(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-all
        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={onChange}
      />
      <div className="text-4xl mb-3">📄</div>
      {loading ? (
        <p className="text-gray-600 font-medium">Processing resume...</p>
      ) : fileName ? (
        <p className="text-green-700 font-medium">✓ {fileName}</p>
      ) : (
        <>
          <p className="text-gray-700 font-semibold">Drop your resume PDF here</p>
          <p className="text-gray-400 text-sm mt-1">or click to browse</p>
        </>
      )}
    </div>
  );
}
