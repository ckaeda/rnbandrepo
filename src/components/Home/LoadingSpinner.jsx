import "../../css/loadingspinner.css";

function LoadingSpinner({ status }) {
    return (
        <div className="spinner-fullscreen">
            <img
                src="1544764567.svg"
                className="spinner"
                alt="Loading..."
            />
            <br />
            {status && status !== "" && <div className="loading-status">{status}</div>}
        </div>
    );
}

export default LoadingSpinner;
