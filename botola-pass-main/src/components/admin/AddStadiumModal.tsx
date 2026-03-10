import React, { useState } from "react";
import { X, MapPin, Users, Info, ImageIcon, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { useToast } from "@/hooks/use-toast";

interface AddStadiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStadiumModal({ isOpen, onClose }: AddStadiumModalProps) {
  const { addStadium } = useData();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    capacity: "",
    description: "",
    image: "",
    mapUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city || !formData.capacity) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    addStadium({
      name: formData.name,
      city: formData.city,
      capacity: parseInt(formData.capacity),
      description: formData.description || "Aucune description fournie.",
      image: formData.image || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
      mapUrl: formData.mapUrl || `https://www.google.com/maps?q=${encodeURIComponent(formData.name + " " + formData.city)}&output=embed`
    });

    toast({
      title: "Succès",
      description: "Le stade a été ajouté à la base de données.",
    });

    onClose();
    setFormData({
      name: "",
      city: "",
      capacity: "",
      description: "",
      image: "",
      mapUrl: ""
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
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <div>
                <h2 className="text-display text-2xl text-foreground">AJOUTER UN STADE</h2>
                <p className="text-sm text-muted-foreground font-heading">Enregistrez une nouvelle infrastructure sportive.</p>
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
                    <MapPin className="w-3 h-3 text-primary" /> Nom du Stade *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="ex: Stade Mohammed V"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Info className="w-3 h-3 text-primary" /> Ville *
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
                    <Users className="w-3 h-3 text-primary" /> Capacité *
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="ex: 45000"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-primary" /> URL de l'Image
                  </label>
                  <input
                    type="url"
                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Info className="w-3 h-3 text-primary" /> Description
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-heading resize-none"
                  placeholder="Décrivez brièvement le stade..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
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
                  <Save className="w-4 h-4" /> Enregistrer le Stade
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
