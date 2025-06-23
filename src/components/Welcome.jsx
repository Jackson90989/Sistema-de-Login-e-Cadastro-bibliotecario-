// src/components/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./styles.css"; // Use a mesma estilização

const Welcome = () => {
    const navigate = useNavigate();
    const user = auth.currentUser; // Obtém o usuário logado

    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz logout
            navigate("/"); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    return (
        <main className="container">
            <h1>Bem-vindo, {user?.email}!</h1>
            <p>Sua carteirinha de biblioteca é: {user?.uid}</p>
            <button onClick={handleLogout} className="login">Logout</button>
        </main>
    );
};

export default Welcome;