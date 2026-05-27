import type { ChangeEvent } from "react";

import { Spinner } from "@/components/ui/Spinner";

interface SearchBarProps {
  value: string;
  onChange: (next: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  isLoading,
  placeholder = 'Cari naskah dinas… (mis. surat edaran arsip, atau "pengelolaan arsip dinamis")',
}: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.3-4.3M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus
        spellCheck={false}
        className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pr-12 pl-11 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
        aria-label="Kueri pencarian"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        {isLoading ? (
          <Spinner size="sm" label="Mencari" />
        ) : value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Bersihkan kueri"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95L3.636 14.95 8.586 10 3.636 5.05 5.05 3.636 10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
