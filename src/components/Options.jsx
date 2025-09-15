import './options.css'
import { useState } from 'react';
import { Chord } from 'chordsheetjs';

function Options({ metadata, activeKey, setActiveKey, keyDiff, setKeyDiff, numeralMode, setNumeralMode, hideChords, setHideChords }) {
    const [showOptions, setShowOptions] = useState(true);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const toggleChords = () => {
        setHideChords(!hideChords);
    }

    return (
        <>
            <button
                className="toggle-settings-button"
                id="toggleSettingsButton"
                onClick={toggleOptions}
            >
                <img
                    src="settings-icon.png"
                    alt="Settings"
                    className="settings-icon"
                />
            </button>

            <div
                className={"settings-container " + (showOptions ? "fade-in-down" : "fade-out-up")}
                id="settingsContainer"
                style={{ display: 'block' }}
            >
                <div
                    className="transpose-container"
                    id="transposeContainer"
                    style={{ display: 'flex' }}
                >
                    <div
                        className="transpose-text"
                    >
                        Transpose
                    </div>
                    <div
                        className="toggle-button"
                        id="toggleButton"
                    >
                        <div
                            className="minus-sign"
                            id="minusSign"
                            onClick={() => setKeyDiff(keyDiff - 1)}
                        >
                            -
                        </div>
                        <div
                            className="transpose-value"
                            id="transposeValue">
                            {keyDiff}
                        </div>
                        <div
                            className="plus-sign"
                            id="plusSign"
                            onClick={() => setKeyDiff(keyDiff + 1)}
                        >
                            +
                        </div>
                    </div>
                    <div
                        className="transpose-key"
                        id="transposeKey"
                    >
                        Key: {Chord.parse(activeKey.key).transpose(keyDiff).toString()}
                    </div>
                </div>
                <div
                    className="presets-container"
                    id="presetsContainer"
                    style={{ display: 'block' }}
                >
                    <div
                        className="presets"
                    >
                        Presets
                    </div>
                    {metadata?.defaults && Object.keys(metadata.defaults).map((singer, index) => {
                        return (
                            <div
                                key={index} className="presets"
                                onClick={() => { setActiveKey({ key: metadata.defaults[singer], singer: singer }); setKeyDiff(0); }}
                            >
                                {singer}: {metadata.defaults[singer]}
                            </div>
                        );
                    })}
                </div>
                <div
                    className="flow-container"
                    id="flowContainer"
                >
                    <div
                        className="flow-title"
                    >
                        Flow
                    </div>
                    <ul
                        id="flowList"
                    >
                        {metadata?.flow ? metadata.flow.map((item, index) => (
                            <li
                                key={index}
                            >
                                {item}
                            </li>
                        )) : <li>No flow data</li>}
                    </ul>
                </div>
                <div
                    className="flow-title"
                    id="bpm"
                    style={{ display: 'flex' }}
                >
                    BPM: {metadata?.bpm || ""}
                </div>
                <div
                    className="hide-chords-button"
                    id="romanNumeralsButton"
                    style={{ display: 'flex' }}
                    onClick={() => setNumeralMode(!numeralMode)}
                >
                    {numeralMode ? "Chords" : "Numeral"}
                </div>
                <div
                    className="hide-chords-button"
                    id="hideChordsButton"
                    style={{ display: 'flex' }}
                    onClick={() => toggleChords()}
                >
                    {hideChords ? "Show Chords" : "Hide Chords"}
                </div>
            </div>
        </>
    )
}

export default Options