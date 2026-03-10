import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Ticket, ArrowLeft, Trophy, Info } from "lucide-react";
import { getStadiumById } from "@/data/stadiums";
import { MATCHES } from "@/data/matches";
import { getTeamById } from "@/data/teams";
import MatchCard from "@/components/match/MatchCard";

export default function StadiumDetail() {
  const { stadiumId } = useParams();
  const stadium = getStadiumById(Number(stadiumId));
  
  if (!stadium) return <div className="pt-24 text-center">Stade introuvable</div>;

  const stadiumMatches = MATCHES.filter(m => m.stadiumId === stadium.id);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/stadiums" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-heading text-sm">Retour aux stades</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header & Image */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <img src={stadium.image} alt={stadium.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h1 className="text-display text-4xl md:text-6xl text-foreground mb-2">{stadium.name}</h1>
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" /> {stadium.city}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" /> {stadium.capacity.toLocaleString()} Places
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Description & Info */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass p-8 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-5 h-5 text-primary" />
                <h2 className="text-display text-2xl uppercase tracking-wider">À Propos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed font-heading">
                {stadium.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/50">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Inauguration</p>
                  <p className="text-foreground font-heading">Années 2000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Surface</p>
                  <p className="text-foreground font-heading">Gazon Naturel</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Éclairage</p>
                  <p className="text-foreground font-heading">2000 Lux</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Parking</p>
                  <p className="text-foreground font-heading">5000+ Places</p>
                </div>
              </div>
            </motion.section>

            {/* Matches List */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h2 className="text-display text-2xl uppercase tracking-wider">Événements à venir</h2>
                </div>
                <span className="text-xs text-muted-foreground font-heading">{stadiumMatches.length} match(s) trouvé(s)</span>
              </div>

              {stadiumMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stadiumMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="glass p-12 text-center text-muted-foreground italic font-heading">
                  Aucun match programmé pour le moment dans cette enceinte.
                </div>
              )}
            </section>
          </div>

          {/* Sidebar / Map */}
          <aside className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 sticky top-28"
            >
              <h3 className="text-display text-xl mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                Localisation
              </h3>
              
              <div className="aspect-square rounded-xl overflow-hidden mb-6 border border-border/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <iframe
                  src={stadium.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-muted-foreground font-heading flex gap-3">
                  <Trophy className="w-4 h-4 text-primary shrink-0" />
                  <span>Résidence habituelle des clubs Wydad Casablanca et Raja Casablanca.</span>
                </p>
                <button className="btn-neon w-full flex items-center justify-center gap-2 py-3 text-sm">
                  <Ticket className="w-4 h-4" /> Acheter un billet
                </button>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
