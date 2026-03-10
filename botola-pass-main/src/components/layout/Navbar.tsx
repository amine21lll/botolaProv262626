import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import botolaLogo from "@/assets/botola-logo.png";

const NAV_LINKS = [
  { label: "Accueil", path: "/" },
  { label: "Matchs", path: "/matches" },
  { label: "Stades", path: "/stadiums" },
  { label: "Classement", path: "/classement" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-primary/10"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={botolaLogo} alt="Botola Pro" className="h-10 w-auto" />
          <span className="font-display text-2xl tracking-wide text-foreground uppercase">
            BOTOLA <span className="text-primary">TICKET</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 font-heading ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 border-l border-border/50 pl-8">
            {user ? (
              <Link to={user.role === 'ADMIN' ? "/admin" : "/profile"} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors font-heading group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-all">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span>Mon Compte</span>
              </Link>
            ) : (
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-heading">
                Connexion
              </Link>
            )}
            <Link to="/matches" className="btn-neon text-[10px] py-2 px-6">
              Acheter un Billet
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-t border-border"
        >
          <div className="flex flex-col gap-4 p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border/50" />
            {user ? (
              <Link
                to={user.role === 'ADMIN' ? "/admin" : "/profile"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground"
              >
                <User className="w-5 h-5 text-primary" />
                Mon Compte
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted-foreground"
              >
                <User className="w-5 h-5" />
                Connexion
              </Link>
            )}
            <Link
              to="/matches"
              onClick={() => setMobileOpen(false)}
              className="btn-neon text-xs py-3 px-5 text-center mt-2"
            >
              Acheter un Billet
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
