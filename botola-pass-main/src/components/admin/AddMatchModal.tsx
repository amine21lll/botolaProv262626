import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, Trophy, Save, Info, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AddMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMatchModal({ isOpen, onClose }: AddMatchModalProps) {
  const { addMatch, teams, stadiums } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    homeTeamId: "",
    awayTeamId: "",
    stadiumId: "",
    date: "",
    time: "",
    priceVip: "500",
    priceTribune: "150",
    pricePopulaire: "30",
    description: "",
    status: "SCHEDULED" as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.homeTeamId || !formData.awayTeamId || !formData.stadiumId || !formData.date || !formData.time) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir toutes les informations obligatoires.",
        variant: "destructive"
      });
      return;
    }

    if (formData.homeTeamId === formData.awayTeamId) {
      toast({
        title: "Équipes identiques",
        description: "L'équipe à domicile ne peut pas être la même que l'équipe à l'extérieur.",
        variant: "destructive"
      });
      return;
    }

    const matchDate = new Date(`${formData.date}T${formData.time}`);

    addMatch({
      homeTeamId: parseInt(formData.homeTeamId),
      awayTeamId: parseInt(formData.awayTeamId),
      stadiumId: parseInt(formData.stadiumId),
      date: matchDate.toISOString(),
      priceVip: parseInt(formData.priceVip),
      priceTribune: parseInt(formData.priceTribune),
      pricePopulaire: parseInt(formData.pricePopulaire),
      status: formData.status
    });

    toast({
      title: "Match créé",
      description: "Le match a été ajouté au calendrier de la Botola Pro.",
    });

    onClose();
    // Reset form
    setFormData({
      homeTeamId: "",
      awayTeamId: "",
      stadiumId: "",
      date: "",
      time: "",
      priceVip: "500",
      priceTribune: "150",
      pricePopulaire: "30",
      description: "",
      status: "SCHEDULED"
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl glass-strong border border-border/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent">
              <div>
                <h2 className="text-display text-2xl text-foreground">CRÉER UN MATCH</h2>
                <p className="text-sm text-muted-foreground font-heading">Planifiez une nouvelle rencontre sportive.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Teams Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-muted/30 border border-border/30">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-primary" /> Équipe Domicile *
                  </label>
                  <select
                    required
                    className="w-full bg-muted border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.homeTeamId}
                    onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
                  >
                    <option value="" disabled className="bg-background">Sélectionner</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id} className="bg-background">{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-red-500" /> Équipe Extérieure *
                  </label>
                  <select
                    required
                    className="w-full bg-muted border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.awayTeamId}
                    onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
                  >
                    <option value="" disabled className="bg-background">Sélectionner</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id} className="bg-background">{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stadium & Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" /> Stade du Match *
                  </label>
                  <select
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.stadiumId}
                    onChange={(e) => setFormData({ ...formData, stadiumId: e.target.value })}
                  >
                    <option value="" disabled className="bg-background">Sélectionner un stade</option>
                    {stadiums.map(s => (
                      <option key={s.id} value={s.id} className="bg-background">{s.name} ({s.city})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-primary" /> Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" /> Heure *
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Info className="w-3 h-3 text-primary" /> Statut
                  </label>
                  <select
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="SCHEDULED">Programmé</option>
                    <option value="LIVE">En Direct</option>
                    <option value="FINISHED">Terminé</option>
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Tag className="w-3 h-3 text-primary" /> Prix des Billets (DHS) *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/30 space-y-2">
                    <span className="text-[10px] font-bold text-primary block uppercase">VIP</span>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full bg-transparent border-none p-0 text-xl font-bold outline-none font-mono"
                      value={formData.priceVip}
                      onChange={(e) => setFormData({ ...formData, priceVip: e.target.value })}
                    />
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/30 space-y-2">
                    <span className="text-[10px] font-bold text-foreground block uppercase">Tribune</span>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full bg-transparent border-none p-0 text-xl font-bold outline-none font-mono"
                      value={formData.priceTribune}
                      onChange={(e) => setFormData({ ...formData, priceTribune: e.target.value })}
                    />
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/30 space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground block uppercase">Populaire</span>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full bg-transparent border-none p-0 text-xl font-bold outline-none font-mono"
                      value={formData.pricePopulaire}
                      onChange={(e) => setFormData({ ...formData, pricePopulaire: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-heading"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-neon flex items-center gap-2 px-8 py-2.5 text-sm"
                >
                  <Save className="w-4 h-4" /> Créer le Match
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
