export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ "message": "Method not allowed" });
    }

    const promises = req.body.songs.map(async (song) => {
        try {
            const { _id, ...songData } = song;

            var update_response = await fetch(`https://rnbandrepo-e7c5.restdb.io/rest/songs/${_id}`, {
                method: "PUT",
                cache: "no-cache",
                json: true,
                headers: { 
                    'Content-Type': 'application/json',
                    'x-apikey': process.env.DB_API_KEY 
                },
                body: JSON.stringify(songData)
            });

            if (!update_response.ok) throw new Error(`HTTP error! status: ${update_response.status}`);

            const data = await update_response.json();

            return data;
        } catch (error) {
            console.error('Error updating song:', error);
            return { error: error.message, songId: song._id };
        }
    });

    const responses = await Promise.all(promises);

    return res.status(200).json({ "message": "Data received successfully", responses });
}