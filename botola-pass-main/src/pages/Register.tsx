import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import botolaLogo from "@/assets/botola-logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register({ name, email, phone, password });
      navigate("/");
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={botolaLogo} alt="Botola Pro" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-display text-3xl text-foreground tracking-wide uppercase">
            REJOINDRE LA <span className="text-primary italic">PASSION</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 font-heading">
            Créez votre compte supporter Botola Pass
          </p>
        </div>

        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-heading">
                {error}
              </div>
            )}

            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 block font-bold">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                  placeholder="Yassine El..."
                  required
                />
              </div>
            </div>

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
                  className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                  placeholder="supporter@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 block font-bold">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                  placeholder="06XXXXXXXX"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 block font-bold">
                  Confirmer
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-muted border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all font-heading"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 drop-shadow-neon">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-display font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    S'inscrire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-xs text-muted-foreground font-heading">
              Déjà membre ?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline transition-all">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
