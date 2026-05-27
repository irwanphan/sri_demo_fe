import { EmptyState } from "@/components/search/EmptyState";
import { ResultList } from "@/components/search/ResultList";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchSummary } from "@/components/search/SearchSummary";
import { useSearch } from "@/lib/hooks/useSearch";

export function SearchPage() {
  const { query, debouncedQuery, setQuery, data, isLoading, error, latencyMs } =
    useSearch();

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = data != null && data.documents.length > 0;
  const showEmptyResults = hasQuery && !isLoading && !error && data != null && data.documents.length === 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Cari naskah dinas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Hasil di-collapse satu baris per dokumen, halaman dengan skor tertinggi
          ditampilkan. Gunakan tanda kutip{" "}
          <span className="font-mono">"…"</span> untuk pencarian frasa eksak.
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} isLoading={isLoading} />

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          <p className="font-semibold">Pencarian gagal</p>
          <p className="mt-0.5 text-rose-600">{error}</p>
        </div>
      )}

      {!hasQuery && !error && (
        <EmptyState
          title="Mulai cari dokumen"
          description='Coba "pengelolaan arsip dinamis", surat edaran, atau kata kunci dari isi naskah.'
        />
      )}

      {hasResults && data && (
        <div className="space-y-4">
          <SearchSummary data={data} latencyMs={latencyMs} />
          <ResultList documents={data.documents} />
        </div>
      )}

      {showEmptyResults && (
        <EmptyState
          title="Tidak ada dokumen yang cocok"
          description="Coba kata kunci lain atau periksa ejaan."
        />
      )}
    </div>
  );
}
