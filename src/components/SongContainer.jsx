import { useEffect, useState } from 'react';
import { useSongFiles } from '../hooks/useSongFiles'; // ✅ rename to "useSongFiles"
import './songcontainer.css';
import LoadingSpinner from './LoadingSpinner';
import { parseSong } from '../functions/parseSong';
import DOMPurify from 'dompurify';

function SongContainer({ activeSong }) {
  const { metadata, lyrics, loading, error } = useSongFiles(activeSong);
  const [parsedLyrics, setParsedLyrics] = useState("");

  useEffect(() => {
    if (!loading && metadata && lyrics) {
      setParsedLyrics(parseSong(metadata, lyrics));
    }
  }, [loading, metadata, lyrics]);

  if (!activeSong) {
    return <p style={{ padding: "1rem" }}>Please select a song.</p>;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    metadata && lyrics && (
      <div className="lyrics-container" id="main">
        <h1 id="title">{metadata?.title}</h1>
        <h2 id="artist">{metadata?.artist}</h2>
        <div id="lyricsContainer" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedLyrics) }}/>
      </div>
    )
  );
}

export default SongContainer;
