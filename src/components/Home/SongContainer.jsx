import '../../css/songcontainer.css';
import DOMPurify from 'dompurify';
import LoadingSpinner from './LoadingSpinner';

function SongContainer({ metadata, parsedLyrics, hideChords, loading, error, containerRef }) {
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="lyrics-outer-container">
      <div className="lyrics-container" id="lyricsContainer" ref={containerRef}>
        <h1 id="title">{metadata?.title}</h1>
        <h2 id="artist">{metadata?.artist}</h2>
        <div
          className={hideChords ? 'hide-chords' : ''}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(parsedLyrics),
          }}
        />
      </div>
    </div>
  );
}

export default SongContainer;
