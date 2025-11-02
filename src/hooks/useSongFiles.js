import { useState, useEffect } from "react";

export function useSongFiles(song) {
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BLOB_URL;

  useEffect(() => {
    if (!song || !song.id) {
      setLyrics("");
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const txtUrl  = `${baseUrl}/txt/${song.id}.txt?t=${Date.now()}`;

        // fetch lyrics text
        const txtRes = await fetch(txtUrl, { method: "GET", cache: "no-cache" });
        if (!txtRes.ok) {
          throw new Error(`Lyrics not found for ${song.id}`);
        }
        const lyrics = await txtRes.text();

        setLyrics(lyrics);
      } catch (err) {
        setError(err.message);
        setLyrics("");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [song, baseUrl]);

  return { lyrics, loading, error };
}
