import { useParams, useNavigate } from "react-router-dom";
import "../../css/songeditor.css";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useSongFiles } from '../../hooks/useSongFiles';

function SongEditor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchAllSingers = async () => {
        const response = await fetch('/api/getAllSingers');

        if (!response.ok) console.error(response.error);
        else {
            const result = await response.json();

            localStorage.setItem("singers", JSON.stringify(result.names));
        }
    }

    const song = useMemo(() => {
        try {
            const data = JSON.parse(localStorage.getItem("songs"));
            return data?.songs?.find(s => s._id === id) || null;
        } catch (e) {
            return null;
        }
    }, [id]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: song || {}
    });

    useEffect(() => {
        if (song) reset(song);
    }, [song, reset]);

    useEffect(() => {
        if (!localStorage.getItem("singers")) {
            fetchAllSingers();
        }
    }, []);

    const { lyrics, loading, error } = useSongFiles(song);

    const keys = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    const onSubmit = (data) => {
        console.log(data);
    };

    if (!song) return <div className="song-editor-container">Song not found</div>;

    return (
        <div className="song-editor-container">
            <form className="song-editor-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-actions">
                    <button type="button" className="song-back-button" onClick={() => navigate('/editor')}>Back</button>
                    <button type="submit" className="song-save-button">Save</button>
                </div>

                <label className="song-label" htmlFor="title-input">Title:</label>
                <input id="title-input" className="song-input" type="text" {...register("title")} />

                <label className="song-label" htmlFor="artist-input">Artist:</label>
                <input id="artist-input" className="song-input" type="text" {...register("artist")} />

                <label className="song-label" htmlFor="bpm-input">BPM:</label>
                <input id="bpm-input" className="song-input" type="text" {...register("bpm")} />

                <label className="song-label">Keys:</label>

                <div className="defaults-container">
                    <div className="defaults-row">
                        <label className="song-label small-label">Orig</label>
                        <select className="key-select song-input" {...register("defaults.Orig")}>
                            {keys.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>

                    {Object.entries(song.defaults).map(([key, value]) => {
                        if (key === "Orig") return null;
                        return (
                            <div className="defaults-row" key={key}>
                                <label className="song-label small-label">{key}</label>
                                <select className="key-select song-input" {...register(`defaults.${key}`)}>
                                    {keys.map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                            </div>
                        );
                    })}
                </div>

                <label className="song-label" htmlFor="lyrics-input">Lyrics:</label>
                <textarea id="lyrics-input" className="song-textarea" rows="15" defaultValue={lyrics}></textarea>
            </form>
        </div>
    );
}

export default SongEditor;