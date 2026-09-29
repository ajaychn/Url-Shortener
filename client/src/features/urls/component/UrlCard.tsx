import { useState } from "react";
import type { Url } from "../../../services/urlApi";

interface UrlCardProps {
  url: Url;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const UrlCard = ({url,onDelete,isDeleting,}: UrlCardProps) => {
  
  const [copied, setCopied] = useState(false);

  const shortUrl = `${import.meta.env.VITE_API_URL}/${url.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <article className="rounded-xl border border-base-300 bg-base-100 p-5 transition hover:border-primary/40 hover:shadow-sm">
      {/* Top section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">
            Original URL
          </p>

          <p
            className="truncate text-sm font-medium"
            title={url.originalUrl}
          >
            {url.originalUrl}
          </p>
        </div>

        {/* Clicks */}
        <div className="badge badge-ghost gap-1 px-3 py-3">
          <span className="font-semibold">{url.clicks}</span>
          <span className="text-base-content/60">
            {url.clicks === 1 ? "click" : "clicks"}
          </span>
        </div>
      </div>

      <div className="divider my-4" />

      {/* Short URL */}
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-base-content/50">
          Short URL
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate font-medium text-primary hover:underline"
            title={shortUrl}
          >
            {shortUrl}
          </a>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-sm btn-outline"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>

            <button
              type="button"
              onClick={() => onDelete(url._id)}
              disabled={isDeleting}
              className="btn btn-sm btn-error btn-outline"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UrlCard;
