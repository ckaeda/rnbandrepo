function Editor() {
    const songs = JSON.parse(localStorage.getItem("songs")).songs.sort((a, b) => a.title.localeCompare(b.title));

    const swc_songs = songs.filter(song => song.swc).sort((a, b) => a.swc - b.swc);
    const tnl_songs = songs.filter(song => song.tnl).sort((a, b) => a.tnl - b.tnl);
    const active_songs = songs.filter(song => song.active).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <>
            <h2>Sunday Worship Celebration</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Singer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        swc_songs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.swc_singer}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Thursday Night Live</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Singer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tnl_songs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.tnl_singer}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Active Rotation</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        active_songs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>All Songs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        songs.map((song, index) => (
                            <tr key={index}>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Editor;