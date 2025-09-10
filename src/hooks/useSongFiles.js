import { useState, useEffect } from "react";

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")   // replace spaces/symbols with dashes
    .replace(/^-+|-+$/g, "");      // trim leading/trailing dashes
}

export function useSongFiles(song) {
  const [metadata, setMetadata] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BLOB_URL;

  useEffect(() => {
    if (!song || !song.id || !song.title) {
      setMetadata(null);
      setLyrics("");
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // 🔑 Convert title to kebab-case
        const kebabTitle = toKebabCase(song.title);

        // ✅ Filename pattern: {title}-{id}.json / .txt
        const jsonUrl = `${baseUrl}/json/${kebabTitle}_${song.id}.json`;
        const txtUrl  = `${baseUrl}/txt/${kebabTitle}_${song.id}.txt`;

        // fetch JSON metadata
        const jsonRes = await fetch(jsonUrl);
        if (!jsonRes.ok) {
          throw new Error(`Metadata not found for ${song.title}`);
        }
        const metadata = await jsonRes.json();

        // fetch lyrics text
        const txtRes = await fetch(txtUrl);
        if (!txtRes.ok) {
          throw new Error(`Lyrics not found for ${song.title}`);
        }
        const lyrics = await txtRes.text();

        setMetadata(metadata);
        setLyrics(lyrics);
      } catch (err) {
        setError(err.message);
        setMetadata(null);
        setLyrics("");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [song, baseUrl]);

  return { metadata, lyrics, loading, error };
}
