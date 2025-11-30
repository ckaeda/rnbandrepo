export default async function handler(req, res) {
    try {
        var songs_response = await fetch('https://rnbandrepo-e7c5.restdb.io/rest/songs', {
            method: "GET",
            cache: "no-cache",
            headers: { 'x-apikey': process.env.DB_API_KEY }
        });

        if (!songs_response.ok) throw new Error(`HTTP error! status: ${songs_response.status}`);
        
        const songs_data = await songs_response.json();

        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        })
        var info_data = {
            "title": "",
            "swc_date": formatter.format(now.setDate(now.getDate() + (7 - now.getDay()) % 7)),
            "tnl_date": formatter.format(now.setDate(now.getDate() + (4 + (7 - now.getDay())) % 7))
        };

        if (songs_data.filter(song => song.event).length > 0) {
            const info_response = await fetch('https://rnbandrepo-e7c5.restdb.io/rest/event?max=1', {
                method: "GET",
                cache: "no-cache",
                headers: { 'x-apikey': process.env.DB_API_KEY }
            });

            if (!info_response.ok && info_response.status !== 429) throw new Error(`HTTP error! status: ${info_response.status}`);

            if (info_response.status !== 429) {
                info_data = [await info_response.json()][0][0];

                info_data.swc_date = formatter.format(Date.parse(info_data.swc_date))
                info_data.tnl_date = formatter.format(Date.parse(info_data.tnl_date))
            }
        }

        return res.status(200).json({ info: info_data, songs: songs_data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).json({ "message": "An error has occurred" });
    }
}