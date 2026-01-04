import "../../css/loadingspinner.css";

function LoadingSpinner({ status }) {
    return (
        <div className="spinner-fullscreen" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <img
                src="1544764567.svg"
                className="spinner"
                alt="Loading..."
            />
            {status && status !== "" && <div className="loading-status">{status}</div>}
        </div>
    );
}

export default LoadingSpinner;
