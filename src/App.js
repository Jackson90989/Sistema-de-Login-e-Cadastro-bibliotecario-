// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Cadastro from "./components/Cadastro";
import Welcome from "./components/Welcome";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
}

export default App;