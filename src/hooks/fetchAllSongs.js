import { useEffect, useState } from "react";

export function fetchAllSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const blobUrl = import.meta.env.VITE_BLOB_URL + "/index/songs_list.json";

  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch(blobUrl);
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const data = await res.json();
        setSongs(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, [blobUrl]);

  return { songs, loading, error };
}