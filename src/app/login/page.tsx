"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
      const { data: session, status } = useSession();
      const router = useRouter();

      // Redirect if logged in
      useEffect(() => {
            if (status === "authenticated") {
                  // Default redirect based on role (or generic)
                  // @ts-ignore
                  const role = session?.user?.role || "VISITOR";
                  switch (role) {
                        case "ADMIN": router.push("/admin"); break;
                        case "PARTNER": router.push("/partner"); break;
                        case "JOB_SEEKER": router.push("/jobs"); break;
                        case "VISITOR": default: router.push("/visitor"); // Or dashboard
                  }
            }
      }, [status, session, router]);

      const [activeTab, setActiveTab] = useState("login");

      // Login State
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      // Register State
      const [regName, setRegName] = useState("");
      const [regEmail, setRegEmail] = useState("");
      const [regRole, setRegRole] = useState("VISITOR");
      const [regPassword, setRegPassword] = useState("");
      const [regConfirmPassword, setRegConfirmPassword] = useState("");

      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);

      const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);

            try {
                  const result = await signIn("credentials", {
                        redirect: false,
                        email,
                        password,
                  });

                  if (result?.error) {
                        alert("Credenciais inválidas.");
                  } else {
                        // Success! The useEffect will handle the redirect based on session role
                        console.log("Login successful");
                  }
            } catch (err) {
                  alert("Erro ao conectar ao servidor.");
            } finally {
                  setLoading(false);
            }
      };

      const handleRegister = async (e: React.FormEvent) => {
            e.preventDefault();
            if (regPassword !== regConfirmPassword) {
                  alert("As palavras-passe não coincidem.");
                  return;
            }

            setLoading(true);
            try {
                  const response = await fetch("/api/auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                              name: regName,
                              email: regEmail,
                              password: regPassword,
                              role: regRole
                        })
                  });

                  if (response.ok) {
                        alert("Conta criada com sucesso! Faça login.");
                        setActiveTab("login");
                        setEmail(regEmail);
                        setPassword("");
                  } else {
                        const err = await response.json();
                        alert(err.error || "Erro ao criar conta.");
                  }
            } catch (err) {
                  alert("Erro ao conectar ao servidor.");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div style={{
                  background: 'linear-gradient(135deg, var(--bg-deep, #0a0a0a) 0%, hsl(0, 75%, 8%) 100%)',
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  position: 'relative',
                  overflowX: 'hidden'
            }}>
                  <div className="auth-background">
                        <div className="auth-glow auth-glow-1"></div>
                        <div className="auth-glow auth-glow-2"></div>
                  </div>

                  <div className="auth-container">
                        <div className="auth-header">
                              <Link href="/" className="auth-logo">
                                    <img src="/assets/logo-simjs.png" alt="SIMJS" className="auth-logo-img" />
                                    <span>SIMJS</span>
                              </Link>
                        </div>

                        <div className="auth-tabs">
                              <button
                                    className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
                                    onClick={() => setActiveTab("login")}
                              >
                                    <i className="fas fa-sign-in-alt"></i>
                                    Entrar
                              </button>
                              <button
                                    className={`auth-tab-btn ${activeTab === "register" ? "active" : ""}`}
                                    onClick={() => setActiveTab("register")}
                              >
                                    <i className="fas fa-user-plus"></i>
                                    Criar Conta
                              </button>
                        </div>

                        {activeTab === "login" ? (
                              <form className="auth-form" onSubmit={handleLogin}>
                                    <h2>Bem-vindo de Volta</h2>
                                    <div className="form-group">
                                          <label htmlFor="loginEmail">Email</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-envelope"></i>
                                                <input
                                                      type="email"
                                                      id="loginEmail"
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      placeholder="seu.email@exemplo.com"
                                                      required
                                                      autoComplete="email"
                                                />
                                          </div>
                                    </div>

                                    <div className="form-group">
                                          <label htmlFor="loginPassword">Palavra-passe</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-lock"></i>
                                                <input
                                                      type={showPassword ? "text" : "password"}
                                                      id="loginPassword"
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                      placeholder="••••••••"
                                                      required
                                                      autoComplete="current-password"
                                                />
                                                <button
                                                      type="button"
                                                      className="password-toggle"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                >
                                                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                </button>
                                          </div>
                                    </div>

                                    <div className="form-footer">
                                          <label className="checkbox-label">
                                                <input type="checkbox" name="remember" id="rememberMe" />
                                                <span>Lembrar-me</span>
                                          </label>
                                          <a href="#" className="forgot-link">Esqueceu a palavra-passe?</a>
                                    </div>

                                    <button type="submit" className="btn-auth btn-auth-primary" disabled={loading}>
                                          <span>{loading ? "Entrando..." : "Entrar na Conta"}</span>
                                          {!loading && <i className="fas fa-arrow-right"></i>}
                                    </button>

                                    <div className="social-login">
                                          <p>Ou continue com</p>
                                          <div className="social-buttons">
                                                <button
                                                      type="button"
                                                      className="btn-social google"
                                                      title="Google"
                                                      onClick={() => signIn("google")}
                                                >
                                                      <i className="fab fa-google"></i>
                                                </button>
                                                <button
                                                      type="button"
                                                      className="btn-social linkedin"
                                                      title="LinkedIn"
                                                      onClick={() => signIn("linkedin")}
                                                >
                                                      <i className="fab fa-linkedin-in"></i>
                                                </button>
                                                <button
                                                      type="button"
                                                      className="btn-social microsoft"
                                                      title="Microsoft"
                                                      onClick={() => signIn("azure-ad")}
                                                >
                                                      <i className="fab fa-microsoft"></i>
                                                </button>
                                          </div>
                                    </div>
                              </form>
                        ) : (
                              <form className="auth-form" onSubmit={handleRegister}>
                                    <h2>Criar Nova Conta</h2>
                                    <div className="form-group">
                                          <label htmlFor="regName">Nome Completo</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-user"></i>
                                                <input
                                                      type="text"
                                                      id="regName"
                                                      value={regName}
                                                      onChange={(e) => setRegName(e.target.value)}
                                                      placeholder="Seu Nome"
                                                      required
                                                      autoComplete="name"
                                                />
                                          </div>
                                    </div>

                                    <div className="form-group">
                                          <label htmlFor="regEmail">Email</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-envelope"></i>
                                                <input
                                                      type="email"
                                                      id="regEmail"
                                                      value={regEmail}
                                                      onChange={(e) => setRegEmail(e.target.value)}
                                                      placeholder="seu.email@exemplo.com"
                                                      required
                                                      autoComplete="email"
                                                />
                                          </div>
                                    </div>

                                    <div className="form-group">
                                          <label htmlFor="regRole">Tipo de Conta</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-user-tag"></i>
                                                <select
                                                      id="regRole"
                                                      value={regRole}
                                                      onChange={(e) => setRegRole(e.target.value)}
                                                      required
                                                      style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: 'white',
                                                            width: '100%',
                                                            outline: 'none',
                                                            fontSize: '1rem',
                                                            padding: '0.5rem'
                                                      }}
                                                >
                                                      <option value="VISITOR" style={{ color: 'black' }}>Visitante (Padrão)</option>
                                                      <option value="JOB_SEEKER" style={{ color: 'black' }}>Candidato (Job Seeker)</option>
                                                      <option value="PARTNER" style={{ color: 'black' }}>Parceiro (Empresa/Instituição)</option>
                                                </select>
                                          </div>
                                          {regRole === "PARTNER" && (
                                                <small style={{ color: '#f59e0b', marginTop: '5px', display: 'block' }}>
                                                      <i className="fas fa-info-circle"></i> Contas de parceiro requerem aprovação. Você começará como Visitante.
                                                </small>
                                          )}
                                    </div>

                                    <div className="form-group">
                                          <label htmlFor="regPassword">Palavra-passe</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-lock"></i>
                                                <input
                                                      type={showPassword ? "text" : "password"}
                                                      id="regPassword"
                                                      value={regPassword}
                                                      onChange={(e) => setRegPassword(e.target.value)}
                                                      placeholder="••••••••"
                                                      required
                                                      autoComplete="new-password"
                                                />
                                                <button
                                                      type="button"
                                                      className="password-toggle"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                >
                                                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                </button>
                                          </div>
                                    </div>

                                    <div className="form-group">
                                          <label htmlFor="regConfirmPassword">Confirmar Palavra-passe</label>
                                          <div className="input-wrapper">
                                                <i className="fas fa-lock"></i>
                                                <input
                                                      type="password"
                                                      id="regConfirmPassword"
                                                      value={regConfirmPassword}
                                                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                                                      placeholder="••••••••"
                                                      required
                                                      autoComplete="new-password"
                                                />
                                          </div>
                                    </div>

                                    <button type="submit" className="btn-auth btn-auth-primary" disabled={loading}>
                                          <span>{loading ? "Criando..." : "Criar Conta"}</span>
                                          {!loading && <i className="fas fa-user-plus"></i>}
                                    </button>

                                    <div className="social-login">
                                          <p>Ou registe-se com</p>
                                          <div className="social-buttons">
                                                <button
                                                      type="button"
                                                      className="btn-social google"
                                                      title="Google"
                                                      onClick={() => signIn("google")}
                                                >
                                                      <i className="fab fa-google"></i>
                                                </button>
                                                <button
                                                      type="button"
                                                      className="btn-social linkedin"
                                                      title="LinkedIn"
                                                      onClick={() => signIn("linkedin")}
                                                >
                                                      <i className="fab fa-linkedin-in"></i>
                                                </button>
                                                <button
                                                      type="button"
                                                      className="btn-social microsoft"
                                                      title="Microsoft"
                                                      onClick={() => signIn("azure-ad")}
                                                >
                                                      <i className="fab fa-microsoft"></i>
                                                </button>
                                          </div>
                                    </div>
                              </form>
                        )}
                  </div>
            </div>
      );
}
