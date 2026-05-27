import type { SearchResultDocument } from "@/lib/types";

import { ResultCard } from "./ResultCard";

interface ResultListProps {
  documents: SearchResultDocument[];
}

export function ResultList({ documents }: ResultListProps) {
  return (
    <div className="grid gap-3">
      {documents.map((doc, index) => (
        <ResultCard key={doc.document_id} doc={doc} rank={index + 1} />
      ))}
    </div>
  );
}
