import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // Adicione sendPasswordResetEmail
import { auth } from "../firebase";
import "./styles.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [resetEmail, setResetEmail] = useState(""); // E-mail para redefinição de senha
    const [showResetModal, setShowResetModal] = useState(false); // Controla a visibilidade do modal
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setError("Preencha todos os campos!");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, senha); // Faz login
            navigate("/welcome"); // Redireciona para a página de boas-vindas
        } catch (error) {
            setError("E-mail ou senha incorretos.");
            console.error("Erro ao fazer login: ", error);
        }
    };

    const handleResetPassword = async () => {
        if (!resetEmail) {
            setError("Por favor, insira seu e-mail.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail); // Envia o e-mail de redefinição de senha
            alert("E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.");
            setShowResetModal(false); // Fecha o modal
        } catch (error) {
            setError("Erro ao enviar e-mail de redefinição de senha.");
            console.error("Erro: ", error);
        }
    };

    return (
        <main className="container">
            <form onSubmit={handleLogin}>
                <h1>Login Biblioteca</h1>
                {error && <p className="error">{error}</p>}
                <div className="input-box">
                    <input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                    <input
                        placeholder="Senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" />
                        Lembrar senha
                    </label>
                    <a href="#" onClick={() => setShowResetModal(true)}>Esqueci a senha</a>
                </div>
                <button type="submit" className="login">Login</button>
                <div className="register-link">
                    <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
                </div>
            </form>

            {/* Modal de "Esqueci a senha" */}
            {showResetModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Redefinir Senha</h2>
                        <p>Insira seu e-mail para receber o link de redefinição de senha.</p>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                        <button onClick={handleResetPassword}>Enviar</button>
                        <button onClick={() => setShowResetModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default LoginForm;