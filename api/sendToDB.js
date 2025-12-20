export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ "message": "Method not allowed" });
    }

    await req.body.songs.forEach(async (song) => {
        try {
            const { _id, ...songData } = song;

            var update_response = await fetch(`https://rnbandrepo-e7c5.restdb.io/rest/songs/${_id}`, {
                method: "PUT",
                cache: "no-cache",
                headers: { 'x-apikey': process.env.DB_API_KEY },
                body: JSON.stringify(songData)
            });

            if (!update_response.ok) throw new Error(`HTTP error! status: ${update_response.status}`);

            const data = await update_response.json();

            console.log(data)
        } catch (error) {
            console.error('Error updating song:', error);
        }
    })

    // return res.status(200).json({ "message": "Data received successfully" });
}