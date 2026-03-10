import { useState } from "react";
import { MATCHES, type Match } from "@/data/matches";
import { getTeamById } from "@/data/teams";
import { getStadiumById } from "@/data/stadiums";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Calendar, Clock } from "lucide-react";

export default function MatchesManagement() {
  const [matches, setMatches] = useState<Match[]>(MATCHES);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display text-4xl text-foreground">GESTION DES MATCHS</h1>
          <p className="text-muted-foreground font-heading">Programmez et gérez les rencontres.</p>
        </div>
        <button className="btn-neon flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Créer un match
        </button>
      </header>

      <div className="glass-strong p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>Date & Heure</TableHead>
              <TableHead>Match</TableHead>
              <TableHead>Stade</TableHead>
              <TableHead>Prix (V/T/P)</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => {
              const home = getTeamById(match.homeTeamId);
              const away = getTeamById(match.awayTeamId);
              const stadium = getStadiumById(match.stadiumId);
              const date = new Date(match.date);

              return (
                <TableRow key={match.id} className="border-border/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        <Calendar className="w-3 h-3 text-primary" />
                        {date.toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {date.toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-heading font-bold text-sm">
                    {home?.shortName} vs {away?.shortName}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{stadium?.name}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {match.priceVip}/{match.priceTribune}/{match.pricePopulaire}
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                      match.status === "SCHEDULED" ? "bg-primary/10 text-primary" :
                      match.status === "LIVE" ? "bg-red-500/10 text-red-500 animate-pulse" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {match.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
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
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
