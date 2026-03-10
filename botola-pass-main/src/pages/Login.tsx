import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Lock, Mail, Shield, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import botolaLogo from "@/assets/botola-logo.png";

type LoginMode = "user" | "admin";

export default function Login() {
  const location = useLocation();
  const [mode, setMode] = useState<LoginMode>(location.pathname === "/admin/login" ? "admin" : "user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const from = location.state?.from?.pathname || (mode === "admin" ? "/admin" : "/");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    
    try {
      await login(email, password, mode === "admin" ? "ADMIN" : "USER");
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError("Adresse email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src={botolaLogo} alt="Botola Pro" className="h-16 w-auto mx-auto mb-4" />
          </Link>
          <h1 className="font-display text-3xl text-foreground tracking-wide">
            BOTOLA <span className="text-primary">TICKET</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-heading font-medium">
            Connectez-vous à votre espace <span className="text-foreground italic">{mode === "admin" ? "Admin" : "Supporter"}</span>
          </p>
        </div>

        <div className="flex rounded-xl bg-muted p-1 mb-6 border border-border/50">
          <button
            onClick={() => setMode("user")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
              mode === "user"
                ? "bg-card text-foreground shadow-xl border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Supporter
          </button>
          <button
            onClick={() => setMode("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-heading font-bold uppercase tracking-wider transition-all duration-300 ${
              mode === "admin"
                ? "bg-card text-foreground shadow-xl border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "admin" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="glass p-8 relative overflow-hidden"
        >
          {mode === "admin" && (
            <div className="absolute top-0 right-0 p-3 opacity-20 rotate-12">
              <Shield className="w-16 h-16 text-accent" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {localError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-heading">
                {localError}
              </div>
            )}

            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 block font-bold">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-3 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                  placeholder={mode === "admin" ? "admin@botola.ma" : "votre@email.com"}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 block font-bold">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-3 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {mode === "user" && (
              <div className="flex items-center justify-between text-[10px]">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer font-bold uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-border accent-primary" />
                  Rester connecté
                </label>
                <button type="button" className="text-primary hover:underline font-bold uppercase tracking-wider">
                  Oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-lg font-display font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-60 ${
                mode === "admin"
                  ? "bg-accent text-white hover:opacity-90 shadow-lg shadow-accent/20"
                  : "btn-neon"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Connexion...
                </span>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {mode === "user" ? (
            <p className="text-center text-xs text-muted-foreground mt-8 font-heading">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Rejoignez-nous
              </Link>
            </p>
          ) : (
            <div className="mt-8 p-3 rounded-lg bg-accent/5 border border-accent/10">
              <p className="text-[10px] text-muted-foreground text-center font-heading">
                Accès réservé aux administrateurs autorisés.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
