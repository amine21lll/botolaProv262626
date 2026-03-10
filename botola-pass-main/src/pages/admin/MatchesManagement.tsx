import { useState } from "react";
import { useData } from "@/context/DataContext";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import AddMatchModal from "@/components/admin/AddMatchModal";

export default function MatchesManagement() {
  const { matches, getTeamById, getStadiumById, deleteMatch } = useData();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous vraiment annuler ce match ?")) {
      deleteMatch(id);
      toast({
        title: "Match annulé",
        description: "La rencontre a été retirée du calendrier.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground uppercase">GESTION DES MATCHS</h1>
          <p className="text-muted-foreground font-heading">Programmez et gérez les rencontres du championnat.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-neon flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> Créer un match
        </button>
      </header>

      <div className="glass-strong p-6">
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-bold text-xs uppercase tracking-widest">Date & Heure</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Affiche</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Stade</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Prix (V/T/P)</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-widest">Statut</TableHead>
                <TableHead className="text-right font-bold text-xs uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => {
                const home = getTeamById(match.homeTeamId);
                const away = getTeamById(match.awayTeamId);
                const stadium = getStadiumById(match.stadiumId);
                const date = new Date(match.date);

                return (
                  <TableRow key={match.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {date.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2 text-[10px] text-muted-foreground pl-5 uppercase font-bold tracking-wider">
                          <Clock className="w-3 h-3" />
                          {date.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-foreground">{home?.shortName || "???"}</span>
                        <span className="text-[10px] text-muted-foreground italic font-light">vs</span>
                        <span className="font-heading font-bold text-sm text-foreground">{away?.shortName || "???"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading">
                        <MapPin className="w-3 h-3 text-primary/60" />
                        {stadium?.name || "Inconnu"}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      <span className="text-primary">{match.priceVip}</span>
                      <span className="mx-1">/</span>
                      <span>{match.priceTribune}</span>
                      <span className="mx-1">/</span>
                      <span className="text-muted-foreground">{match.pricePopulaire}</span>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-[0.1em]",
                        match.status === "SCHEDULED" ? "bg-primary/10 text-primary border border-primary/20" :
                        match.status === "LIVE" ? "bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse" :
                        "bg-muted text-muted-foreground border border-border"
                      )}>
                        {match.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors border border-primary/20">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(match.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors border border-destructive/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddMatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
