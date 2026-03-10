import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import MatchCard from "@/components/match/MatchCard";
import { MATCHES } from "@/data/matches";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Matches() {
  // Group matches by date
  const grouped = MATCHES.reduce<Record<string, typeof MATCHES>>((acc, match) => {
    const dateKey = new Date(match.date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(match);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="section-tag">
            <Calendar className="w-3 h-3" />
            Calendrier
          </span>
          <h1 className="text-display text-5xl md:text-6xl text-foreground">
            TOUS LES MATCHS
          </h1>
          <p className="text-muted-foreground mt-3 font-heading">
            Journée 26 · Botola Pro Inwi 2025–2026
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {Object.entries(grouped).map(([dateLabel, matches]) => (
            <div key={dateLabel}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-heading font-semibold text-foreground text-lg mb-4 capitalize flex items-center gap-3"
              >
                <div className="w-1.5 h-6 rounded-full bg-primary" />
                {dateLabel}
              </motion.h3>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {matches.map((match) => (
                  <motion.div key={match.id} variants={fadeUp}>
                    <MatchCard match={match} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
