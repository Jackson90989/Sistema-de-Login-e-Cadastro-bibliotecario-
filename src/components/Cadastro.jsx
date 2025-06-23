// src/components/Cadastro.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importe a função de criação de usuário
import { auth } from "../firebase"; // Importe o auth
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carteirinha, setCarteirinha] = useState("");
    const navigate = useNavigate();

    const gerarCarteirinha = () => {
        const numero = Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
        setCarteirinha(numero.toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            // Cria o usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user; // Obtém o usuário criado

            // Salva os dados no Firestore
            await addDoc(collection(db, "usuarios"), {
                nome,
                email,
                senha,
                carteirinha,
                uid: user.uid, // Salva o UID do usuário
            });

            alert("Cadastro realizado com sucesso! Sua carteirinha é: " + carteirinha);
            navigate("/"); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error);
            alert("Erro ao cadastrar usuário.");
        }
    };

    return (
        <main className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Número da Carteirinha"
                        value={carteirinha}
                        readOnly
                    />
                    <button type="button" onClick={gerarCarteirinha}>
                        Gerar Carteirinha
                    </button>
                </div>
                <button type="submit" className="login">Cadastrar</button>
            </form>
        </main>
    );
};

export default Cadastro;