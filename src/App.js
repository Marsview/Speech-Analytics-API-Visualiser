import React from "react";

// Css file for application
import "./App.css";

//Pages component
import DataVisualizer from './components/visualizer/visualizer'

const App = () => {
    return (
        <div className="main">
            <div className="application-container">
                <DataVisualizer />
            </div>
        </div>
    );
}

export default App;