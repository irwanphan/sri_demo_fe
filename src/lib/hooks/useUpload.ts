import { useCallback, useState } from "react";

import { ApiError, uploadDocument } from "@/lib/api";

export type UploadItemStatus = "queued" | "uploading" | "success" | "error";

export interface UploadItem {
  id: string;
  file: File;
  status: UploadItemStatus;
  documentId?: string;
  error?: string;
}

function makeItem(file: File): UploadItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    status: "queued",
  };
}

export interface UseUploadState {
  items: UploadItem[];
  addFiles: (files: File[]) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export function useUpload(): UseUploadState {
  const [items, setItems] = useState<UploadItem[]>([]);

  const updateItem = useCallback(
    (id: string, patch: Partial<UploadItem>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      );
    },
    [],
  );

  const runUpload = useCallback(
    async (item: UploadItem) => {
      updateItem(item.id, { status: "uploading" });
      try {
        const response = await uploadDocument(item.file);
        updateItem(item.id, {
          status: "success",
          documentId: response.document_id,
        });
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Gagal mengunggah file";
        updateItem(item.id, { status: "error", error: message });
      }
    },
    [updateItem],
  );

  const addFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const newItems = files.map(makeItem);
      setItems((prev) => [...newItems, ...prev]);
      newItems.forEach((item) => {
        void runUpload(item);
      });
    },
    [runUpload],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { items, addFiles, removeItem, clear };
}
