import './css/editor.css'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';

function Editor({ allSongs }) {
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    setFilteredSongs(allSongs.songs);
  }, [allSongs.songs]);

  if (allSongs.loading) return <LoadingSpinner />;
  if (allSongs.error) return <p>Error: {allSongs.error}</p>;

  return (
    <div className="editor-container">
      <h2>Sunday Worship Celebration</h2>
      <table>
        <thead>
          <th>Title</th>
          <th>Artist</th>
          <th>Singer</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.swc && song.swc != 0).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id} >
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.swc_singer}</td>
                <td>
                  <span>🡹</span>
                  <span>🡻</span>
                  <span>-</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2>Thursday Night Live</h2>
      <table>
        <thead>
          <th>Title</th>
          <th>Artist</th>
          <th>Singer</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.tnl && song.tnl != 0).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.tnl_singer}</td>
                <td>
                  <span>🡹</span>
                  <span>🡻</span>
                  <span>-</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2>Active Rotation</h2>
      <table>
        <thead>
          <th>Title</th>
          <th>Artist</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.active).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td><span>...</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2>Miscellaneous</h2>
      <table>
        <thead>
          <th>Title</th>
          <th>Artist</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => !song.active).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td><span>...</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Editor