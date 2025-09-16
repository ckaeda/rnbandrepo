import './songcontainer.css';
import DOMPurify from 'dompurify';
import LoadingSpinner from './LoadingSpinner';

function SongContainer({ metadata, parsedLyrics, hideChords, loading, error }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    (
      <div className="lyrics-container" id="main">
        <h1 id="title">{metadata?.title}</h1>
        <h2 id="artist">{metadata?.artist}</h2>
        <div className={hideChords ? "hide-chords" : ""} id="lyricsContainer" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedLyrics) }} />
      </div>
    )
  );
}

export default SongContainer;
