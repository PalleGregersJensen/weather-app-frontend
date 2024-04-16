import { useState } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import InputField from "./components/InputField";
import Header from "./components/Header";
import GoogleMap from "./components/GoogleMap";

function App() {
    return (
        <>
            <div className="header-weather-app">
                <Header />
            </div>
            <div>
                <InputField />
            </div>
            <div>
                <GoogleMap />
            </div>
        </>
    );
}

export default App;
