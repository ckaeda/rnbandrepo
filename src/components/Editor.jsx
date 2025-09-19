import './css/editor.css'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner';

function Editor({ allSongs }) {
  const [filteredSongs, setFilteredSongs] = useState([]);

  const buttonClass = 'border border-white rounded-sm text-white w-6 leading-6 flex justify-center hover:bg-gray-500'
  const titleClass = 'text-2xl font-bold not-first:mt-10'
  const tableClass = 'w-3/4 text-m text-gray-500 dark:text-gray-400'
  const theadClass = 'text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
  const tbodyClass = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-left rtl:text-right'

  useEffect(() => {
    setFilteredSongs(allSongs.songs);
  }, [allSongs.songs]);

  if (allSongs.loading) return <LoadingSpinner />;
  if (allSongs.error) return <p>Error: {allSongs.error}</p>;

  return (
    <div className="editor-container">
      <h2 className={titleClass}>Sunday Worship Celebration</h2>
      <table className={tableClass}>
        <thead className={theadClass}>
          <th>Title</th>
          <th>Artist</th>
          <th>Singer</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.swc && song.swc != 0).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id} className={tbodyClass}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.swc_singer}</td>
                <td className='flex gap-1 items-center justify-center'>
                  <span className={buttonClass}>🡹</span>
                  <span className={buttonClass}>🡻</span>
                  <span className={buttonClass + ' text-4xl font-bold'}>-</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2 className={titleClass}>Thursday Night Live</h2>
      <table className={tableClass}>
        <thead className={theadClass}>
          <th>Title</th>
          <th>Artist</th>
          <th>Singer</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.tnl && song.tnl != 0).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id} className={tbodyClass}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.tnl_singer}</td>
                <td className='flex gap-1 items-center justify-center'>
                  <span className={buttonClass}>🡹</span>
                  <span className={buttonClass}>🡻</span>
                  <span className={buttonClass + ' text-4xl font-bold'}>-</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2 className={titleClass}>Active Rotation</h2>
      <table className={tableClass}>
        <thead className={theadClass}>
          <th>Title</th>
          <th>Artist</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => song.active).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id} className={tbodyClass}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td className='flex gap-1 items-center justify-center'><span className={buttonClass}>...</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <h2 className={titleClass}>Miscellaneous</h2>
      <table className={tableClass}>
        <thead className={theadClass}>
          <th>Title</th>
          <th>Artist</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            filteredSongs.filter(song => !song.active).sort((a, b) => a.swc - b.swc).map((song) => (
              <tr key={song.id} className={tbodyClass}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td className='flex gap-1 items-center justify-center'><span className={buttonClass}>...</span></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Editor