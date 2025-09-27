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
    if (!song || !song.id) {
      setMetadata(null);
      setLyrics("");
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const jsonUrl = `${baseUrl}/json/${song.id}.json?t=${Date.now()}`;
        const txtUrl  = `${baseUrl}/txt/${song.id}.txt?t=${Date.now()}`;

        // fetch JSON metadata
        const jsonRes = await fetch(jsonUrl, { method: "GET", cache: "no-cache" });
        if (!jsonRes.ok) {
          throw new Error(`Metadata not found for ${song.id}`);
        }
        const metadata = await jsonRes.json();

        // fetch lyrics text
        const txtRes = await fetch(txtUrl, { method: "GET", cache: "no-cache" });
        if (!txtRes.ok) {
          throw new Error(`Lyrics not found for ${song.id}`);
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
