import type { ChangeEvent, DragEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/format";

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export function Dropzone({
  onFiles,
  accept = "application/pdf",
  multiple = true,
}: DropzoneProps) {
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const files = Array.from(fileList).filter(
        (file) =>
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf"),
      );
      if (files.length > 0) onFiles(files);
    },
    [onFiles],
  );

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsOver(true);
  }

  function handleDragLeave() {
    setIsOver(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsOver(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <label
      htmlFor="dropzone-input"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white px-6 py-12 text-center transition",
        isOver
          ? "border-brand-500 bg-brand-50/60"
          : "border-slate-300 hover:border-brand-400 hover:bg-slate-50",
      )}
    >
      <div className="mb-3 text-brand-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-10 w-10"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 7.5m0 0L7.5 12M12 7.5v9"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-900">
        Tarik & lepas PDF di sini, atau{" "}
        <span className="text-brand-600 underline">pilih file</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Hanya format <span className="font-mono">.pdf</span> · upload akan diproses di background
      </p>
      <input
        id="dropzone-input"
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="sr-only"
      />
    </label>
  );
}
