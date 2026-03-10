import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Trophy, Calendar, Ticket, MapPin, Users, Zap } from "lucide-react";
import MatchCard from "@/components/match/MatchCard";
import LeagueTable from "@/components/ranking/LeagueTable";
import { MATCHES } from "@/data/matches";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const STATS = [
  { icon: Users, label: "Équipes", value: "16" },
  { icon: Calendar, label: "Matchs", value: "240" },
  { icon: Ticket, label: "Billets", value: "50K+" },
  { icon: MapPin, label: "Stades", value: "10" },
];

export default function Home() {
  const upcomingMatches = MATCHES.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div variants={fadeUp} className="badge-live mb-8 mx-auto w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            EN DIRECT — BOTOLA PRO INWI · SAISON 2025–2026
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] mb-6"
          >
            VIVEZ LA PASSION
            <br />
            <span className="text-primary">DU FOOTBALL</span>
            <br />
            MAROCAIN
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-heading tracking-wide"
          >
            Réservez vos billets en quelques secondes.
            <br className="hidden sm:block" />
            QR code · PDF · Livraison instantanée.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/matches" className="btn-neon flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" />
              Acheter un Billet
            </Link>
            <Link to="/matches" className="btn-outline-neon flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Voir les Matchs
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="stat-card"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="font-display text-3xl text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ UPCOMING MATCHES ═══ */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <Zap className="w-3 h-3" />
            Prochains Matchs
          </span>
          <h2 className="text-display text-4xl md:text-5xl text-foreground">
            MATCHS À LA UNE
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {upcomingMatches.map((match) => (
            <motion.div key={match.id} variants={fadeUp}>
              <MatchCard match={match} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/matches" className="btn-outline-neon inline-flex items-center gap-2">
            Voir tous les matchs →
          </Link>
        </motion.div>
      </section>

      {/* ═══ LEAGUE TABLE ═══ */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <Trophy className="w-3 h-3" />
            Classement Officiel
          </span>
          <h2 className="text-display text-4xl md:text-5xl text-foreground">
            BOTOLA PRO INWI
          </h2>
          <p className="text-muted-foreground mt-3 font-heading">Saison 2025–2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <LeagueTable />
        </motion.div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass text-center py-16 px-8"
        >
          <h2 className="text-display text-4xl md:text-6xl text-foreground mb-4">
            PRÊT À VIVRE L'ÉMOTION ?
          </h2>
          <p className="text-muted-foreground mb-8 font-heading text-lg">
            Rejoignez des milliers de supporters à travers le Maroc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/matches" className="btn-neon inline-flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Explorer les matchs
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
