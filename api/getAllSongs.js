export default async function handler(req, res) {
    try {
        const songs_response = await fetch('https://rnbandrepo-e7c5.restdb.io/rest/songs', {
            method: "GET",
            cache: "no-cache",
            headers: { 'x-apikey': process.env.DB_API_KEY }
        });

        if (!songs_response.ok) {
            throw new Error(`HTTP error! status: ${songs_response.status}`);
        }
        const songs_data = await songs_response.json();

        var event_title = "";
        if (songs_data.filter(song => song.event).length > 0) {
            const event_response = await fetch('https://rnbandrepo-e7c5.restdb.io/rest/event?max=1', {
                method: "GET",
                cache: "no-cache",
                headers: { 'x-apikey': process.env.DB_API_KEY }
            });

            if (!event_response.ok) {
                throw new Error(`HTTP error! status: ${event_response.status}`);
            }
            const event_data = await event_response.json();
            event_title = event_data[0].title;
        }

        return res.status(200).json({ event: event_title, songs: songs_data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).json({ "message": "An error has occurred" });
    }
}