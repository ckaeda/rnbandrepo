export async function fetchAllSongs() {
    const response = await fetch('api/getAllSongs');

    if (!response.ok) {
        alert(`Could not update songs. Please try again later.`);
        const localSongs = JSON.parse(localStorage.getItem("songs"))
        return localSongs;
    } else {
        const result = await response.json();
        localStorage.setItem("songs", JSON.stringify(result));
        localStorage.setItem("lastUpdated", new Date().toISOString());

        return result;
    }
}