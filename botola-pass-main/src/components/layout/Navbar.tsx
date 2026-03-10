import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import botolaLogo from "@/assets/botola-logo.png";

const NAV_LINKS = [
  { label: "Accueil", path: "/" },
  { label: "Matchs", path: "/matches" },
  { label: "Classement", path: "/classement" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      style={{ borderBottom: "1px solid hsl(152 100% 50% / 0.08)" }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={botolaLogo} alt="Botola Pro" className="h-10 w-auto" />
          <span className="font-display text-2xl tracking-wide text-foreground">
            BOTOLA <span className="text-primary">TICKET</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/matches" className="btn-neon text-xs py-2 px-5">
            Acheter un Billet
          </Link>
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
                className={`text-sm font-medium ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/matches"
              onClick={() => setMobileOpen(false)}
              className="btn-neon text-xs py-2 px-5 text-center"
            >
              Acheter un Billet
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
