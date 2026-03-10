import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Users, ChevronRight } from "lucide-react";
import type { Stadium } from "@/data/stadiums";

interface StadiumCardProps {
  stadium: Stadium;
}

export default function StadiumCard({ stadium }: StadiumCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass group overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={stadium.image} 
          alt={stadium.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30">
            <Users className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              {stadium.capacity.toLocaleString()} PLACES
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
          {stadium.name}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 text-secondary" />
          <span className="font-heading">{stadium.city}</span>
        </div>
        
        <p className="text-muted-foreground text-xs line-clamp-2 mb-6 font-heading">
          {stadium.description}
        </p>
        
        <Link 
          to={`/stadiums/${stadium.id}`}
          className="mt-auto btn-outline-neon flex items-center justify-center gap-2 py-2 group-hover:bg-primary/5"
        >
          Voir détails <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
