import React, { useState } from "react";
import { X, Trophy, MapPin, Palette, Save, Info, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { useToast } from "@/hooks/use-toast";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTeamModal({ isOpen, onClose }: AddTeamModalProps) {
  const { addTeam, stadiums } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    city: "",
    stadiumId: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    logo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.shortName || !formData.city || !formData.stadiumId) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    addTeam({
      name: formData.name,
      shortName: formData.shortName.toUpperCase(),
      city: formData.city,
      stadiumId: parseInt(formData.stadiumId),
      colors: [formData.primaryColor, formData.secondaryColor],
      logo: formData.logo || undefined
    });

    toast({
      title: "Équipe ajoutée",
      description: `${formData.name} a été intégrée à la Botola Pro.`,
    });

    onClose();
    setFormData({
      name: "",
      shortName: "",
      city: "",
      stadiumId: "",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      logo: ""
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
                <h2 className="text-display text-2xl text-foreground">AJOUTER UNE ÉQUIPE</h2>
                <p className="text-sm text-muted-foreground font-heading">Enregistrez un nouveau club dans la ligue.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-primary" /> Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="ex: Wydad Athletic Club"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Globe className="w-3 h-3 text-primary" /> Abréviation (Short) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading uppercase"
                    placeholder="ex: WAC"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" /> Ville *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="ex: Casablanca"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Info className="w-3 h-3 text-primary" /> Stade Principal *
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
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Palette className="w-3 h-3 text-primary" /> Couleurs du Club
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg bg-transparent border border-border cursor-pointer p-1"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      title="Couleur Primaire"
                    />
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg bg-transparent border border-border cursor-pointer p-1"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      title="Couleur Secondaire"
                    />
                    <div className="flex-1 flex gap-1 items-center justify-center border border-border/30 rounded-xl bg-muted/20 px-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.primaryColor }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.secondaryColor }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Info className="w-3 h-3 text-primary" /> URL du Logo
                  </label>
                  <input
                    type="url"
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="https://..."
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  />
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
                  <Save className="w-4 h-4" /> Enregistrer l'Équipe
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
