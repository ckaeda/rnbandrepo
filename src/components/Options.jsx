import './options.css'

function Options({ showOptions, toggleOptions }) {
    return (
        <>
            <button className="toggle-settings-button" id="toggleSettingsButton" onClick={toggleOptions}>
                <img src="settings-icon.png" alt="Settings" className="settings-icon" />
            </button>

            <div className={"settings-container " + (showOptions ? "fade-in-down" : "fade-out-up")} id="settingsContainer" style={{display: 'block'}}>
                <div className="transpose-container" id="transposeContainer" style={{display: 'flex'}}>
                    <div className="transpose-text">Transpose</div>
                    <div className="toggle-button" id="toggleButton">
                        <div className="minus-sign" id="minusSign">-</div>
                        <div className="transpose-value" id="transposeValue">0</div>
                        <div className="plus-sign" id="plusSign">+</div>
                    </div>
                    <div className="transpose-key" id="transposeKey">Key: C</div>
                </div>
                <div className="presets-container" id="presetsContainer" style={{display: 'block'}}>
                    <div className="presets">Presets</div>
                </div>
                <div className="flow-container" id="flowContainer">
                    <div className="flow-title">Flow</div>
                    <ul id="flowList"></ul>
                </div>
                <div className="flow-title" id="bpm" style={{display: 'flex'}}>BPM: </div>
                <div className="hide-chords-button" id="romanNumeralsButton" style={{display: 'flex'}}>
                    Numeral</div>
                <div className="hide-chords-button" id="hideChordsButton">Hide Chords</div>
            </div>
        </>
    )
}

export default Options