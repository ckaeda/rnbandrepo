import { useEffect, useState } from "react";

export function fetchAllSongs() {
  const [event, setEvent] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const blobUrl = import.meta.env.VITE_BLOB_URL + "/index/all_songs.json";

  useEffect(() => {
    async function fetchSongs() {
      try {
        const url = `${blobUrl}?t=${Date.now()}`;
        const res = await fetch(url, { method: "GET", cache: "no-cache" });

        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        setEvent(data.event_title);
        setSongs(data.songs);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, [blobUrl]);

  return { event, songs, loading, error };
}
